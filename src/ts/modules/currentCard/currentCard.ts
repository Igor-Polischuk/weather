import getZero from "../../datetime/getZero"
import { getIcon } from "../../icons/icons"
import { store } from "../../redux/store"

export default function currentCard(): void {
    updateMainInfo()
    updateTabsInfo()
    
}



function updateMainInfo(){
    const { current } = store.getState().weather
    const weatherCard = document.querySelector<HTMLDivElement>('.weather')
    weatherCard.querySelector<HTMLSpanElement>('.weather__temp .temp').innerText = Math.round(current.main.temp).toString()
    weatherCard.querySelector<HTMLSpanElement>('.max').innerText = Math.round(current.main.temp_max).toString()
    weatherCard.querySelector<HTMLSpanElement>('.min').innerText = Math.round(current.main.temp_min).toString()
    weatherCard.querySelector<HTMLSpanElement>('.weather__descr').innerText = current.weather[0].description
    weatherCard.querySelector<HTMLSpanElement>('.weather__precipitation').innerText = 'Precipitation: ' + Math.round(store.getState().weather.forecast[0][0].pop*100) + '%'
    weatherCard.querySelector<HTMLSpanElement>('.wind__today').innerText = current.wind.speed.toString()
    weatherCard.querySelector<HTMLSpanElement>('.humidity__today').innerText = Math.round(current.main.humidity).toString()
    weatherCard.querySelector<HTMLSpanElement>('.weather__feel .fells').innerText = Math.round(current.main.feels_like).toString()

    const ico = getIcon(current.weather[0].main, current.weather[0].description, current.main.temp, Date.now())
    weatherCard.querySelector<HTMLIFrameElement>('.weather__ico').src = ico
}

function updateTabsInfo() {
    const {forecast} = store.getState().weather
    
    const hourlyTemp: NodeListOf<HTMLDivElement> = document.querySelectorAll('.weaher__temp')
    const hourlyPrecipitation: NodeListOf<HTMLDivElement> = document.querySelectorAll('.weather__hourly-precipitation')

    hourlyTemp.forEach((item, i) => {
        const currentWeather = forecast[0][i]
        const temp = Math.round(currentWeather.main.temp)
        const time = Date.parse(currentWeather.dt_txt)
        const ico  = getIcon(currentWeather.weather[0].main, currentWeather.weather[0].description, temp, time)
        
        item.querySelector<HTMLIFrameElement>('.weather__hourly-ico').src = ico
        item.querySelector<HTMLSpanElement>('.weather__hourly-temp').innerText = temp + ' °C'
        item.querySelector<HTMLSpanElement>('.weather__hourly-time').innerText = getZero(new Date(time).getHours() )+ ':00'
    })

    hourlyPrecipitation.forEach((item, i) => {
        const currentWeather = forecast[0][i]
        const pop = Math.round(currentWeather.pop * 100) 
        const time = Date.parse(currentWeather.dt_txt)
        item.querySelector<HTMLDivElement>('.precipitation__diagram-line').style.height = pop + '%'
        item.querySelector<HTMLSpanElement>('.chance_precipitation').innerText = pop + '%'
        item.querySelector<HTMLSpanElement>('.weather__hourly-time').innerText = getZero(new Date(time).getHours() )+ ':00'
    })
}
