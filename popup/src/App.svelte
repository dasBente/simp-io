<script>
    import Table from './table/index.svelte';

    const fetch = async () => await browser.runtime.sendMessage({ id: 'getScore' });
</script>

<main>
    {#await fetch() then data}
        <Table data={data.results} />
    {/await}
</main>
