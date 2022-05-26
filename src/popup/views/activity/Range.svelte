<script>
    import {scaleBand, scaleLinear} from 'd3-scale';
    import {dateRange} from "./processing";

    export let year, processing;
    let range = dateRange(year || 2000);

    let monthPad = 3;

    let xScale = scaleBand()
        .domain([...Array(27).keys()])
        .range([30, 800 - monthPad * 12])
        .paddingInner(.05).paddingOuter(.1);

    let weekdays = "SMTWTFS".repeat(2).split("");
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let values = range.map(r => processing(r.date));
    console.log(values.filter(v => v > 0));

    let colorRange = scaleLinear().range(['#eeeeee', '#FCD748', '#F6ADAF', '#770077'])
        .domain([0, 10, 100, 500]);
</script>

<!-- Weekday labels -->
{#each weekdays as w, i}
    <text x={xScale(0) - 20} y={xScale(i) + xScale.bandwidth() / 2} class:sunday={i % 7 === 0} dominant-baseline="central">
        {w}
    </text>
{/each}

{#each range as {weekday, week, month, day}, i}
    {#if day === 1}
        <text x={xScale(Math.floor(week / 2)) + month * monthPad} y={xScale(14) + 5} dominant-baseline="hanging">
            {months[month]}
        </text>
    {/if}

    <rect x={xScale(Math.floor(week / 2)) + month * monthPad}
          y={xScale(weekday + ((week % 2) * 7)) + (day === 1 && weekday !== 0 && week % 2 === 1 ? monthPad : 0)}
          fill={colorRange(values[i])}
          width={xScale.bandwidth()}
          height={xScale.bandwidth() - (day === 1 && weekday !== 0 && week % 2 === 1 ? monthPad : 0)}></rect>
{/each}


<style>
    .sunday { fill: orangered; font-weight: bolder; }
</style>
