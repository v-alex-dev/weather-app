import {BtnComponents} from '../components/btn-components.ts';
import {CardComponents} from "../components/card-components.ts";
import {getWeather} from "../queries/get-weather.ts";
import  {saveLastSearch} from "../functions/localStorages-utils.ts";
import {TemperatureChart} from  '../components/chart.ts';
export const mainSection = () => {
    const section = document.createElement('section');
    const newBtn = new BtnComponents('btn-submit', 'button', 'btn', 'submit');
    const input = document.createElement('input');
    const form = document.createElement('form');
    const btn = newBtn.initButton()
    //Style section
    section.classList.add('flex', 'flex-col', 'mx-auto', 'mt-8')
    // Attributs inpût
    input.placeholder = 'City';
    input.id = 'city-input';
    input.classList.add('bg-slate-400', 'rounded', 'shadow-lg')

    // AppendChild
    section.appendChild(form);
    form.appendChild(input);
    form.appendChild(btn);

    btn.addEventListener('click', () => {
        let city = input.value
        const weather = getWeather(city);

        weather.then(data => {
            console.log(data)

            const weatherList = data.list;
            // J'initialise une date de comparaison en local.
            let today = new Date();
            today.setHours(0, 0, 0, 0)
            const next5DaysWeather = [];
            next5DaysWeather.push(weatherList[0]);

            const chart = new TemperatureChart(next5DaysWeather);

            for (let i = 0; i < weatherList.length; i++) {
                //J'initialise la date a comparer.
                const dateText = weatherList[i].dt_txt;
                const forecastDate = new Date(dateText);
                // Je reset l'heure pour faire une comparaison sur la date et non sur l'heure.
                forecastDate.setHours(0, 0, 0, 0)

                // Je valide les données que je vais comparer.
                if (
                    forecastDate.toLocaleDateString() !== today.toLocaleDateString() &&
                    forecastDate.toLocaleDateString() > today.toLocaleDateString()
                ) {
                    // Si les deux conditions sont remplis. Je dois l'ajouter dans un tableau.
                    next5DaysWeather.push(weatherList[i]);
                    console.log(next5DaysWeather)
                    today =new Date(forecastDate);
                }

                // Arriver
                if (next5DaysWeather.length >= 6) {
                    break;
                }
            }

            // ADD DIV LIST ARTICLE
            const div = document.createElement('div')
            div.id = 'weather-list';
            div.classList.add('grid', 'grid-cols-2', 'grid-rows-2')

            const canvas = document.createElement('canvas');
            section.appendChild(canvas);
            canvas.style.width = '500px !important'
            canvas.style.height='300px !important'

            // Définissez le contexte du graphique
            const ctx = canvas.getContext('2d');
            if (ctx) {
                chart.setContext(ctx);
                chart.initChart();
            }

            next5DaysWeather.forEach(dayData => {
                const newArticle = new CardComponents();
                newArticle.addDiv(2);
                const article = newArticle.initArticle();
                
                article.classList.add('shadow-lg', 'm-4', 'rounded-3xl')

                const cardBody = article.firstChild;
                const cardFooter = article.lastChild;

                if (cardBody !== null) {
                    const title = document.createElement('h2');
                    const dateWeather = document.createElement('p');
                    title.textContent = data.city.name;
                    const dayDate = new Date (dayData.dt_txt).toDateString()
                    dateWeather.textContent = dayDate;

                    cardBody.appendChild(title);
                    cardBody.appendChild(dateWeather);

                }

                if (cardFooter !== null) {
                    const para = document.createElement('p')
                    const description = dayData.weather[0].description;

                    para.textContent = `Weather : ${description}`

                    cardFooter.appendChild(para)
                }
                div.appendChild(article);
                section.appendChild(div)
            })
            saveLastSearch(data);
        })
    })

    return section;
}