<script>
    export let channel;
    let { name, icon, total, count, mean } = channel;
</script>

<style>
    img { border-radius: 50%; }
</style>

<tr>
    <td>{#if icon}<img src="{icon}" alt="Channel icon for {name}">{/if}</td>
    <td>{name}</td>
    <td>{total}</td>
    <td>{count}</td>
    <td>{mean}</td>
</tr>