import { getIcon, getIconByMain } from "../../icons/icons";
import { store } from "../../redux/store";
import { getMaxTempMoment } from "../../weatherAPI/parseWeather";
import { WeatherInTimeI } from "../../weatherAPI/weather.interface";

function cardContent(day: number) {
    const dayWeather = store.getState().weather.forecast[day]
    const maxTempWeather = getMaxTempMoment(dayWeather)
    const ico = getIconByMain(maxTempWeather.weather[0].main)
    
    return `
        <div class="card__left flex column">
            <div class="card__avg-data">
                <iframe src="${ico}" frameborder="0" class="card__ico" scrolling="no"></iframe>
                <div class="flex column">
                    <p class="card__avg-temp">${Math.round(maxTempWeather.main.temp)} °C</p>
                    <p class="card__desc">${maxTempWeather.weather[0].description}</p>
                </div>
            </div>
            <p class="card__precipitation">
                Precipitation: <span class="precipitation__today">${Math.round(maxTempWeather.pop*100)}</span>%
            </p>
            <p class="card__humidity">
                Humidity: <span class="humidity__today">${maxTempWeather.main.humidity}</span> %
            </p>
            <p class="card__wind">
                The wind: <span class="wind__today">${maxTempWeather.wind.speed}</span> m/s
            </p>
        </div>
        <div class="card__right">
            <div class="card__tabs tabs">
                <div class="card__tab-header tab-header">
                    <a href="#" class="card__tab__btn tab__btn active" data-tab-btn>
                        Temperature
                    </a>
                    <a href="#" class="card__tab__btn tab__btn" data-tab-btn>
                        Chance of precipitation
                    </a>
                </div>
                <div class="tab card__tab weather__temp-stat active" data-tab>
                    ${hourlyTempHTML(dayWeather)}
                </div>
                <div class="tab card__tab weather__temp-stat" data-tab>
                    ${hourlyPrecipitationHtml(dayWeather)}
                </div>
            </div>
        </div>`;
}

function hourlyPrecipitationHtml(data: WeatherInTimeI[]){
    let HTML = '';
    data.forEach(item => {
        const time = new Date(item.dt_txt).getHours();
        const pop = Math.round(item.pop * 100);
        HTML += `
        <div class="weather__hourly-info">
            <div class="precipitation__diagram">
                <div class="precipitation__diagram-line" style='height: ${pop}%;'></div>
            </div>
            <span class="chance_precipitation">${pop}%</span>
            <span class="weather__hourly-time">${time}:00</span>
         </div>
        `;
    });

    return HTML;
}

function hourlyTempHTML(data: WeatherInTimeI[]){
    let HTML = '';
    data.forEach(item => {
        const time = Date.parse(item.dt_txt)
        const temp = Math.round(item.main.temp);
        const icon = getIcon(item.weather[0].main, item.weather[0].description, temp, time);
        HTML += `
        <div class="weather__hourly-info">
            <iframe class="weather__hourly-ico ico" src="${icon}" frameborder="0" scrolling="no"></iframe>
            <span class="weather__hourly-temp">${temp} °C</span>
            <span class="weather__hourly-time">${new Date(time).getHours()}:00</span>
        </div>
        `;
    });

    return HTML;
}

export default cardContent;