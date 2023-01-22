const axios = require("axios")
const { upsertStations } = require("./db")

const mapARNToSourceType = {
  "arn:aws:events:eu-central-1:403574577225:rule/ingest-oslobysykkel-station-status":
    "station_status",
  "arn:aws:events:eu-central-1:403574577225:rule/ingest-oslobysykkel-station-info":
    "station_info",
}

const handler = async (event) => {
  const source = mapARNToSourceType[event.resources[0]]

  switch (source) {
    case "station_info":
      await fetchStationInfo()
      break
    case "station_status":
      await fetchStationStatus()
      break
    default:
      console.error(`Bad data source: ${source}`)
  }
}

fetchStationInfo = async () => {
  const raw_station_info = await axios.get(
    "https://gbfs.urbansharing.com/oslobysykkel.no/station_information.json"
  )
  const stations_data = raw_station_info.data.data.stations

  console.info("update station info START")
  await upsertStations(stations_data)
  console.info("update station info DONE")
}

fetchStationStatus = async () => {
  const raw_station_status = (
    await axios.get(
      "https://gbfs.urbansharing.com/oslobysykkel.no/station_status.json"
    )
  )
  const stations_data = raw_station_status.data.data.stations

  console.info("update station status START")
  await upsertStations(stations_data)
  console.info("update station status DONE")
}

module.exports.handler = handler
