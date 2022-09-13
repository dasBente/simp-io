<script>
    import Notice from "./Notice.svelte";
    import {payments} from './stores/payments.js';
    import {processing} from "./stores/application.js";
    import Layout from "./views/Layout.svelte";
    import MessageListener from "./handlers/MessageListener.svelte";
    import Spinner from "./Spinner.svelte";

    $: browser.runtime.sendMessage({id: 'checkProgress'}).then(res => processing.set(res));
</script>

<MessageListener />

{#if $processing}
    <Spinner />
{:else if $payments}
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
