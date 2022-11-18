import { showPreview } from "./showPreview";
import tabs from "../tabs/tabs";
import cardContent from "./desktopCardHTML";


export default function desktopCard() {
    showPreview()
    const dayCards: NodeListOf<HTMLDivElement> = document.querySelectorAll('.day');
    const onCardClick = (e: MouseEvent) => {
        e.preventDefault();
        const card = e.currentTarget as HTMLDivElement
        if ((e.target as Element).classList.contains('day__detail')) {
            openCard(card);

        }
    };

    dayCards.forEach(card => card.addEventListener('click', onCardClick));
}

function openCard(card: HTMLDivElement) {
    const cardClone = card.cloneNode(true) as HTMLDivElement;

    card.style.opacity = '0';
    cardClone.style.position = 'absolute';

    const {
        width,
        height
    } = card.getBoundingClientRect();

    const leftPos = card.closest<HTMLDivElement>('.day').offsetLeft;

    card.parentNode.appendChild(cardClone);
    cardClone.style.top = 0 + 'px';
    cardClone.style.left = leftPos + 'px';
    cardClone.style.width = width + 'px';
    cardClone.style.minHeight = height + 'px';


    requestAnimationFrame(() => {
        cardClone.style.transition = `
			left 300ms ease-in-out,
			width 300ms ease-in-out,
            height 300ms ease-in-out
	      `;

        cardClone.style.width = '100%';
        cardClone.style.height = 'auto';
        cardClone.style.left = '0';
    });

    hideFooter(cardClone)
    showCardContent(cardClone)

    const closeBtn = cardClone.querySelector<HTMLLinkElement>('.day__detail');
    closeBtn.innerText = 'close';

    const closeCard = function (e: MouseEvent) {
        e.preventDefault();
        hideCardContent(cardClone.querySelector<HTMLDivElement>('.card'))
        requestAnimationFrame(() => {
            cardClone.style.left = leftPos + 'px';
            cardClone.style.width = width + 'px';
            cardClone.style.height = height + 'px';
        });

        card.style.opacity = '1';
        setTimeout(() => {
            showFooter(cardClone)
        },320);
        setTimeout(() => {
            cardClone.remove()
        }, 800);
        closeBtn.removeEventListener('click', closeCard);
    };

    closeBtn.addEventListener('click', closeCard);
}

function showCardContent(cardClone: HTMLDivElement): void {
    const day = cardClone.dataset.day
    setTimeout(() => {
        const block = document.createElement('div');
        block.classList.add('card')
        block.classList.add('card__conten')
        block.style.opacity = '0'
        block.innerHTML = cardContent(+day);
        cardClone.insertAdjacentElement('beforeend', block)
        tabs('.card__tabs')
        requestAnimationFrame(() => {
            block.style.transition = '0.4s'
            block.style.opacity = '1'
        })
    }, 400)
}

function hideCardContent(content: HTMLDivElement): void {
    // weatherCardShowInfo(cardClone);
    requestAnimationFrame(() => {
        content.style.transition = '0.3s'
        content.style.opacity = '0'
    })
    setTimeout(() => {
        content.remove()
    }, 350)
}
function hideFooter(element: HTMLDivElement) {
    const cardFooter = element.querySelector<HTMLDivElement>('.day__footer');
    requestAnimationFrame(() => {
        cardFooter.style.transition = '0.6s';
        cardFooter.style.opacity = '0';
        cardFooter.style.transform = 'translateY(100px)';
    });
}

function showFooter(element: HTMLDivElement) {
    const cardFooter = element.querySelector<HTMLDivElement>('.day__footer');
    requestAnimationFrame(() => {
        cardFooter.style.transition = '0.2s';
        cardFooter.style.opacity = '1';
        cardFooter.style.transform = 'translateY(0px)';
    });
}