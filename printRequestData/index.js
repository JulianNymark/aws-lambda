const axios = require('axios')
require('dotenv').config();

const apikey_ipgeolocation = process.env['API_KEY_IPGEOLOCATION']

exports.handler = async (event, context) => {
    const sourceIp = event.requestContext.http.sourceIp
    const sourceIpGeo = await sourceIpLookup(sourceIp)

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            sourceIp,
            sourceIpGeo
        }),
    };

    return response
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