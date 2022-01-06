<script>
    import Button, { Label } from '@smui/button';
    import CircularProgress from '@smui/circular-progress';
    import { expand } from '../libs/extraction'
    
    export let value;
    
    let processing = false;

    async function calc() {
        processing = true;
        await expand(document.getElementById('more-contents-button'));
        value = {};
        processing = false;
    }
</script>

{#if !processing}
<Button on:click={calc} variant="raised">
        <Label>Calculate</Label>
</Button>
{:else}
<CircularProgress style="height: 32px; width: 32px;" indeterminate />
{/if}