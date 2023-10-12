//import {keyApi} from "../../keyApi";

export async function getWeather (value:string): Promise<object> {
    const key = '2768156f77daf3bc47e7d2980448ea31';
    return await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${key}`)
        .then(data => data.json())
}