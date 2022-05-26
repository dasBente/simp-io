<script>
    import moment from "moment";

    export let y, scale, year, month;

    let size = scale.bandwidth();

    // normalize date format
    let norm = moment(`${year}-${month}`, 'YYYY-MMM').format('YYYY-MM');

    let first = moment(`${norm}-01`).day();
    let last = moment(norm).daysInMonth();
</script>

{#each [...Array(37).keys()].slice(first, first + last) as i, j}
    <rect x="{scale(i)}" {y} width={size} height={size} fill="green"></rect>
{/each}
