import '../scss/style.scss';
import input from './modules/input';
import tabs from './modules/tabs';
import {showPreviev, card} from './modules/dayCards/card';
import {mobileCard, previewInfo} from './modules/mobileCard';
import {currentTime, nextDays} from './datetime';
import general from './general';
import mainCardShowWeather from './modules/dayCards/mainCard';
import {loader} from './modules/loader';


window.addEventListener('DOMContentLoaded', async () => {
    loader.showLoader();
    const mainData = await general;
    input('#search-city', true, mainData.city);
    input('.mobile__search input', false, mainData.city);
    tabs('.weaher__tab');
    mainCardShowWeather();
    showPreviev();
    card();
    previewInfo();
    mobileCard();

    // Show dates
    currentTime();
    nextDays();
    loader.loading = true;
    loader.showLoader();

});

