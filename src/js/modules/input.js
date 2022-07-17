import {weather} from '../weather';
import { getCitiesCoordinate } from "../locationData";
import general from '../general';
import mainCardShowWeather from './dayCards/mainCard';
import parseWeather from '../parseWeather';
import {showPreviev} from './dayCards/card';
import {previewInfo} from './mobileCard';
import { loader } from './loader';

export default async function input(selector, resize, city){
    const input = document.querySelector(selector);
    input.value = city;

    if (resize){
        resizeInput(input);
       input.style.width = input.value.length + 1 + 'ch';
    }
    
    input.addEventListener('change', async (e) => {
        input.blur();
        loader.loading = false;
        loader.showLoader();
        document.querySelectorAll('input').forEach(item => item.value = e.target.value);
        (await general).city = e.target.value;
        let coordinates = await getCitiesCoordinate(e.target.value);
        const currentWeather = parseWeather(await weather(coordinates));
        (await general).weather = currentWeather;
        showPreviev();
        previewInfo();
        mainCardShowWeather();
        loader.loading = true;
        loader.showLoader();
    });

    
}

function resizeInput(input){
    const resize = () => input.style.width = input.value.length + 1 + 'ch';
    resize();
    input.addEventListener('input', resize);
}

