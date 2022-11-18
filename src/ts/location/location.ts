import config from '../config/app.config';
import http  from '../http';
import { CityInformation, CurrentLocation, Location } from './location.interface';



async function getLocationByIp(): Promise<Location>{
    return await http<Location>(`https://ipinfo.io?token=${config.ipinfo}`)
}


export async function getCities(city: string): Promise<CityInformation[]> {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${config.weatherApi}`;
    return await http<CityInformation[]>(url)

} 

export async function getUserLocation() :Promise<CurrentLocation>{
    const {loc, city} = await getLocationByIp()
    const position = loc.split(',')
    const lat = +position[0]
    const lon = +position[1]
    
    return {lat, lon, city}
}