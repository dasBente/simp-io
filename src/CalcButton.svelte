<script>
    import Button, { Label } from '@smui/button';
    import CircularProgress from '@smui/circular-progress';
    
    export let value;
    
    let processing = false;

    function calc() {
        processing = true;
        value = {};
    }
</script>

{#if !processing}
<Button on:click={calc}>
        <Label>Calculate</Label>
</Button>
{:else}
<CircularProgress style="height: 32px; width: 32px;" indeterminate />
{/if}