export const mounthName = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'Jule',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};

export const daysName = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Friday',
    6: 'Saturday'
};


export function currentTime(){
    showTime();
    setInterval(showTime, 30000);
    function showTime(){
        const {hour, minuts} = getDate();
        document.querySelector('.header__time').innerHTML = `${getZero(hour)}:${getZero(minuts)}`;
    }

    const dateBlock = document.querySelector('.header__date');

    const {mounth, dayNum, day} = getDate();

    // let mounthNum = date.getMonth();
    // let dayNum = date.getDate();
    // let day = date.getDay();

    dateBlock.querySelector('.header__mounth').innerText = mounth;
    dateBlock.querySelector('.header__day').innerText = `${day} ${dayNum}`;
}

export function nextDays(){
    const days = getNextDays();
    showDays('.day__current', days);
    showDays('.mobile__day-name', days);
}

function showDays(selector, days){
    document.querySelectorAll(selector).forEach((dayItem, i) => {
        const day = new Date(days[i + 1]).getDay();
        dayItem.innerText = daysName[day];
    });
}

export function getNextDays(){
    let date = new Date();
    let nextDay = new Date(date);
    let day = 0;
    const days = [];
    while (days.length < 5){
        days.push(nextDay.setDate(date.getDate() + day));
        day++;
    }
    return days;
}

function nextDates(){

}

function getDate(){
    let date = new Date();
    let mounthNum = date.getMonth();
    let dayNum = date.getDate();
    let dayN = date.getDay();
    let hour = date.getHours();
    let minuts = date.getMinutes();

    const mounth = mounthName[mounthNum],
          day = daysName[dayN];

    return {mounth, dayNum, day, hour, minuts};
}

function getZero(num){
    if (num > -10 && num < 10){
        return `0${num}`;
    } else{
        return num;
    }
}
