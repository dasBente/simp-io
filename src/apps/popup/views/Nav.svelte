<script>
    import pages from './pages.js';

    export let selected;
</script>

<nav>
    {#each Object.entries(pages) as [id, data], i}
        <button class:active={id === selected} on:click={() => selected = id}>{data.title}</button>
        {#if i < Object.values(pages).length - 1}<span>|</span>{/if}
    {/each}
</nav>

<style>
    button {
        margin: 0;
        padding: 0;
        background: none;
        border: none;
        font-size: 14px;
    }

    nav {
        padding: 0 10px 0 10px;
    }

    .active {
        color: orangered;
    }

    span {
        color: white;
        margin: 0 5px 0 5px;
    }
</style>
