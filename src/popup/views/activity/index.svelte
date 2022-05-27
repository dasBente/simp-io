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

    </footer>
</div>

<style>
    div {
        height: 510px;
        width: 100%;
    }

    svg { width: 100%; height: 510px; }

    footer {
        width: 100%;
        height: 50px;
        color: white;
        background: black;
    }
</style>
