<script>
    import Row from './Row.svelte';
    import { sum } from '../../libs/utils';

    export let data;

    $: count = sum(data.map(t => t.data.count));
    $: total = sum(data.map(t => t.data.total));
    $: mean = total / count;
</script>

<Row name="" {count} {total} {mean} symbol={data[0].symbol} />