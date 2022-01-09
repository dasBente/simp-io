<DataTable
    table$aria-label="Aggregated Superchats" style="max-width: 100%"
    sortable bind:sort bind:sortDirection
>
    <Head>
        <Row>
            <Cell columnId="name">
                Channel
                <IconButton class="material-icons">arrow_upward</IconButton>
            </Cell>
            <Cell columnId="count" numeric>
                Number of Superchats
                <IconButton class="material-icons">arrow_upward</IconButton>
            </Cell>
            <Cell columnId="total" numeric>
                Total Money Spent
                <IconButton class="material-icons">arrow_upward</IconButton>
            </Cell>
            <Cell columnId="mean" numeric>
                Average Superchat
                <IconButton class="material-icons">arrow_upward</IconButton>
            </Cell>
        </Row>
    </Head>
    <Body>
        {#each data as t}
        <Row>
            <Cell>{t.name}</Cell>
            <Cell>{t.data.count}</Cell>
            <Cell>{t.symbol} {trunc(t.data.total, 2)}</Cell>
            <Cell>{t.symbol} {trunc(t.data.mean, 2)}</Cell>
        </Row>
        {/each}
    </Body>
</DataTable>

<script>
    import DataTable, { Head, Row, Cell, Body, SortVlaue } from '@smui/data-table';
    import IconButton from '@smui/icon-button';

    import { calcTotals } from '../libs/aggregate'
    import { trunc } from '../libs/utils'

    export let data;

    var sort, sortDirection;
</script>
