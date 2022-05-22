<script>
    import Notice from "./Notice.svelte";

    ;
    import { payments } from '../stores/payments';
    import Layout from "./views/Layout.svelte";
</script>

{#if $payments}
    <Layout />
{:else}
    <Notice />
{/if}

<style>
    :global(body) {
        padding: 0;
        margin: 0;
        overflow: hidden;
    }
</style>
