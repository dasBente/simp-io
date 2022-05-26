<script>
    import {years} from '../../stores/payments';
    import Monthly from "./Monthly.svelte";

    import {scaleBand} from "d3-scale";

    let dayScale = scaleBand()
        .domain([...Array(37).keys()]).range([40, 796])
        .paddingInner(.05);

    let size = dayScale.bandwidth();

    let weekdays = "SMTWTFS".repeat(6).slice(0, 37).split("");
    let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let year = $years[0];
</script>

<div>
    <svg>
        <!-- Label weekdays -->
        {#each weekdays as w, i}
            <text x={dayScale(i) + dayScale.bandwidth() / 2} y={dayScale(0) - 8} text-anchor="middle" class:sunday={i % 7 === 0}>
                {w}
            </text>
        {/each}

        <!-- Label Months -->
        {#each months as m, i}
            <text x={dayScale(0) - 35} y={dayScale(i) + dayScale.bandwidth() / 2} dominant-baseline="central">
                {m}
            </text>
        {/each}

        {#each months as month, j}
            <Monthly y={dayScale(j)} scale={dayScale} {year} {month} />
        {/each}
    </svg>
</div>

<style>
    div {
        height: 510px;
        width: 100%;
    }

    svg { width: 100%; height: 100%; }

    .sunday { fill: orangered; font-weight: bolder; }

</style>
