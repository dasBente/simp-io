<script>
    import Table from './components/Table.svelte';
    import { payments } from './stores/payments';
</script>

<style>
main { width: 800px; }
</style>

<main>
    {#if $payments}
        <Table />
    {:else}
        <h4>No data</h4>
        <p>
            Please visit the
            <a href="https://www.youtube.com/paid_memberships">YouTube Payment Page</a>
                to allow simp-io to collect the necessary data for operation.
        </p>
    {/if}
</main>
