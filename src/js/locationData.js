import config from "./config/app.config";
import general from './general';

export async function getLocationByIp(){
    try {
        const response = await fetch('https://api.db-ip.com/v2/free/self');
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        showErrors('No internet connection');
    }
}

export async function getCitiesCoordinate(location){
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${config.weatherApi}`;
    let data = await fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(e => {
        document.querySelector('.loader').remove();
        showErrors('No internet connection');

    });

    try {
        return {
            lat: data[0].lat,
            lon: data[0].lon
        };
    } catch (error) {
        (await general).errorLog.push({
            name: 'Incorrect city',
            msg: `City '${location}' could not be found. Check the correct spelling`
        });
        console.log(general);
        return 0;
    }
}

function showErrors(msg){
    const message = document.createElement('div');
    message.innerHTML = `<h1>${msg}</h1>`;
    message.classList.add('error-window');
    document.body.append(message);
}
