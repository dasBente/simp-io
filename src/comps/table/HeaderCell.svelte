<script>
    import { Cell } from '@smui/data-table';
    import Button from '@smui/button';

    export let sortBy, label, id;
    $: variant = sortBy === id ? 'raised' : undefined;
</script>

<Cell>
    <Button on:click={() => sortBy = id} {variant}>
        {label}
    </Button>
</Cell>