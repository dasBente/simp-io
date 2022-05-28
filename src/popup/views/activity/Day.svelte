<script>
    export let xScale, pad, color, date;

    let {day, weekday, week, monthOff, yearOff} = date;
    let x = xScale(week) + monthOff * pad + yearOff * pad;

    let firstDayPad = day === 1 && weekday !== 0 ? pad : 0;
    let y = xScale(weekday) + firstDayPad;
    let width = xScale.bandwidth();
    let height = width - firstDayPad;
</script>

<rect {x} {y} fill={color} {width} {height}></rect>
