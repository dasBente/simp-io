<script>
    import Entry from './Entry.svelte';
    import Summary from './Summary.svelte';

    import { stats } from '../stores/payments';

    stats.subscribe(s => console.log(s))
</script>

<style>
    table { width: 800px; }
</style>

<table>
    <thead>
        <tr>
            <th></th>
            <th>Channel</th>
            <th>Σ</th>
            <th>#</th>
            <th>Ø</th>
        </tr>
    </thead>
    <tbody>
        {#each $stats as s}
            <Entry channel={s} />
        {/each}
        <Summary />
    </tbody>
</table>