const Koa = require("koa")
const Router = require("koa-router")
const serverless = require("serverless-http")

const { getStations, getStation } = require("./db")

const environment = process.env.NODE_ENV ?? "serverless"

const app = new Koa()
const router = new Router()

router
  .get("/api/info", (ctx) => {
    ctx.body = { application: "sample-app", version: "1" }
  })
  .get("/api/v1/getback", (ctx) => {
    const requestBody = ctx.request
    ctx.body = requestBody
  })
  .get("/api/v1/station", async (ctx) => {
    ctx.body = await getStations()
  })
  .get("/api/v1/station/:station_id", async (ctx) => {
    const id = ctx.params.station_id
    ctx.body = await getStation(id)
  })
  .get("/api/v1/station/nearby/:location/:radius", (ctx) => {
    const location = ctx.params.location
    const radius = ctx.params.radius
    ctx.body = `NOT IMPLEMENTED: all the stations within ${radius} meters of ${location}`
  })

app.use(router.routes()).use(router.allowedMethods())

if (environment === "serverless") {
  module.exports.handler = serverless(app)
} else {
  console.debug("starting in development mode...")
  app.listen(3000)
}
