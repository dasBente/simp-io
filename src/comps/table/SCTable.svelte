<script>
    import DataTable, { Head, Row, Cell, Body } from '@smui/data-table';
    import TRow from './Row.svelte'
    import Totals from './Totals.svelte'

    import { calcTotals } from '../../libs/aggregate'

    export let data;
    
    $: totals = data.map(calcTotals).sort((a, b) => a.total < b.total);
</script>

<DataTable table$aria-label="Aggregated Superchats" style="max-width: 100%">
    <Head>
        <Row>
            <Cell>Channel</Cell>
            <Cell>Number of Superchats</Cell>
            <Cell>Total Money Spent</Cell>
            <Cell>Average Superchat</Cell>
        </Row>
    </Head>
    <Body>
        {#each totals as t}
            <TRow name={t.name} symbol={t.symbol} {...t.data} />
        {/each}
        <Totals data={totals} />
    </Body>
</DataTable>