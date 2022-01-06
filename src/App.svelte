<script>
    import CalcButton from './comps/CalcButton.svelte'
    import ScTable from './comps/SCTable.svelte';
    import { getScData } from './libs/extraction';

    let data = [];

    function updateData() {
        data = getScData();
    }
</script>


<div style="margin-bottom: 1em;">
    <CalcButton on:update={updateData} />
</div>

{#if data.length > 0}
    <ScTable data={data} />
{/if}