<script>
    import Key from './Key.svelte';
    import Range from './Range.svelte';

    import {datesForVisualization} from "../processing.js";
    import {currencySymbol, paymentsByDay} from "../../../stores/payments.js";
    import {applyView} from "../dataViews.js";

    export let view = {}, year = false;

    $: range = datesForVisualization(year);
    $: data = range.map(d => $paymentsByDay[d.date] || []);

    $: viewData = applyView(data, view, $currencySymbol);
</script>

<svg>
    <g transform="translate(380,40)">
        <Key view={viewData} width="400" />
    </g>
    <g transform="translate(0,60)">
        <Range view={viewData} {range} />
    </g>
</svg>

<style>
    svg { width: 100%; height: 510px; }
</style>
