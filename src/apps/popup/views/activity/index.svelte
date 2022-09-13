<script>
    import {years} from '../../stores/payments.js';
    import dataViews from "./dataViews.js";

    import View from './activityChart/index.svelte';

    let view = 0;
    let year = false;
</script>

<div>
    <View {year} view={dataViews[view]} />

    <footer>
        <select bind:value={view}>
            {#each dataViews as v, i}
                <option value={i}>{v.title}</option>
            {/each}
        </select>

        <select bind:value={year}>
            <option value={false}>Recent</option>

            {#each $years as y}
                <option value={y}>{y}</option>
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

    footer {
        width: 100%;
        height: 50px;
        padding: 4px;
        color: white;
        background: black;
    }
</style>
