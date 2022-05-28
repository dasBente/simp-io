<script>
    import {scaleBand} from 'd3-scale';

    export let view = {}, width = 300;

    $: scale = scaleBand().domain(view.keys).range([0, width]).paddingInner(.02);
</script>

{#each view.keys as k, i}
    <text x={scale(k) + scale.bandwidth() / 2} y={-5}>{k}</text>
    <rect x={scale(k)} y={0} width={scale.bandwidth()} height="20" fill={view.keyColors[i]}></rect>
{/each}

<style>
    text {
        text-anchor: middle;
        font-size: 12px;
    }
</style>
