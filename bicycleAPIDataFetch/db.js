require("dotenv").config()
const MongoClient = require("mongodb").MongoClient

const uri = process.env["DB_URL"]

let client

const upsertStations = async (stations_data) => {
  client = new MongoClient(uri)

  await client.connect()
  let query_promises = []
  try {
    for (station of stations_data) {
      // console.log("upserting station:", station.station_id)
      query_promises.push(client
        .db("oslobysykkel")
        .collection("stations")
        .updateOne(
          { station_id: station.station_id },
          { $set: station },
          { upsert: true }
        ))
    }
    await Promise.all(query_promises) // ~ 250 promises
  } catch (e) {
    console.error(e)
  }
  client.close() // be nice to the db
}

module.exports = { upsertStations }
