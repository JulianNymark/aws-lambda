require("dotenv").config()
const MongoClient = require("mongodb").MongoClient

const uri = process.env["DB_URL"]

let client

const getStations = async () => {
  client = new MongoClient(uri)

  try {
    await client.connect()
    const stations = await client
      .db("oslobysykkel")
      .collection("stations")
      .find()
      .toArray()
    client.close() // be nice to the db
    return {
      body: stations,
    }
  } catch (e) {
    console.error(e)
    client.close() // be nice to the db
    return {
      body: { error: "There was a problem retrieving data." },
    }
  }
}

const getStation = async (station_id) => {
  client = new MongoClient(uri)

  try {
    await client.connect()
    const station = await client
      .db("oslobysykkel")
      .collection("stations")
      .find({ station_id })
      .toArray()
    client.close() // be nice to the db
    return {
      body: station,
    }
  } catch (e) {
    console.error(e)
    client.close() // be nice to the db
    return {
      body: { error: "There was a problem retrieving data." },
    }
  }
}

module.exports = { getStation, getStations }
