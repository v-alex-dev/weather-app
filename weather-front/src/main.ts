import {getWeather} from "./queries/get-weather.ts";

const meteo = getWeather('paris');

meteo.then(data => console.log(data))