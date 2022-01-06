<script>
    import CalcButton from './CalcButton.svelte'
    import ScTable from './SCTable.svelte';

    let data = [];
</script>


<div style="margin-bottom: 1em;">
    <CalcButton bind:value={data} />
</div>

{#if data.length > 0}
    <ScTable data={data} />
{/if}