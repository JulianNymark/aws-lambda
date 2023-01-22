const Koa = require('koa');
const Router = require('koa-router');
const serverless = require('serverless-http');

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
  .get('/api/v1/station', (ctx) => {
    ctx.body = "all the stations!"
  })
  .get('/api/v1/station/:station_id', (ctx) => {
    const id = ctx.params.station_id
    ctx.body = `the station with id = ${id}!`
  })
  .get('/api/v1/station/nearby/:location/:radius', (ctx) => {
    const location = ctx.params.location
    const radius = ctx.params.radius
    ctx.body = `all the stations within ${radius} of ${location}`
  })

app.use(router.routes()).use(router.allowedMethods())

exports.handler = serverless(app)
