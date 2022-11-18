import { CurrentLocation } from "../location/location.interface"


export interface WeatherNowI {
    base: string
    clouds: {
        all: number
    }
    cod: number
    coord: CurrentLocation
    dt: number
    id: number
    main: WeatherMainI
    name: string
    sys: SysI
    timezone: number
    weather: WeatherI[]
    wind: WindI
}

export interface WeatherInTimeI extends Omit<WeatherNowI, "base" | "cod" | "coord" | "id" | "sys">{
    dt_txt: string
    main: WeatherMainExtendedtI
    pop: number
    sys: {
        pod: string
    }
    visibility: number
}

export interface ForecastI {
    city: CityI
    cnt: number
    cod: string
    list: WeatherInTimeI[]
    message: number
}

export interface WeatherMainI {
    feels_like: number
    humidity: number
    pressure: number
    temp: number
    temp_max: number
    temp_min: number
}

export interface WeatherMainExtendedtI extends WeatherMainI {
    grnd_level: string
    sea_level: number
    temp_kf: number
}

export interface SysI {
    country: string
    id: number
    sunrise: number
    sunset: number
    type: number
}

export interface WeatherI {
    id: number
    main: string
    description: string
    icon: string
}

export interface WindI {
    deg: number
    gust: number
    speed: number
}

export interface CityI {
    coord: CurrentLocation
    country: string
    id: number
    name: string
    population: number
    sunrise: number
    sunset: number
    timezone: number
}