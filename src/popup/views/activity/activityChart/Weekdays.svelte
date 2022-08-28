<script>
    export let xScale;
    let weekdays = "SMTWTFS".repeat(2).split("");
</script>

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

<style>
    .label { font-size: 12px; fill: #bbbbbb; }
    .sunday {fill: orangered;}
</style>
