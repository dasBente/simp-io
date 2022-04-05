const stats = data => ({
    count: data.length,
    total: data.reduce((res, next) => res + next, 0),
    mean: data.reduce((res, next) => res + next, 0) / data.length
});

export const calcTotals = channel => ({
    ...channel,
    symbol: channel.data[0].price.symbol,
    data: stats(channel.data.map(d => d.price.amount))
});