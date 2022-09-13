<script>
    import {scaleBand} from 'd3-scale';

    import Weekdays from "./Weekdays.svelte";
    import MonthLabels from "./MonthLabels.svelte";
    import Day from './Day.svelte';

    export let view = {}, range = [];

    let monthPad = 3;

    let xScale = scaleBand()
        .domain([...Array(27).keys()]).range([20, 800 - monthPad * 13 - 5])
        .paddingInner(.05).paddingOuter(.1);
</script>

<Weekdays {xScale} />

{#each range as date, i}
    <MonthLabels {date} {xScale} pad={monthPad} />
    <Day {date} {xScale} color={view.colors[i]} pad={monthPad} />
{/each}
