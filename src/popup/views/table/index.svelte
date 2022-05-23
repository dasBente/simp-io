<script>
    import { stats } from '../../stores/payments';
    import { summary } from '../../stores/payments';
    import currency from 'currency.js';
    import Entry from "./Entry.svelte";
    import ExportButton from "./ExportButton.svelte";

    let sortBy = 'total';

    const selectSort = mode => {
        switch (mode) {
            case 'total':
                return $stats.sort((a, b) => currency(a.total).value < currency(b.total).value);
            case 'name':
                return $stats.sort((a, b) => a.name < b.name);
            case 'count':
                return $stats.sort((a, b) => a.count < b.count);
            case 'mean':
                return $stats.sort((a, b) => currency(a.mean).value < currency(b.mean).value);
            default:
                return selectSort('total');
        }
    }

    $: sorted = selectSort(sortBy);
</script>

<ul>
    {#each sorted as s, i}
        <li class="data-row" class:striped={i % 2 === 1}>
            <Entry {...s} bind:sortBy={sortBy} />
        </li>
    {/each}
</ul>

<div class="data-row" style="padding-top: 8px; background: black; color: white;">
    <Entry {...$summary} bind:sortBy={sortBy} />
    <ExportButton data={$stats}/>
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
