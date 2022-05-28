<script>
    export let icon, name, total, count, mean;

    const plurality = (word, count) => word + (count !== 1 ? 's' : '');

    export let sortBy;

    const setSortBy = mode => () => sortBy = mode;
</script>

<div class="icon">
    {#if icon}<img src="{icon}" alt="Channel icon for {name}">{/if}
</div>

<div class="stats">
    {#if name}<button on:click={setSortBy('name')} class="name sort-by number">{name}</button>{/if}
    <span>
        Spent
        <button on:click={setSortBy('total')} class="sort-by number">{total}</button> in
        <button on:click={setSortBy('count')} class="sort-by number">{count}</button> {plurality('payment', count)}
        (Ø <button on:click={setSortBy('mean')} class="sort-by number">{mean}</button>)
    </span>
</div>

<style>
    img { border-radius: 50%; }

    .icon {
        display: flex;
        height: 100%;
        width: 50px;
        flex-direction: column;
        justify-content: center;
        margin-top: auto;
        margin-bottom: auto;
    }

    .sort-by {
        padding: 0;
        margin: 0;
        background: none;
        border: none;
        font-size: 16px;
    }

    .number {
        color: orangered;
    }

    .stats {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
    }

    .name {
        text-align: left;
        color: #606c76;
        font-size: 20px;
        font-weight: bolder;
        text-transform: none;
    }
</style>
