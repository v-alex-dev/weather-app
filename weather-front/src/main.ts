import {mainSection} from "./pages/main.ts";
import {loadLastSearch} from "./functions/localStorages-utils.ts";
import {CardComponents} from "./components/card-components.ts";
import {TemperatureChart} from "./components/chart.ts";
import { navBar } from "./components/nav-bar";

const body = document.body;
const main = document.createElement('main');
const section = mainSection();
const nav = navBar();

body.classList.add('bg-gradient-to-r','from-sky-500','to-indigo-500')

body.appendChild(nav)
body.appendChild(main);
main.appendChild(section);

main.classList.add('bg-slate-50', 'w-3/4', 'mx-auto', 'rounded-lg')

const lastSearchData = loadLastSearch();

if (lastSearchData) {
    const weather = lastSearchData;
    const weatherList = weather.list;

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
            today = new Date(forecastDate);
        }

        // Arriver
        if (next5DaysWeather.length >= 6) {
            break;
        }
    }

    // ADD DIV LIST ARTICLE
    const div = document.createElement('div')
    div.id = 'weather-list';
    div.classList.add('grid', 'grid-cols-3', 'grid-rows-2')

    const canvasDiv = document.createElement('div');
    canvasDiv.classList.add('w-2/3');
    const canvas = document.createElement('canvas');
    section.appendChild(canvasDiv);
    canvasDiv.appendChild(canvas)


    const ctx = canvas.getContext('2d');
    if (ctx) {
        chart.setContext(ctx);
        chart.initChart();
    }
    next5DaysWeather.forEach(dayData => {
        const newArticle = new CardComponents();
        newArticle.addDiv(2);
        const article = newArticle.initArticle();

        article.classList.add(
          'shadow-lg',
          'm-4', 
          'rounded-3xl', 
          'flex', 
          'flex-col', 
          'justify-center', 
          'p-4', 
          'hover:-translate-y-6', 
          'ease-in', 
          'duration-300', 
          'bg-gradient-to-t',
          'from-sky-700',
          'via-white',
          'to-blue-200'
          )

        const cardBody = article.firstChild;
        const cardFooter = article.lastChild;

        cardBody.classList.add('flex', 'flex-col', 'justify-center', 'text-center');
        cardFooter.classList.add('flex', 'flex-col', 'justify-center', 'text-center');

        if (cardBody !== null) {
            const title = document.createElement('h2');
            const dateWeather = document.createElement('p');
            title.textContent = weather.city.name;
            const dayDate = new Date(dayData.dt_txt).toDateString()
            dateWeather.textContent = dayDate;

            cardBody.appendChild(title);
            cardBody.appendChild(dateWeather);

        }

        if (cardFooter !== null) {
            const para = document.createElement('p')
            const description = dayData.weather[0].description;
            const img = document.createElement('img');
            img.src = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`

            para.textContent = `Weather : ${description}`

            cardFooter.appendChild(para)
            cardFooter.appendChild(img)
        }
        div.appendChild(article);
        section.appendChild(div)
    })

}

