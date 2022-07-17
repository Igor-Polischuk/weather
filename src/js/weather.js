import config from "./config/app.config"; 

export async function weather(coordinates){
    if (coordinates === 0){
        return 0;
    }
    const url = `https://api.openweathermap.org/data/2.5/forecast?` +
                 `lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${config.weatherApi}&units=metric`;
    const response = await fetch(url);
    return await response.json();
}

export async function currentWeather(coordinates){
    if (coordinates === 0){
        return 0;
    }
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?`+
            `lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${config.weatherApi}&units=metric`);
    
    return await response.json();
}
