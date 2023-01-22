const Koa = require("koa")
const Router = require("koa-router")
const serverless = require("serverless-http")

const { getStations, getStation } = require("./db")

const environment = process.env.NODE_ENV ?? "serverless"

const app = new Koa()
const router = new Router()

router
  .get("/api/v1", (ctx) => {
    ctx.body = {
      application: 'bicycleAPI',
      resources: [
        {
          url: "https://tsrvwopboogczyvb3tjewfq3ga0lltpz.lambda-url.eu-central-1.on.aws/api/v1/station",
          description: "get all stations",
        },
        {
          url: "https://tsrvwopboogczyvb3tjewfq3ga0lltpz.lambda-url.eu-central-1.on.aws/api/v1/station/:station_id",
          description: "get single station",
        },
        {
          url: "https://tsrvwopboogczyvb3tjewfq3ga0lltpz.lambda-url.eu-central-1.on.aws/api/v1/station/nearby/:location/:radius",
          description:
            "get all stations within :radius meters of :location (spatial)",
        },
      ],
    }
  })
  .get("/api/v1/bounce-request", (ctx) => {
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
