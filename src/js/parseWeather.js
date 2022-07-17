export default function parseWeather(data) {
    let weekWeather = data.list;
    if (data == 0){
        return 0;
    }
    const weatherPerWeek = {
        generalInfo: data.city,
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: []
    };

    let day;
    let j = 0;
    for (let i = 0; i < weekWeather.length; i++) {
        const currentDay = new Date(weekWeather[i].dt_txt).getDate();
        if (!day) {
            day = currentDay;
        }
        if (currentDay === day) {
            weatherPerWeek[j].push(weekWeather[i]);
        } else {
            if(weatherPerWeek[0].length < 5){
                let a = 5 - weatherPerWeek[0].length;
                for (let k = i; k < i + a; k++) {
                    weatherPerWeek[0].push(weekWeather[k]);
                }
            }
            j++;
            day = currentDay;
            weatherPerWeek[j].push(weekWeather[i]);
        }
    }
    return weatherPerWeek;
}

export function avgTemp(data){
    let sum = data.reduce((prev, current) => prev + current.main.temp, 0);
    return sum / data.length;
}

export function avgPrecipitation(data){
    let sum = data.reduce((prev, current) => prev + current.pop, 0);
    return (sum / data.length).toFixed(2);
}

export function avgWeather(data){
    const weatherDescr = [];
    data.forEach(item => {
        weatherDescr.push(item.weather[0].main);
    });

    const moda = {};

    weatherDescr.forEach(item => {
        if(moda[item]){
            moda[item] += 1;
        } else{
            moda[item] = 1;
        }
    });

    let max = -Infinity;

    for (let key in moda){
        if (moda[key] > max){
            max = moda[key];
        }
    }

    return Object.keys(moda).find(key => moda[key] === max);
}

export function avgHumidity(data){
    let sum = data.reduce((prev, current) => prev + current.main.humidity, 0);
    return sum / data.length;
}

export function avgWindSpeed(data){
    let sum = data.reduce((prev, current) => prev + current.wind.speed, 0);
    return sum / data.length;
}

