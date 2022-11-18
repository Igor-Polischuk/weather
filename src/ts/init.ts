import showCurrentDateTime from "./datetime/showCurrentTime";
import currentCard from "./modules/currentCard/currentCard";
import desktopCard from "./modules/desktopCard/desktopCard";
import input from "./modules/input/input";
import { mobileCard } from "./modules/mobileCard/mobileCard";
import tabs from "./modules/tabs/tabs";
import { fetchPosition } from "./redux/slices/locationSlice";
import { fetchCurrentWeather, fetchForecast } from "./redux/slices/weatherSlice";
import { showPreview as updatePreviewMobile } from "./modules/mobileCard/showPreview";
import { showPreview as updatePrevieDescktop } from "./modules/desktopCard/showPreview";
import { store } from "./redux/store";

export default async function init(): Promise<void> {
    const { dispatch, getState } = store

    await dispatch(fetchPosition())
    await dispatch(fetchCurrentWeather())
    await dispatch(fetchForecast())

    currentCard()
    desktopCard()
    mobileCard()

    tabs('.weaher__tab')

    showCurrentDateTime()
    input('.header__input')
    input('.mobile__search', false);
}

export async function update(){
    const {dispatch} = store
    await dispatch(fetchCurrentWeather())
    await dispatch(fetchForecast())

    currentCard()
    updatePreviewMobile()
    updatePrevieDescktop()
}