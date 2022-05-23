<script>
    import { stats } from '../../../stores/payments';
    import { summary } from '../../../stores/payments';
    import currency from 'currency.js';
    import Entry from "./Entry.svelte";
    import ExportButton from "./ExportButton.svelte";

    stats.subscribe(s => console.log(s))

    const sorted = stats => stats.sort((a, b) => currency(a.total).value < currency(b.total).value);
</script>

<ul>
    {#each sorted($stats) as s, i}
        <li class="data-row" class:striped={i % 2 === 1}>
            <Entry {...s} />
        </li>
    {/each}
</ul>

<div class="data-row" style="padding-top: 8px; background: black; color: white;">
    <Entry {...$summary} />
    <ExportButton />
</div>

<style>
    ul {
        height: 510px;
        width: 100%;
        overflow-y: auto;
        margin-bottom: 0;
    }

    .striped {
        background: #e1e1e1;
    }

    .data-row {
        display: flex;
        flex-direction: row;
        padding: 4px;
        min-height: 50px;
        margin-bottom: 0;
    }
</style>
