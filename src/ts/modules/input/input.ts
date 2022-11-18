import { store } from "../../redux/store"
import debounce from "lodash.debounce";
import { getCities } from "../../location/location";
import { CityInformation } from "../../location/location.interface";
import { setLocation } from "../../redux/slices/locationSlice";
import { update } from "../../init";


export default function input(inputWraper: string, resize = true): void {
    let { city } = store.getState().location
    const wrapper = document.querySelector<HTMLDivElement>(inputWraper)
    const input = wrapper.querySelector<HTMLInputElement>('input')
    input.value = city
    if (resize) {
        resizeInput(input);
    }

    let tips: NodeListOf<HTMLUListElement>
    let cities: CityInformation[] = []
    input.addEventListener('input', debounce(async (e: Event) => {
        const newCity = input.value
        const handle: { (event: Event): void }[] = []

        if (tips && tips.length > 0) {
            tips.forEach((tipItem, i) => {
                tipItem.removeEventListener('click', handle[i])
            })
        }
        cities = (newCity) ? await getCities(newCity) : []
        if (newCity) {
            tipsHTML(cities, wrapper)
            tips = wrapper.querySelectorAll<HTMLUListElement>('.tips li')
        } else {
            hideTips()
        }

        tips.forEach((tipItem, i) => {
            if (cities.length !== 0) {
                const handleClick = (event: Event) => {
                    clickOnCity(cities[i])
                }

                handle.push(handleClick)
                tipItem.addEventListener('click', handleClick)
            }

        })
    }, 500))

    input.addEventListener('keyup', (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (cities.length > 0) {
                clickOnCity(cities[0])
            } else {
                city = store.getState().location.city
                input.value = city
                input.blur()
                hideTips()
                if (resize) {
                    resizeInput(input)
                }
            }


        }
    })

    input.addEventListener('blur', (e: Event) => {
        setTimeout(hideTips, 140)

    })
}


function clickOnCity(city: CityInformation) {
    const newLocation = {
        city: city.name,
        lat: city.lat,
        lon: city.lon
    }

    store.dispatch(setLocation(newLocation))
    hideTips()
    document.querySelectorAll<HTMLInputElement>('input').forEach((el, i) => {
        el.value = city.name
        if (i === 0) {
            resizeInput(el)
        }
    })

    update()

}

function tipsHTML(cities: CityInformation[], wrapper: HTMLDivElement): void {
    const tips = wrapper.querySelector<HTMLUListElement>('.tips')
    let citiesHTML = ''

    if (cities.length === 0) {
        citiesHTML = '<li>Not found</li>'
    } else {
        cities.forEach((item) => {
            citiesHTML += `<li>${item.name} ${', ' + item.state || ''}. ${item.country}</li>`
        })
    }
    tips.innerHTML = citiesHTML
}

function resizeInput(input: HTMLInputElement) {
    const resize = () => input.style.width = input.value.length + 1 + 'ch';
    resize();
    input.addEventListener('input', resize);
}

function hideTips() {
    document.querySelectorAll<HTMLUListElement>('.tips').forEach(el => el.innerHTML = '')
}