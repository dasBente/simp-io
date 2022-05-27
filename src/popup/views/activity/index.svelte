<script>
    import {paymentsByDay, years} from '../../stores/payments';
    import Range from "./Range.svelte";
    import dataViews from "./dataViews";
    import {datesForVisualization} from "./processing";

    let view = 0;
    let year = false;

    let range = datesForVisualization(year);
    let data = range.map(d => $paymentsByDay[d.date] || []);
</script>

<div>
    <svg>
        <g transform="translate(0,60)">
            <Range view={dataViews[view]} {range} {data} />
        </g>
    </svg>

    <footer>
        <select bind:value={view}>
            {#each dataViews as v, i}
                <option value={i}>{v.title}</option>
            {/each}
        </select>
    </footer>
</div>

<style>
    select { color: white; height: 38px; width: 200px; margin: 0; padding: 0; appearance: none; }
    option { color: black; }

    div {
        height: 510px;
        width: 100%;
    }

    svg { width: 100%; height: 510px; }

    footer {
        width: 100%;
        height: 50px;
        padding: 4px;
        color: white;
        background: black;
    }
</style>
