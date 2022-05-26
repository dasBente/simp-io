<script>
    import {scaleBand, scaleLog, scaleSequential} from 'd3-scale';
    import {interpolatePlasma} from 'd3-scale-chromatic';
    import {datesForVisualization} from "./processing";

    export let processing;

    let range = datesForVisualization();
    let values = range.map(r => processing(r.date));

    console.log(range);

    let monthPad = 3;

    let xScale = scaleBand()
        .domain([...Array(27).keys()])
        .range([30, 800 - monthPad * 13])
        .paddingInner(.05).paddingOuter(.1);

    let weekdays = "SMTWTFS".repeat(2).split("");
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let valueScale = scaleLog().domain([1, 500]).range([0,1]);
    let colorScale = scaleSequential().domain([0, 1]).interpolator(interpolatePlasma);

    let scaleValue = val => val === 0 ? '#dddddd' : colorScale(valueScale(val));
</script>

<!-- Weekday labels-->
{#each weekdays as w, i}
    <text x={xScale(0) - 20} y={xScale(i) + xScale.bandwidth() / 2} class:sunday={i % 7 === 0} dominant-baseline="central">
        {w}
    </text>
{/each}

{#each range as {weekday, week, month, day, yearOff, monthOff}, i}
    <!-- Month labels -->
    {#if day === 1}
        <text x={xScale(week) + month * monthPad} y={xScale(14) + 5} dominant-baseline="hanging">
            {months[month]}
        </text>
    {/if}

    <rect x={xScale(week) + monthOff * monthPad + yearOff * monthPad}
          y={xScale(weekday) + (weekday !== 0 ? monthPad : 0)}
          fill={scaleValue(values[i])}
          width={xScale.bandwidth()}
          height={xScale.bandwidth() - (weekday !== 0 ? monthPad : 0)}></rect>
{/each}


<style>
    .sunday { fill: orangered; font-weight: bolder; }
</style>
