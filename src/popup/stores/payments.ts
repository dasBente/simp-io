import { readable, derived } from 'svelte/store';
import currency from 'currency.js';

import {summarize} from "../../data/payments.js";

export const payments = readable(undefined, set => {
    browser.runtime.sendMessage({ id: 'getScore' }).then(res => set(res.results));
    return () => set(undefined);
});

export const stats = derived(payments, $payments => $payments.map(summarize));
export const currencySymbol = derived(stats, $stats => $stats[0].symbol);

export const summary = derived(stats, $stats => {
    if (!$stats) return { total: 0, count: 0, mean: 0 };

    let symbol = $stats[0].symbol;
    let total = currency($stats.reduce((acc, next) => currency(acc).add(next.total), 0)).format({ symbol });
    let count = $stats.reduce((acc, next) => acc + next.count, 0);
    let mean = currency(total).divide(count).format({ symbol });

    return { total, count, mean };
});

/**
 * Returns all superchats as a list sorted by date of the payment.
 * @type {Readable<unknown>}
 */
export const calendar = derived(
    payments,
    $payments => {
        const transactions = $payments.map(ch => ch.data
            .map(d => ({...d, date: d.date, name: ch.name, price: d.price.symbol + d.price.amount})))
            .reduce((acc, next) => acc.concat(next), []);

        return transactions
            .filter(data => data["date"] && data["price"])
            .sort((a, b) => a.date < b.date);
    }
);

export const paymentsByDay = derived(calendar, $calendar => $calendar
        .reduce((acc, {date, ...rest}) => ({...acc, [date]: acc[date] ? [...acc[date], rest] : [rest]}), {}));

export const years = derived(calendar, $calendar => Array.from(new Set($calendar.map(d => d.date.slice(0, 4)))));
