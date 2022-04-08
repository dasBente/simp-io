<script>
    import Table from './table/index.svelte';
    
    const fetch = async () => await browser.runtime.sendMessage({ id: 'getScore' });
</script>

<style>
main { width: 500px; }
</style>

<main>
    {#await fetch() then data}
        {#if data.results}
            <Table data={data.results} />
        {:else}
            <h4>No data</h4>
            <p>
                Please visit the 
                <a href="https://www.youtube.com/paid_memberships">YouTube Payment Page</a>
                 to allow simp-io to collect the necessary data for operation.
            </p>
        {/if}
    {/await}
</main>
