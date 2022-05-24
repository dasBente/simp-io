import { readable, derived } from 'svelte/store';
import currency from 'currency.js';

export const payments = readable(undefined, set => {
    browser.runtime.sendMessage({ id: 'getScore' }).then(res => set(res.results));

    return () => set(undefined);
});

export const stats = derived(payments, $payments => $payments.map(d => {
    let prices = d.data.map(p => p.price.amount);

    let symbol = d.data[0].price.symbol;

    let total = currency(prices.reduce((acc, next) => acc + next, 0)).format({ symbol });
    let count = prices.length;
    let mean = currency(total).divide(count).format({ symbol });

    let {data, ...rest} = d;

    return { ...rest, total, mean, count, symbol };
}));

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
    $payments => $payments
        .map(ch => ch.data
            .map(d => ({...d, date: d.date, name: ch.name, price: d.price.symbol + d.price.amount})))
        .reduce((acc, next) => acc.concat(next), [])
        .sort((a, b) => a.date < b.date)
);

export const paymentsByDay = derived(calendar, $calendar =>
    $calendar.reduce((acc, {date, ...rest}) => ({...acc, [date]: acc[date] ? [...acc[date], rest] : [rest]}), {})
);

export const years = derived(calendar, $calendar => Array.from(new Set($calendar.map(d => d.date.slice(0, 4)))));
