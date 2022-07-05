require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;

let client;

exports.handler = async (event, context, callback) => {
  // const uri = process.env["DB_URL"];
  // client = new MongoClient(uri);

  // await addMessage('anon', '', 'Hello');

  // await client.close();

  return {
    event: JSON.parse(event.body)
  }
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
        message
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
}

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
}

console.log(exports.handler());