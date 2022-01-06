<script>
    import { Row, Cell } from '@smui/data-table';
    import { trunc } from '../../libs/utils'
    
    export let name, count, total, mean, symbol;
</script>

<Row>
    <Cell>{name}</Cell>
    <Cell>{count}</Cell>
    <Cell>{symbol} {trunc(total, 2)}</Cell>
    <Cell>{symbol} {trunc(mean, 2)}</Cell>
</Row>