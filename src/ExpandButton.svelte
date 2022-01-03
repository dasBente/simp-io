<script>
    import Button, { Label } from '@smui/button';

    function expand() {
        // dirty solution
        let btn = document.getElementById("more-contents-button").childNodes[0].childNodes[0].childNodes[0].childNodes[1];
        setInterval(function() { btn.click(); }, 250); 
    }
</script>

<Button on:click={expand}>
    <Label>Expand SCs</Label>
</Button>