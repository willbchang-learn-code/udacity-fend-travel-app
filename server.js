const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.dev.js');
const compiler = webpack(config);

const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');
const moment = require('moment');
const app = express();

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
}));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('dist'));

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.post('/userData', async (req, res) => {
    const {destination, departing, countdownDays} = req.body;
    const imageUrl = await getImageBy(destination);
    const {lat, lng} = await getGeoBy(destination);
    const {summary, temperatureHigh, temperatureLow} = await getWeatherBy(lat, lng, departing);
    const data = {destination, departing, countdownDays, imageUrl, summary, temperatureHigh, temperatureLow};
    res.send(data);
});

export async function getGeoBy(destination) {
    const api = `http://api.geonames.org/postalCodeSearchJSON?placename=${destination}&maxRows=10&username=farfar89433`;
    const response = await fetch(encodeURI(api));
    const {postalCodes} = await response.json();
    const {lat, lng} = postalCodes[0];
    return {lat, lng};
}

export async function getWeatherBy(lat, lng, departing) {
    const time = moment(departing).unix();
    const api = `https://api.darksky.net/forecast/0a57410c0d5a1d6565b07bcf69255dbe/${lat},${lng},${time}`;
    const response = await fetch(api);
    const {daily} = await response.json();
    const {summary, temperatureHigh, temperatureLow} = daily.data[0];
    return {summary, temperatureHigh, temperatureLow}
}

export async function getImageBy(destination) {
    const api = `https://pixabay.com/api/?key=15271624-78f1a37e52daa8bcdf6c74955&q=${destination}&image_type=photo`
    const response = await fetch(api);
    const {hits} = await response.json();
    return hits[0].webformatURL;
}