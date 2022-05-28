<script>
    export let date, xScale, pad;

    let {day, month, year, monthOff, yearOff, week} = date;

    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let x = xScale(week) + monthOff * pad + yearOff * pad;
    let y = xScale(14) + 5;
</script>

{#if day === 1}
    <text class="label {yearOff === 0 ? 'last' : 'current'}" {x} {y} dominant-baseline="hanging">
        {months[month]} {month === 11 || month === 0 ? " '" + year.toString().slice(2) : ''}
    </text>
{/if}

<style>
    .label { font-size: 12px; fill: #bbbbbb; }
    .current { fill: orangered; }
    .last { fill: cornflowerblue; }
</style>
