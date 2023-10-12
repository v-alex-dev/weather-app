import {keyApi} from "../../keyApi";

export async function getWeather (value:string): Promise<object> {
    const key = keyApi;
    return await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${key}`)
        .then(data => data.json())
}