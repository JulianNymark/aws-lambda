require("dotenv").config();
const axios = require('axios')
const MongoClient = require("mongodb").MongoClient;

const apikey_ipgeolocation = process.env['API_KEY_IPGEOLOCATION']
const uri = process.env["DB_URL"];

let client;

exports.handler = async (event, context, callback) => {
  const { name = "", email = "", message = "" } = await JSON.parse(event.body);

  const sourceIp = event.requestContext.http.sourceIp
  const userAgent = event.requestContext.http.userAgent
  const sourceIpGeo = await sourceIpLookup(sourceIp)

  client = new MongoClient(uri);

  let result = await addMessage(
    {
      name: name.substr(0, 200),
      email: email.substr(0, 200),
      message: message.substr(0, 2000),
      sourceIp,
      sourceIpGeo,
      userAgent
    }
  );

  client.close(); // be nice to the db

  return result;
};

const addMessage = async (data) => {
  try {
    await client.connect();
    const messages = await client
      .db("ailurus_messages")
      .collection("messages")
      .insertOne(data);
    return {
      statusCode: 200,
      body: messages,
    };
  } catch (e) {
    console.error(e);
    return {
      body: { error: "There was a problem inserting data." },
      statusCode: 400,
    };
  }
};

const getMessages = async () => {
  try {
    await client.connect();
    const messages = await client
      .db("ailurus_messages")
      .collection("messages")
      .find()
      .toArray();
    console.log(messages);
    return {
      statusCode: 200,
      body: messages,
    };
  } catch (e) {
    console.error(e);
    return {
      body: { error: "There was a problem retrieving data." },
      statusCode: 400,
    };
  }
};

const sourceIpLookup = async (ip) => {
  const ripeLookupReq = axios(`https://rdap.db.ripe.net/ip/${ip}`)
  const ipGeoLocationReq = axios(`https://api.ipgeolocation.io/ipgeo?apiKey=${apikey_ipgeolocation}&ip=${ip}`)

  const [ripeLookup, ipGeoLocation] = await Promise.all([ripeLookupReq, ipGeoLocationReq])

  return {
    country: ripeLookup?.data?.country || null,
    name: ripeLookup?.data?.name || null,
    location: {
      lat: ipGeoLocation?.data?.latitude || null,
      lon: ipGeoLocation?.data?.longitude || null,
    }
  }
}
