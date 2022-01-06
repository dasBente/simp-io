<script>
    import DataTable, { Head, Row, Cell, Body } from '@smui/data-table';

    import { calcTotals } from '../libs/aggregate'
    import { trunc } from '../libs/utils'

    export let data;
    
    let totals = data.map(calcTotals).sort((a, b) => a.total < b.total);
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
        <Row>
            <Cell>{t.name}</Cell>
            <Cell>{t.data.count}</Cell>
            <Cell>{t.symbol} {trunc(t.data.total, 2)}</Cell>
            <Cell>{t.symbol} {trunc(t.data.mean, 2)}</Cell>
        </Row>
        {/each}
    </Body>
</DataTable>