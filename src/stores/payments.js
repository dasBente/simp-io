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

    return { ...d, data: undefined, total, mean, count, symbol };
}));

export const summary = derived(stats, $stats => {
    if (!$stats) return { total: 0, count: 0, mean: 0 };

    let symbol = $stats[0].symbol;
    let total = currency($stats.reduce((acc, next) => currency(acc).add(next.total), 0)).format({ symbol });
    let count = $stats.reduce((acc, next) => acc + next.count, 0);
    let mean = currency(total).divide(count).format({ symbol });

    return { total, count, mean };
});