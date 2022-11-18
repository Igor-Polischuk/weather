import mobileCardHTML from "./mobileCardHTML";
import { showPreview } from "./showPreview";

let width: number, height: number, topPos: number, currentCard: HTMLDivElement;

export function mobileCard() {
    showPreview()
    const cards: NodeListOf<HTMLDivElement> = document.querySelectorAll('.mobile__card');
    cards.forEach(card => {
        card.addEventListener('click', e => {
            openCard(card);
        });
    });
}

function openCard(card: HTMLDivElement) {
    currentCard = card;
    const cardClone = card.cloneNode(true) as HTMLDivElement

    card.style.opacity = '0';
    cardClone.style.position = 'absolute';

    width = card.getBoundingClientRect().width
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


async function showContent(card: HTMLDivElement) {
    hidePreview(card);
    const content = document.createElement('div');
    content.classList.add('mobile-weather');
    const day = +card.dataset.day
    content.innerHTML = mobileCardHTML(day);

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

function hidePreview(card: HTMLDivElement) {
    const cardPreview = card.querySelector<HTMLDivElement>('.mobile__card__preview');

    requestAnimationFrame(() => {
        cardPreview.style.transition = `
            transform 400ms ease-in-out,
            opacity 400ms ease-in-out`;
        cardPreview.style.transform = 'translateY(200px)';
        cardPreview.style.opacity = '0';
    });

    setTimeout(() => cardPreview.style.display = 'none', 401);
}

function closeCard(card: HTMLDivElement) {
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
