<script>
    import DataTable, { Head, Row, Cell, Body } from '@smui/data-table';
    import Button from '@smui/button';
    import HeaderCell from './HeaderCell.svelte';

    import { calcTotals } from '../libs/aggregate'
    import { trunc } from '../libs/utils'

    export let data;

    let sortBy = 'total';

    const sortFn = key => (a, b) => key === 'channel'
        ? a.name > b.name : a.data[key] < b.data[key];
    
    $: totals = data.map(calcTotals).sort(sortFn(sortBy));
</script>

<DataTable table$aria-label="Aggregated Superchats" style="max-width: 100%">
    <Head>
        <Row>
            <HeaderCell bind:sortBy label="Channel" id="channel" />
            <HeaderCell bind:sortBy label="# Superchats" id="count" />
            <HeaderCell bind:sortBy label="Σ Superchats" id="total" />
            <HeaderCell bind:sortBy label="Ø Superchat" id="mean" />
        </Row>
    </Head>
    <Body>
        {#each totals as t}
        <Row>
            <Cell>{t.name}</Cell>
            <Cell>{t.data.count}</Cell>
            <Cell>{t.symbol} {trunc(t.data.total, 2)}</Cell>
            <Cell>{t.symbol} {trunc(t.data.mean, 2)}</Cell>
        </Row>
        {/each}
    </Body>
</DataTable>