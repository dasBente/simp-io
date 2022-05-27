<script>
    import {scaleBand} from 'd3-scale';
    import Weekdays from "./Weekdays.svelte";
    import MonthLabels from "./MonthLabels.svelte";
    export let view = {}, range = [], data = [];

    let values = data.map(view.processor);

    let monthPad = 3;

    let xScale = scaleBand()
        .domain([...Array(27).keys()]).range([20, 800 - monthPad * 13 - 5])
        .paddingInner(.05).paddingOuter(.1);

    let valueScale = view.valueScale(view.domain(values));
</script>

<Weekdays {xScale} />

{#each range as {weekday, week, month, year, day, yearOff, monthOff}, i}
    <MonthLabels {week} {month} {year} {day} {yearOff} {monthOff} {xScale} pad={monthPad} />

    <rect x={xScale(week) + monthOff * monthPad + yearOff * monthPad}
          y={xScale(weekday) + (day === 1 && weekday !== 0 ? monthPad : 0)}
          fill={valueScale(values[i])}
          width={xScale.bandwidth()}
          height={xScale.bandwidth() - (day === 1 && weekday !== 0 ? monthPad : 0)}></rect>
{/each}
