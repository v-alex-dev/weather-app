import {BtnComponents} from '../components/btn-components';
import {CardComponents} from "../components/card-components";
import {getWeather} from "../queries/get-weather";
import  {saveLastSearch} from "../functions/localStorages-utils";
import {TemperatureChart} from  '../components/chart';
import { validCity } from '../functions/valid-city';


export const mainSection = () => {
    const section = document.createElement('section');
    const newBtn = new BtnComponents('btn-submit', 'button', 'btn', 'submit');
    const input = document.createElement('input');
    const form = document.createElement('form');
    const btn = newBtn.initButton()
    //Style section
    section.classList.add('flex', 'flex-col', 'mx-auto', 'mt-8', 'items-center')
    // Attributs inpût
    input.placeholder = 'City';
    input.id = 'city-input';
    input.classList.add('bg-slate-400', 'rounded', 'shadow-lg', 'opacity-50', 'mx-4', 'text-slate-200')

    // Attributs button
    btn.classList.add('border-2', 'p-2', 'rounded-full', 'hover:bg-cyan-500','hover:ease-in','duration-300',)

    // AppendChild
    section.appendChild(form);
    form.appendChild(input);
    form.appendChild(btn);

    form.classList.add('my-8')

    btn.addEventListener('click', () => {
        let city = input.value
        const weather = getWeather(city);

        

        weather.then(data => {
            console.log(data)

            const isCityExist = validCity(data.city.name);

            if (!isCityExist) {
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
              div.classList.add('grid', 'grid-cols-3', 'grid-rows-2');
              const canvasDiv = document.createElement('div');
              canvasDiv.classList.add('w-2/3', 'h-1/3');
              const canvas = document.createElement('canvas');
              section.appendChild(canvasDiv);
              canvasDiv.appendChild(canvas)
              canvas.width = 300;
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
                    console.log(dayData);
                    
                      const para = document.createElement('p');
                      const img = document.createElement('img');
                      img.src = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}.png`
                      const description = dayData.weather[0].description;
  
                      para.textContent = `Weather : ${description}`
                      cardFooter.appendChild(para);
                      cardFooter.appendChild(img);
                  }
                  div.appendChild(article);
                  section.appendChild(div)
              })
              saveLastSearch(data);
            }
            else{
              input.value ='';
              alert('The city exist in the list')
            }

        })
    })

    return section;
}