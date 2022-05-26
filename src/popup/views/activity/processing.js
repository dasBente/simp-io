import moment from 'moment';

export const dateRange = year => {
    let start = moment(`${year}-01-01`);
    let end = moment(`${year}-12-31`);

    let week = 0;
    let weekCounter = start.weekday()

    let range = [];
    while (start.isSameOrBefore(end)) {
        range.push({
            date: start.format('YYYY-MM-DD'),
            month: start.month(),
            weekday: start.weekday(),
            day: start.date(),
            week
        });

        start = start.add(1, 'd')

        weekCounter++;
        if (weekCounter === 7) {
            weekCounter = 0;
            week++;
        }
    }

    return range
}
