<script>
    export let channel;

    let { name, icon, data } = channel;
    let sum = data.map(d => d.price.amount).reduce((acc, next) => acc + next, 0);
    let symbol = data[0].price.symbol;
</script>

<style>
    img { border-radius: 50%; }
</style>

<tr>
    <td>{#if icon}<img src="{icon}" alt="Channel icon for {name}">{/if}</td>
    <td>{name}</td>
    <td>{sum} {symbol}</td>
</tr>