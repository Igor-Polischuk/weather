import {
    avgTemp,
    avgPrecipitation,
    avgWeather,
    avgHumidity,
    avgWindSpeed
} from "../../parseWeather";
import {
    getIconByMain,
    getIcon
} from "../../icons";

function cardContent(data) {
    const temp = Math.round(avgTemp(data));
    const precipitation = Math.round(avgPrecipitation(data) * 100);
    const descr = avgWeather(data);
    const humidity = Math.round(avgHumidity(data));
    const wind = Math.round(avgWindSpeed(data));

    let icoSrc = getIconByMain(descr);

    return `<div class="card card__content">
        <div class="card__left flex column">
            <div class="card__avg-data">
                <iframe src="${icoSrc}" frameborder="0" class="card__ico" scrolling="no"></iframe>
                <div class="flex column">
                    <p class="card__avg-temp">${temp} °C</p>
                    <p class="card__desc">${descr}</p>
                </div>
            </div>
            <p class="card__precipitation">
                Precipitation: <span class="precipitation__today">${precipitation}</span>%
            </p>
            <p class="card__humidity">
                Humidity: <span class="humidity__today">${humidity}</span> %
            </p>
            <p class="card__wind">
                The wind: <span class="wind__today">${wind}</span> m/s
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
                    ${hourlyTempHTML(data)}
                </div>
                <div class="tab card__tab weather__temp-stat" data-tab>
                    ${hourlyPrecipitationHtml(data)}
                </div>
            </div>
        </div>
    </div>`;
}

function hourlyPrecipitationHtml(data){
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

function hourlyTempHTML(data){
    let HTML = '';
    data.forEach(item => {
        const time = new Date(item.dt_txt).getHours();
        const temp = Math.round(item.main.temp);
        const icon = getIcon(item);
        HTML += `
        <div class="weather__hourly-info">
            <iframe class="weather__hourly-ico ico" src="${icon}" frameborder="0" scrolling="no"></iframe>
            <span class="weather__hourly-temp">${temp} °C</span>
            <span class="weather__hourly-time">${time}:00</span>
        </div>
        `;
    });

    return HTML;
}

export default cardContent;