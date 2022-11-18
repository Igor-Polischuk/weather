export enum mounthName {
    January,
    February,
    March,
    April,
    May,
    June,
    Jule,
    August,
    September,
    October,
    November,
    December
};

export enum daysName {
    Sunday,
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday
};

export function getDate(){
    let _date = new Date();
    let mounthNum = _date.getMonth();
    let date = _date.getDate();
    let dayNumber = _date.getDay();
    let hour = _date.getHours();
    let minuts = _date.getMinutes();
    
    const day = daysName[dayNumber]
    const mounth = mounthName[mounthNum]
    return{mounth, date, day, hour, minuts};
}

interface DateI{
    date: number
    day: string
    mounth: string
}

export function getDaysArray(){
    let today = new Date()
    let nextDay = new Date(today)
    const days: DateI[] = []
    for (let i = 0; i <= 4; i++){
        nextDay.setDate(today.getDate() + i)
        const date: DateI = {
            date: nextDay.getDate(),
            day: daysName[nextDay.getDay()],
            mounth: mounthName[nextDay.getMonth()]
        }
        
        days.push(date)
    }

    return days
}
