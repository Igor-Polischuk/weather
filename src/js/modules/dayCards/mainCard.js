import {getIcon} from "../../icons";
import general from "../../general";


export default async function mainCardShowWeather(){
    const currentWeather = (await general).weatherNow;
    document.querySelector('.temp').innerText = Math.round(currentWeather.main.temp);
    document.querySelector('.weather__descr').innerText = currentWeather.weather[0].description;
    document.querySelector('.humidity__today').innerText = currentWeather.main.humidity;
    document.querySelector('.precipitation__today').innerText = ((await general).weather[0][0].pop * 100).toFixed(0);
    document.querySelector('.wind__today').innerText = currentWeather.wind.speed;
    document.querySelector('.weather__max .max').innerText = Math.round(currentWeather.main.temp_max);
    document.querySelector('.weather__min .min').innerText = Math.round(currentWeather.main.temp_min);
    document.querySelector('.weather__feel .min').innerText = Math.round(currentWeather.main.feels_like);

    const icoSrc = getIcon(currentWeather);
    document.querySelector('.weather__ico').src = icoSrc;


    document.querySelectorAll('.weaher__temp').forEach(async (hourly, i) => {
        
        const hourlWeather = (await general).weather[0][i];
        const time = hourly.querySelector('.weaher__temp .weather__hourly-time');
        
        time.innerText = new Date(hourlWeather.dt_txt).getHours() + ':00';

        const ico = hourly.querySelector('.weather__hourly-ico');
        const temp = hourly.querySelector('.weather__hourly-temp');
        const src = getIcon(hourlWeather);
        ico.src = src;
        temp.innerText = Math.round(hourlWeather.main.temp) + ' °C';

    });

    document.querySelectorAll('.weather__hourly-precipitation').forEach(async (hourly, i) => {
        const hourlWeather = (await general).weather[0][i];
        const time = hourly.querySelector('.weather__hourly-time');
        const pop = (hourlWeather.pop * 100).toFixed(0);

        time.innerText = new Date(hourlWeather.dt_txt).getHours() + ':00';
        hourly.querySelector('.precipitation__diagram-line').style.height = pop + '%';
        hourly.querySelector('.chance_precipitation').innerText = pop + '%';

    });
}