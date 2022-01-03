<script>
    import Button, { Label } from '@smui/button';
    
    export let value;

    function calc() {

    }
</script>

<Button on:click={calc}>
    <Label>Calculate</Label>
</Button>