import { getDaysArray } from "../../datetime/datetime"
import { getIconByMain } from "../../icons/icons"
import { store } from "../../redux/store"
import { getMaxTempMoment, getMinTempMoment } from "../../weatherAPI/parseWeather"

export function showPreview() {
    const days = getDaysArray()
    const forecast = store.getState().weather.forecast
    const cards: NodeListOf<HTMLDivElement> = document.querySelectorAll('.week__day')
    cards.forEach((item, i) => {
        const currentDate = days[i + 1]
        const weatherInMomemt = getMaxTempMoment(forecast[i + 1])
        const main = weatherInMomemt.weather[0].main
        const maxTemp = Math.round(weatherInMomemt.main.temp_max)
        const minTemp = Math.round(getMinTempMoment(forecast[i + 1]).main.temp_min)
        const ico = getIconByMain(main)

        item.querySelector<HTMLSpanElement>('.max').innerText = maxTemp.toString()
        item.querySelector<HTMLSpanElement>('.min').innerText = minTemp.toString()
        item.querySelector<HTMLIFrameElement>('.day__ico').src = ico

        item.querySelector<HTMLHeadingElement>('.day__current').innerHTML
            = `
            <span style="font-size: 12px">${currentDate.mounth} ${currentDate.date}</span>
            <span>${currentDate.day}</span>`
    })
}