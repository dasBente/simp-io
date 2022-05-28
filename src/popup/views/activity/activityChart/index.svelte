<script>
    import Key from './Key.svelte';
    import Range from './Range.svelte';

    import {datesForVisualization} from "../processing";
    import {paymentsByDay} from "../../../stores/payments";
    import {applyView} from "../dataViews";

    export let view = {}, year = false;

    $: range = datesForVisualization(year);
    $: data = range.map(d => $paymentsByDay[d.date] || []);

    $: viewData = applyView(data, view);
</script>

<svg>
    <g transform="translate(480,40)">
        <Key view={viewData} witdh="300" />
    </g>
    <g transform="translate(0,60)">
        <Range view={viewData} {range} {data} />
    </g>
</svg>

<style>
    svg { width: 100%; height: 510px; }
</style>
