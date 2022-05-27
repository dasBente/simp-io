<script>
    import {scaleBand} from 'd3-scale';
    export let view = {}, range = [], data = [];

    let values = data.map(view.processor);

    let monthPad = 3;

    let xScale = scaleBand()
        .domain([...Array(27).keys()])
        .range([20, 800 - monthPad * 13 - 5])
        .paddingInner(.05).paddingOuter(.1);

    let weekdays = "SMTWTFS".repeat(2).split("");
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
</script>

<!-- Weekday labels-->
{#each weekdays as w, i}
    <text
            x={xScale(0) - 10}
            y={xScale(i) + xScale.bandwidth() / 2}
            class:sunday={i % 7 === 0} class="label"
            dominant-baseline="central"
            text-anchor="middle"
    >
        {w}
    </text>
{/each}

{#each range as {weekday, week, month, year, day, yearOff, monthOff}, i}
    <!-- Month labels -->
    {#if day === 1}
        <text
                class:sunday={month === 0} class="label"
                x={xScale(week) + monthOff * monthPad + yearOff * monthPad}
                y={xScale(14) + 5}
                dominant-baseline="hanging"
        >
            {months[month]}
            {month === 11 || month === 0 ? " '" + year.toString().slice(2) : ''}
        </text>
    {/if}

    <rect x={xScale(week) + monthOff * monthPad + yearOff * monthPad}
          y={xScale(weekday) + (weekday !== 0 ? monthPad : 0)}
          fill={view.valueScale(values[i])}
          width={xScale.bandwidth()}
          height={xScale.bandwidth() - (weekday !== 0 ? monthPad : 0)}></rect>
{/each}


<style>
    .label { font-size: 12px; fill: #bbbbbb; }
    .sunday { fill: orangered; font-weight: bolder; }
</style>
