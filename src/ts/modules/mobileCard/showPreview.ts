import { getDaysArray } from "../../datetime/datetime"
import { getMaxTempMoment } from "../../weatherAPI/parseWeather"
import { store } from "../../redux/store"
import { getIconByMain } from "../../icons/icons"

export function showPreview(){
    const {forecast, current} = store.getState().weather
    const cards = document.querySelectorAll<HTMLLIElement>('.mobile__card')
    const days = getDaysArray()
    cards.forEach((item, i) => {
        const weather = getMaxTempMoment(forecast[i])
        if (item.classList.contains('nd')){
            item.querySelector<HTMLParagraphElement>('.mobile__card__preview__day').innerHTML
                = `<span style="font-size: 12px">${days[i].mounth} ${days[i].date}</span>
                <span>${days[i].day}</span>`

            const temp = Math.round(weather.main.temp)
            const main = weather.weather[0].main
            const ico = getIconByMain(main)
            const pop = Math.round(weather.pop * 100)

            item.querySelector<HTMLParagraphElement>('.temp').innerText = temp + '°'
            item.querySelector<HTMLParagraphElement>('.rain').innerText = 'Precipitation: ' + pop + '%'
            item.querySelector<HTMLIFrameElement>('.preview__ico').src = ico

        }else{
            const temp = Math.round(current.main.temp)
            const main = current.weather[0].main
            const ico = getIconByMain(main)

            item.querySelector<HTMLParagraphElement>('.temp').innerText = temp + '°'
            item.querySelector<HTMLParagraphElement>('.rain').innerText = main
            item.querySelector<HTMLIFrameElement>('.preview__ico').src = ico
        }



    })
}