<script>
    import Button, { Label } from '@smui/button';
    import CircularProgress from '@smui/circular-progress';
    import { expand, getScData } from '../libs/extraction'
    
    export let value;
    
    let processing = false;

    async function calc() {
        processing = true;
        await expand(document.getElementById('more-contents-button'));
        value = getScData();
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