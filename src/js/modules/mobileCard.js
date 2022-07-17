import mobileCardHTML from "./mobileCardHTML";
import {getNextDays, mounthName, daysName} from '../datetime';
import general from '../general';
import {avgPrecipitation, avgWeather} from '../parseWeather';
import {getIconByMain} from '../icons';


let width, height, topPos, currentCard;


export function mobileCard(){
    const cards = document.querySelectorAll('.mobile__card');
    cards.forEach(card => {
        card.addEventListener('click', e => {
            openCard(card);
        });
    });
}

function openCard(card){
    currentCard = card;
    const cardClone = card.cloneNode(true);

    card.style.opacity = '0';
    cardClone.style.position = 'absolute';

    width  = card.getBoundingClientRect().width;
    height = card.getBoundingClientRect().height;

    topPos = card.offsetTop;

    cardClone.style.top = topPos + 'px';
    cardClone.style.width = width + 'px';
    cardClone.style.height = height + 'px';

    card.parentNode.appendChild(cardClone);

    requestAnimationFrame(() => {
        cardClone.style.transition = `
            height 200ms ease-in-out,
            top 200ms ease-in-out`;
        cardClone.style.height = '100%';
        cardClone.style.top = '0px';
    });

    showContent(cardClone);
}

function getDateForCard(dayNum){
    dayNum = +dayNum;
    let day = getNextDays();
    const date = new Date(day[dayNum]);
    return `${daysName[date.getDay()]} ${date.getDate()} ${mounthName[date.getMonth()]}`;
}

async function showContent(card){
    hidePreview(card);
    const content = document.createElement('div');
    content.classList.add('mobile-weather');
    const city = (await general).city;
    const weather = (await general).weather;
    const weatherNow = (await general).weatherNow;
    const data = {
        day: card.dataset.day,
        city,
        weather,
        weatherNow,
        time: getDateForCard(card.dataset.day)
    };
    content.innerHTML = mobileCardHTML(data);

    setTimeout(() => {
        card.append(content);
        requestAnimationFrame(() => {
            content.style.transition = `transform 400ms ease-in-out`;
            content.style.transform = 'translateY(0)';
        });

        const closeBtn = card.querySelector('button');

        closeBtn.addEventListener('click', () => {
        closeCard(card);
    });
    }, 400);
}

function hidePreview(card){
    const cardPreview = card.querySelector('.mobile__card__preview');

    requestAnimationFrame(() => {
        cardPreview.style.transition = `
            transform 400ms ease-in-out,
            opacity 400ms ease-in-out`;
        cardPreview.style.transform = 'translateY(200px)';
        cardPreview.style.opacity = '0';
    });

    setTimeout(() => cardPreview.style.display = 'none', 401);
}

function closeCard(card){
    card.querySelector('.mobile-weather').remove();

    requestAnimationFrame(() => {
        card.style.transition = `
            height 200ms ease-in-out,
            top 200ms ease-in-out`;
            card.style.height = height + 'px';
            card.style.top = topPos + 'px';
    });


    setTimeout(() => {
        card.remove();
        currentCard.style.opacity = '1';
    }, 201);
}

export function previewInfo(){
    const cards = document.querySelectorAll('.mobile__card');
    cards.forEach(async card => {
        const tempBlock = card.querySelector('.temp');
        const rainBlock = card.querySelector('.rain');
        const icoBlock = card.querySelector('.preview__ico');
        const day = card.dataset.day;
        const temp = [];
        const data = (await general).weather[day];
        data.forEach(item => {
            temp.push(item.main.temp);
        });


        icoBlock.src = getIconByMain(avgWeather(data));
        tempBlock.innerText = Math.max(...temp).toFixed(0) + '°';
        rainBlock.innerText = `Rain: ${(avgPrecipitation(data) * 100).toFixed(0)}%`;
    });
}   
