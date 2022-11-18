import { store } from './../redux/store';
import { WeatherInTimeI } from './weather.interface';


export function parseWeather(weather: WeatherInTimeI[]){
    const weatherPerWeek: WeatherInTimeI[][] = []
    
    let prevDay: number
    let j = 0

    weather.forEach((element, _) => {
        const currentDay = new Date(element.dt_txt).getDate()
        if (!prevDay){
            prevDay = currentDay
            weatherPerWeek.push(new Array())
        }
        if (prevDay === currentDay){
            weatherPerWeek[j].push(element)
        }else{
            if (weatherPerWeek[0].length < 5){
                weatherPerWeek[0].push(element)
            }
            j++
            prevDay = currentDay
            weatherPerWeek.push(new Array())
            weatherPerWeek[j].push(element)
        }
    })

    return weatherPerWeek
}

export function getMaxTempMoment(arr: WeatherInTimeI[]){
    let maxTemp = -1000
    let maxTempItemIndex = -1
    arr.forEach((item, i) => {
        if(item.main.temp > maxTemp){
            maxTemp = item.main.temp
            maxTempItemIndex = i
        }
    })

    return arr[maxTempItemIndex]
}

export function getMinTempMoment(arr: WeatherInTimeI[]){
    let minTemp = 1000
    let minTempItemIndex = -1
    arr.forEach((item, i) => {
        if(item.main.temp < minTemp){
            minTemp = item.main.temp
            minTempItemIndex = i
        }
    })

    return arr[minTempItemIndex]
}