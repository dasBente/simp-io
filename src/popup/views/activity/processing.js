import moment from 'moment';

/**
 * Generates a range of dates between the two given dates. (Inclusive)
 * @param start First day of the range
 * @param end Last day of the range
 * @returns {*[Date]} Array of dates
 */
export const dateRange = (start, end) => {
    let range = [];

    start = moment(start);
    while (start.isSameOrBefore(end, 'day')) {
        range.push(start.toDate());
        start = start.add(1, 'd');
    }

    return range;
}

export const datesForVisualization = (year = false, weekStack = 2) => {
    let end = year ? moment(`${year}-12-31`) : moment();
    let start = moment(end).add(-1, 'year');

    console.log(end);
    console.log(start);

    return dateRange(start, end).map((d, i) => {
        let day = moment(d);

        return {
            day: day.toDate(), month: day.month(), year: day.year(),
            week: Math.floor((i + start.weekday()) / (7 * weekStack)),
            weekday: (i + start.weekday()) % (7 * weekStack),
            date: day.format('YYYY-MM-DD'),
            yearOff: day.year() - start.year(),
            monthOff: (day.year() - start.year()) * 12 + day.month() - start.month()
        };
    });
}
