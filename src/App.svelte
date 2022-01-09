<script>
    import CalcButton from './comps/CalcButton.svelte'
    import ScTable from './comps/table/SCTable.svelte';
    import { getScData } from './libs/extraction';

    let data = [];
</script>


<div style="margin-bottom: 1em;">
    <CalcButton on:update={() => data = getScData()} />
</div>

{#if data.length > 0}
    <ScTable data={data} />
{/if}