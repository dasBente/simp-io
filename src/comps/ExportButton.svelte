<script>
    import Button, { Label } from '@smui/button';

    export let data = [];
    
    function exportCsv() {
        let a = document.createElement('a');
        a.innerText = "Export data as .csv";
        
        let content = encodeURI('data:text/csv;charset=utf-8,' + csv);
        a.href = content;
        a.download = "data.csv";

        elem.appendChild(a);
    }
</script>

<Button on:click={exportCsv} disabled={!data || data.length == 0}>
    <Label>Export CSV</Label>
</Button>