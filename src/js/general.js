import { getLocationByIp, getCitiesCoordinate } from "./locationData";
import {weather, currentWeather} from './weather';
import parseWeather from './parseWeather';


async function getGeneral(){
    const ipData = await getLocationByIp();
    const coordinate = await getCitiesCoordinate(ipData.city);
    const weatherNow = await currentWeather(coordinate);
    weatherNow.dt_txt = new Date();
    const general = {
        city: ipData.city,
        coordinate,
        weather: parseWeather(await weather(coordinate)),
        weatherNow,
        errorLog: []
    };

    return general;
}

const general = getGeneral();

export default general;