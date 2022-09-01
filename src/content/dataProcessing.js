import moment from "moment";

export function toDate(str) {
    const dateStr = str.replace("\n", "");

    const date = str.split(" ").length === 2
        ? moment(dateStr, 'MMM DD')
        : moment(dateStr, 'MMM DD, YYYY');

    return date.format('YYYY-MM-DD');
}

export function breakDownCurrency(price) {
    return {
        amount: Number(price.replace(/[^0-9.-]+/g, '')),
        symbol: price.replace(/[0-9.-]+/g, '').trim()
    };
}

export function spreadDate() {
    // generate closure to keep information from previous elements
    let date;

    return elem => {
        date = elem.date ? elem.date : date;
        return { ...elem, date: date };
    }
}

export function addToJson(json, data) {
    let { channel, icon, price, date, type } = data;

    let ch = channel in json ? { ...json[channel] } : { name: channel, icon, data: [] };
    ch.data.push({ type, date, price });

    return { ...json, [channel]: ch };
}

/**
 * Turns input object into an array based on keys.
 * @param {object} obj input object
 * @returns array of object items in order of keys
 */
export function objToArray(obj) {
    return Object.keys(obj).map(k => obj[k]);
}
