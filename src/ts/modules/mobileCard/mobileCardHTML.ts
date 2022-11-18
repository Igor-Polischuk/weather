import { getDaysArray } from '../../datetime/datetime';
import { getIcon } from '../../icons/icons';
import { store } from '../../redux/store'
import { getMaxTempMoment } from '../../weatherAPI/parseWeather';
import { WeatherInTimeI, WeatherNowI } from '../../weatherAPI/weather.interface';

function mobileCardHTML(day: number) {
    const { city } = store.getState().location
    const dayForecast = store.getState().weather.forecast[day]
    const date = getDaysArray()[day]
    let temp: number, ico: string, feels: number, main: string, descr: string, min: number, max: number, humidity: number, wind: number, pop: number

    if (day === 0) {
        const current = store.getState().weather.current
        temp = Math.round(current.main.temp)
        feels = Math.round(current.main.feels_like)
        main = current.weather[0].main
        descr = current.weather[0].description
        const time = Date.now()
        ico = getIcon(main, descr, temp, time)
        min = Math.round(current.main.temp_min)
        max = Math.round(current.main.temp_max)
        humidity = current.main.humidity
        wind = current.wind.speed
        pop = Math.round(dayForecast[0].pop * 100)
    }else{
        const weather = getMaxTempMoment(dayForecast)
        temp = Math.round(weather.main.temp)
        main = weather.weather[0].main
        descr = weather.weather[0].description
        const time = Date.now()
        ico = getIcon(main, descr, temp, time)
        min = Math.round(weather.main.temp_min)
        max = Math.round(weather.main.temp_max)
        humidity = weather.main.humidity
        wind = weather.wind.speed
        pop = Math.round(dayForecast[0].pop * 100)
    }

    return `
    <div class="main-info">
        <div class="location">${city}</div>
        <div class="date">${`${date.day} ${date.date} ${date.mounth}`}</div>
        <div class="temp">
            <div class="weather__descr">
                <span>${descr}</span>
                <iframe class="ico wm_ico" src="${ico}" frameborder="0"></iframe>
            </div>
            <p class="current-temp"><span>${temp}</span>°</p>
            <p class="feels-like">${feelsLike(feels)}</p>
            <p class="extr">${min}° / ${max}°</p>
        </div>
    </div>
    <div class="additional-info">
        <p class="precipitation">
            Precipitation: ${pop}%
        </p>
        <p class="humidity">
            Humidity: ${humidity} %
        </p>
        <p class="wind">
            Wind: ${wind} m/s
        </p>
    </div>
    <div class="hourly">
        <div class="hourly__temp">
            ${generateTempHTML(dayForecast)}
        </div>
        <div class="hourly__rain">
            ${generatePopHTML(dayForecast)}
        </div>
    </div>
    <button>Go back</button>`;
}

function generateTempHTML(data: WeatherInTimeI[]) {
    let HTML = '';
    data.forEach(item => {
        const time = Date.parse(item.dt_txt)
        const temp = Math.round(item.main.temp)
        const main = item.weather[0].main
        const descr = item.weather[0].description
        const ico = getIcon(main, descr, temp, time)

        HTML += `
        <div class="temp-in-hour">
            <iframe src="${ico}" class="ico hourly-ico" frameborder="0"></iframe>
            <p class="temp">${temp}°</p>
            <p class="time">${new Date(time).getHours()}:00</p>
        </div>
        `;
    });

    return HTML;
}

function generatePopHTML(data: WeatherInTimeI[]) {
    let HTML = '';
    data.forEach(item => {
        const time = new Date(item.dt_txt).getHours();
        const pop = Math.round(item.pop * 100);

        HTML += `
            <div class="precipitation-in-hour">
                <div class="precipitation-graf">
                    <div class="precipitation-graf__line" style='height: ${pop}%'></div>
                </div>
                <p class="precipitation">${pop}%</p>
                <p class="time">${time}:00</p>
            </div>
        `;
    });

    return HTML;
}

function feelsLike(feeling: number) {
    if (feeling) {
        return `Feels like: ${feeling}°`;
    }
    return '';
}

export default mobileCardHTML;
