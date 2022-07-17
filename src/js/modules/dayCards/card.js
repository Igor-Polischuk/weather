import cardContent from "./cardContent";
import tabs from "../tabs";
import general from '../../general';
import {avgPrecipitation, avgWeather} from '../../parseWeather';
import {getIconByMain} from '../../icons';

export function card() {
    const dayCards = document.querySelectorAll('.day');
    const onCardClick = e => {
        e.preventDefault();
        if (e.target.classList.contains('day__detail')) {
            openWeatherCard(e);
        }
    };

    dayCards.forEach(card => card.addEventListener('click', onCardClick));
}

function openWeatherCard(e) {
    const card = e.currentTarget;
    const cardClone = card.cloneNode(true);

    card.style.opacity = '0';
    cardClone.style.position = 'absolute';

    const {
        width,
        height
    } = card.getBoundingClientRect();

    const leftPos = e.target.closest('.day').offsetLeft;

    card.parentNode.appendChild(cardClone);
    cardClone.style.top = 0 + 'px';
    cardClone.style.left = leftPos + 'px';
    cardClone.style.width = width + 'px';
    cardClone.style.minHeight = height + 'px';


    requestAnimationFrame(() => {
        cardClone.style.transition = `
			left 200ms ease-in-out,
			width 200ms ease-in-out,
            height 200ms ease-in-out
	      `;

        cardClone.style.width = '100%';
        cardClone.style.height = 'auto';
        cardClone.style.left = '0';
    });

    weatherCardShowInfo(cardClone);

    const closeBtn = cardClone.querySelector('.day__detail');
    closeBtn.innerText = 'close';

    const closeCard = function (e) {
        e.preventDefault();
        requestAnimationFrame(() => {
            cardClone.style.left = leftPos + 'px';
            cardClone.style.width = width + 'px';
            cardClone.style.height = height + 'px';
            cardClone.querySelector('.card').style.transition = '0.7s';
            cardClone.querySelector('.card').style.transform = 'translateY(-100%)';
            cardClone.querySelector('.card').style.opacity = '0';
        });

        card.style.opacity = '1';

        
        setTimeout(() => cardClone.remove(), 500);
        closeBtn.removeEventListener('click', closeCard);
    };

    closeBtn.addEventListener('click', closeCard);
}

async function weatherCardShowInfo(element) {
    const card = element;
    hideFooter(card);

    const block = document.createElement('div');
    const day = +card.dataset.day;
    const dayWeather = (await general).weather[day];
    const sunrise = (await general).weather.generalInfo.sunrise;
    const sunset = (await general).weather.generalInfo.sunset;
    block.innerHTML = cardContent(dayWeather, sunrise, sunset);

    block.style.transition = `
    opacity 200ms,
    transform 200ms
  `;
    block.style.opacity = '0';
    block.style.transform = 'translateY(-100px)';

    setTimeout(() => {
        card.insertAdjacentElement('beforeend', block);
        tabs(".card__tabs");
        requestAnimationFrame(() => {
            block.style.opacity = '1';
            block.style.transform = 'translateY(0px)';
        });
    }, 400);


}

function hideFooter(element) {
    const cardFooter = element.querySelector('.day__footer');
    requestAnimationFrame(() => {
        cardFooter.style.transition = '0.6s';
        cardFooter.style.opacity = '0';
        cardFooter.style.transform = 'translateY(100px)';
    });
}

export function showPreviev(){
    const cards = document.querySelectorAll('.day');
    cards.forEach(async card => {
        const max = card.querySelector('.day__main-info p .max');
        const min = card.querySelector('.day__main-info p .min');
        const pop = card.querySelector('.day__main-info p .pop');
        const ico = card.querySelector('.day__ico');

        const day = card.dataset.day;
        const temp = [];
        const data = (await general).weather[day];
        data.forEach(item => {
            temp.push(item.main.temp);
        });
        max.innerText = Math.max(...temp).toFixed(0);
        min.innerText = Math.min(...temp).toFixed(0);
        pop.innerText = (avgPrecipitation(data) * 100).toFixed(0);
        ico.src = getIconByMain(avgWeather(data));
    });
}