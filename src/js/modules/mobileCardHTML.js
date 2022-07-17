import {getIcon, getIconByMain} from '../icons';
import {avgPrecipitation, avgWeather, avgHumidity, avgWindSpeed, avgTemp} from '../parseWeather';


function mobileCardHTML(data) {
    const {weather, weatherNow, time, city, day} = data;
    let temp, descr, ico, humidity, wind, feels, max, min;

    const pop = (avgPrecipitation(weather[day]) * 100).toFixed(0);

    console.log(data);
    if (day === '0'){
        temp = Math.round(weatherNow.main.temp);
        descr = weatherNow.weather[0].description;
        ico = getIcon(weatherNow);
        humidity = weatherNow.main.humidity;
        wind = weatherNow.wind.speed;
        feels = (weatherNow.main.feels_like).toFixed(0);
        max = (weatherNow.main.temp_max).toFixed(0);
        min = (weatherNow.main.temp_min).toFixed(0);
    } else{
        ico = getIconByMain(avgWeather(weather[day]));
        descr = avgWeather(weather[day]);
        humidity = (avgHumidity(weather[day])).toFixed(0);
        wind = (avgWindSpeed(weather[day])).toFixed(2);
        const tempArr = [];
        weather[day].forEach(item => tempArr.push(Math.round(item.main.temp)));
        max = Math.max(...tempArr);
        min = Math.min(...tempArr);
        temp = (avgTemp(weather[day])).toFixed(0);
    }

    return `
    <div class="main-info">
        <div class="location">${city}</div>
        <div class="date">${time}</div>
        <div class="temp">
            <div class="weather__descr">
                <span>${descr}</span>
                <iframe class="ico wm_ico" src="${ico}" frameborder="0"></iframe>
            </div>
            <p class="current-temp"><span>${temp}</span>°</p>
            <p class="feels-like">${feelsLike(feels)}</p>
            <p class="extr">${min}°/${max}°</p>
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
            ${genrateTempHTML(weather[day])}
        </div>
        <div class="hourly__rain">
            ${genratePopHTML(weather[day])}
        </div>
    </div>
    <button>Go back</button>`;
}

function genrateTempHTML(data){
    let HTML = '';
    data.forEach(item => {
        const time = new Date(item.dt_txt).getHours();

        HTML += `
        <div class="temp-in-hour">
            <iframe src="${getIcon(item)}" class="ico hourly-ico" frameborder="0"></iframe>
            <p class="temp">${Math.round(item.main.temp)}°</p>
            <p class="time">${time}:00</p>
        </div>
        `;
    });

    return HTML;
}

function genratePopHTML(data){
    let HTML = '';
    data.forEach(item => {
        const time = new Date(item.dt_txt).getHours();
        const pop = (item.pop * 100).toFixed(0);

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

function feelsLike(feeling){
    if (feeling){
        return `Feels like: ${feeling}°`;
    }
    return '';
}

export default mobileCardHTML;
