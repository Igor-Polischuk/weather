import { getDate } from "./datetime"
import getZero from "./getZero"

export default function showCurrentDateTime(){
    showCurrentDate()
    showCurrentTime()
}

function showCurrentDate(): void{
    const headerMounth = document.querySelector<HTMLSpanElement>('.header__mounth')
    const headerDay = document.querySelector<HTMLSpanElement>('.header__day')

    const {day, mounth, date} = getDate()
    headerMounth.innerText = mounth
    headerDay.innerText = `${day} ${getZero(date)}`
}

function showCurrentTime(): void{
    const clock = document.querySelector<HTMLDivElement>('.header__time')

    const updateClock = () => {
        const {hour, minuts} = getDate()
        clock.innerText = `${getZero(hour)}:${getZero(minuts)}`
    }
    updateClock()
    setInterval(updateClock, 10000)
}
