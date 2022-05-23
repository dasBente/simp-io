<script>
    export let icon, name, total, count, mean;

    const plurality = (word, count) => word + (count !== 1 ? 's' : '');
</script>

<div class="icon">
    {#if icon}<img src="{icon}" alt="Channel icon for {name}">{/if}
</div>

<div class="stats">
    {#if name}<span class="name">{name}</span>{/if}
    <span>
        Spent
        <b>{total}</b> in
        <b>{count}</b> {plurality('payment', count)}
        (Ø <b>{mean}</b>)
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
    }

    b {
        color: orangered;
    }

    .stats {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
    }

    .name {
        font-size: 20px;
        font-weight: bolder;
    }
</style>
