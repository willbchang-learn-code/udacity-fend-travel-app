const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fetch = require('node-fetch')
const moment = require('moment')
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static('dist'))

const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

const data = {}
app.post('/userData', async (req, res) => {
    const {destination, departing, countdownDays} = req.body
    const imageUrl = await getImageBy(destination)
    const {lat, lng} = await getGeoBy(destination)
    const {summary, temperatureHigh, temperatureLow} = await getWeatherBy(lat, lng, departing)
    Object.assign(data, {destination, departing, countdownDays, imageUrl, summary, temperatureHigh, temperatureLow})
    res.send(data)
})

async function getGeoBy(destination) {
    const api = `http://api.geonames.org/postalCodeSearchJSON?placename=${destination}&maxRows=10&username=farfar89433`
    const response = await fetch(encodeURI(api))
    const {postalCodes} = await response.json()
    const {lat, lng} = postalCodes[0]
    return {lat, lng}
}

async function getWeatherBy(lat, lng, departing) {
    const time = moment(departing).unix()
    const api = `https://api.darksky.net/forecast/96a75c65b8c459615446b63edf9b6f5e/${lat},${lng},${time}`
    const response = await fetch(api)
    const {daily} = await response.json()
    const {summary, temperatureHigh, temperatureLow} = daily.data[0]
    return {summary, temperatureHigh, temperatureLow}
}

async function getImageBy(destination) {
    const api = `https://pixabay.com/api/?key=15271624-78f1a37e52daa8bcdf6c74955&q=${destination}&image_type=photo`
    const response = await fetch(api)
    const {hits} = await response.json()
    return hits[0].webformatURL
}
