import currency from "currency.js";
import {pluck} from 'underscore';

const sum = arr => arr.reduce((acc, next) => acc + next, 0);

export const summarize = ({data, ...rest}) => {
    if (!data) data = [];

    const prices = pluck(data, 'price');
    const symbol = prices.length === 0 ? "" : prices[0].symbol;
    const amounts = pluck(prices, 'amount');

    const total = currency(sum(amounts)).format({ symbol });
    const count = prices.length;
    const mean = prices.length > 0 ? currency(total).divide(count).format({ symbol }) : "0.00";

    return { ...rest, total, mean, count, symbol };
}
