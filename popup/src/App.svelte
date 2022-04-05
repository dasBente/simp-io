<script>
    import { onMount } from 'svelte';

    let isPaidMembershipPage = false;

    onMount(async () => {
        let url = await new Promise(
            res => browser.tabs.query({ active: true, lastFocusedWindow: true })
                .then(tabs => res(tabs[0].url)));

        isPaidMembershipPage = /youtube.com\/paid_memberships/.test(url);
    });
</script>

<main>
    {#if isPaidMembershipPage}
        <button class="button">Calculate</button>
    {/if}
</main>
