import {getGeoBy, getImageBy, getWeatherBy} from "../../server.js";


it('The geo should be {lat: 40.509225, lng: -80.624051}', async () => {
    expect(await getGeoBy('Shanghai'))
        .toStrictEqual({lat: 40.509225, lng: -80.624051})
}, 30000);

it('The image url should match https://pixabay.com/get/ ', async () => {
    expect(await getImageBy('Shanghai'))
        .toMatch(/https:\/\/pixabay.com\/get\//)
}, 30000);

it('The weather should be ', async () => {
    expect(await getWeatherBy(40.509225,-80.624051,"11/22/2020"))
        .toStrictEqual({
            summary: "Mostly cloudy throughout the day.",
            temperatureHigh: 50.4,
            temperatureLow: 35.58
        })
}, 30000);