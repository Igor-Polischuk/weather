import config from '../config/app.config'
import http from '../http';
import {store} from '../redux/store'
import { WeatherNowI, ForecastI } from './weather.interface';

export async function getCurrentWeather(): Promise<WeatherNowI>{
    const {location} = store.getState()

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${config.weatherApi}&units=metric`
    return await http<WeatherNowI>(url)
} 


export async function getForecast(): Promise<ForecastI>{
    const {location} = store.getState()

    const url= `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${config.weatherApi}&units=metric`
    return await http<ForecastI>(url)
    
} 