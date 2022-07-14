require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

let client;

exports.handler = async (event, context, callback) => {
  const { name = "", email = "", message = "" } = await JSON.parse(event.body);

  const uri = process.env["DB_URL"];
  client = new MongoClient(uri);

  let result = await addMessage(
    name.substr(0, 200),
    email.substr(0, 200),
    message.substr(0, 2000)
  );
  client.close(); // be nice to the db

  return result;
};

const addMessage = async (name, email, message) => {
  try {
    await client.connect();
    const messages = await client
      .db("ailurus_messages")
      .collection("messages")
      .insertOne({
        name,
        email,
        message,
      });
    console.log(messages);
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
