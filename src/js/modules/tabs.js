export default function tabs(selector){
    const tab = document.querySelector(selector),
          tabBtns = tab.querySelectorAll('[data-tab-btn]'),
          tabs = tab.querySelectorAll('[data-tab]');

    tabBtns.forEach((tabBtn, i) => {
        tabBtn.addEventListener('click', e => {
            e.preventDefault();
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabs.forEach(tb => tb.classList.remove('active'));
            e.target.classList.add('active');
            tabs[i].classList.add('active');
        });
    });
}