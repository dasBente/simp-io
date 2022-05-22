<script>
    import { stats } from '../../stores/payments';
    import { summary } from '../../stores/payments';

    stats.subscribe(s => console.log(s))
</script>

<style>
    ul {
        height: 560px;
        width: 100%;
    }

    img { border-radius: 50%; }

    .icon {
        display: flex;
        height: 100%;
        width: 50px;
        flex-direction: column;
        justify-content: center;
    }

    .stats {
        display: flex;
        flex-direction: column;
        margin-left: 20px;
    }

    .name {
        font-size: 20px;
    }

    .striped {
        background: #e1e1e1;
    }

    li {
        display: flex;
        flex-direction: row;
        padding: 4px;
        min-height: 50px;
        margin-bottom: 0;
    }
</style>

<ul>
    {#each $stats as s, i}
        <li class:striped={i % 2 === 1}>
            <div class="icon">
                {#if s.icon}<img src="{s.icon}" alt="Channel icon for {s.name}">{/if}
            </div>

            <div class="stats">
                <span class="name">{s.name}</span>
                <span>Spent <b>{s.total}</b> in <b>{s.count}</b> payments (Ø <b>{s.mean}</b>)</span>
            </div>
        </li>
    {/each}
</ul>
