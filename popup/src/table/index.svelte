<script>
    import Entry from './Entry.svelte'
    export let data;
</script>

<table>
    <thead>
        <tr>
            <th></th>
            <th>Channel</th>
            <th>Total</th>
        </tr>
    </thead>
    <tbody>
        {#each data as d}
            <Entry channel={d} />
        {/each}
    </tbody>
</table>