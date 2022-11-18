import { store } from "../redux/store";

const icons = {
    thunderstorm: './svg/c_3_thunderstorm.svg',
    clear: {
        day: {
            sunny: 'svg/a_1_sunny.svg',
            littleSunny: 'svg/a_2_little_sunny.svg',
            verySunny: 'svg/a_3_very_sunny.svg'
        },

        night: 'svg/a_4_night.svg'
    },
    drizzle: 'svg/c_1_rainy.svg',
    rain: 'svg/c_1_rainy.svg',
    snow: {
        snow: 'svg/d_1_snow.svg',
        heavySnow: 'svg/d_2_heavy_snow.svg',
        sleet: 'svg/d_3_sleet.svg',
    },
    fog: 'svg/d_4_fog.svg',
    tornado: 'svg/e_4_tornado.svg',
    clouds: {
        cloudy: 'svg/b_2_cloudy.svg',
        party: 'svg/b_1_partly_cloudy.svg',
        very: 'svg/b_3_very_cloudy.svg',
        night: 'svg/b_4_cloudy_night.svg'
    }
};

export function getIcon(main: string, descr: string, temp: number, time: number){
    const isDay = checkIsDay(time)

    if (main === 'Thunderstorm'){
        return icons.thunderstorm;
    }
    if (main === 'Clear'){
        if (!isDay){
            return icons.clear.night;
        }
        if (temp <= 15){
            return icons.clear.day.littleSunny;
        }

        if (15 < temp  && temp <= 30){
            return icons.clear.day.sunny;
        }

        if (temp > 30){
            return icons.clear.day.verySunny;
        }
    }

    if (main === 'Drizzle'){
        return icons.drizzle ;
    }

    if (main === 'Rain'){
        return icons.rain; 
    }

    if (main === 'Snow'){
        if (descr === 'light snow'){
            return icons.snow.snow;
        }
        if (descr === 'Sleet'){
            return icons.snow.sleet;
        } 

        return icons.snow.heavySnow;
    }

    if (main === 'Fog'){
        return icons.fog;
    }

    if (main === 'Tornado'){
        return icons.tornado;
    }

    if (main === 'Clouds'){
        if (descr === 'few clouds' && isDay){
            return icons.clouds.party;
        }
        if (descr === 'few clouds' && !isDay){
            return icons.clouds.night;
        }
        if (descr === 'scattered clouds' || 'broken clouds'){
            return icons.clouds.cloudy;
        }

        if (descr === 'overcast clouds'){
            return icons.clouds.very;
        }
    }
}

export function getIconByMain(main: string){
    if (main === 'Thunderstorm'){
        return icons.thunderstorm;
    }
    if (main === 'Clear'){
         return icons.clear.day.sunny;
    }

    if (main === 'Drizzle'){
        return icons.drizzle ;
    }

    if (main === 'Rain'){
        return icons.rain; 
    }

    if (main === 'Snow'){
        return icons.snow.heavySnow;
    }

    if (main === 'Fog'){
        return icons.fog;
    }

    if (main === 'Tornado'){
        return icons.tornado;
    }

    if (main === 'Clouds'){
        return icons.clouds.cloudy;
    }
}

function checkIsDay(time: number): boolean {
    const { current } = store.getState().weather
    const timezone = current.timezone * 1000
    const sunrise = new Date(current.sys.sunrise * 1000 + timezone)
    const sunset = new Date(current.sys.sunset * 1000 + timezone)
    const currentTime = new Date(time)

    const sunriseHour = sunrise.getHours()
    const sunriseMinutes = sunrise.getMinutes()

    const sunsetHour = sunset.getHours()
    const sunsetMinutes = sunset.getMinutes()

    const currentHour = currentTime.getHours()
    const currentMinutes = currentTime.getMinutes()

    if (currentHour > sunriseHour && currentHour < sunsetHour){
        return true
    }     
    return false
    // return (sunrise < time && time < sunset)
}