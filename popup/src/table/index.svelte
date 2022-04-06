<script>
    import data from './testData';

    let symbol = data[0].price.symbol;
    
    const summarize = data => {
        let channels = Array.from(new Set(data.map(d => d.channel)));
        let res = channels.reduce((acc, next) => ({ ...acc, [next]: 0 }), {});
        data.forEach(d => res[d.channel] += d.price.amount);
        return Object.entries(res);
    }

    let totals = summarize(data);
</script>

<table>
    <thead>
        <tr>
            <th>Channel</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        {#each totals as [key, value]}
            <tr>
                <td>{key}</td>
                <td>{value} {symbol}</td>
            </tr>
        {/each}
    </tbody>
</table>