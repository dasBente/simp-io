<script>
    import { stats } from '../../stores/payments';
    import { summary } from '../../stores/payments';
    import currency from 'currency.js';

    stats.subscribe(s => console.log(s))

    const sorted = stats => stats.sort((a, b) => currency(a.total).value < currency(b.total).value);
    const plurality = (word, count) => word + (count !== 1 ? 's' : '');
</script>

<ul>
    {#each sorted($stats) as s, i}
        <li class="data-row" class:striped={i % 2 === 1}>
            <div class="icon">
                {#if s.icon}<img src="{s.icon}" alt="Channel icon for {s.name}">{/if}
            </div>

            <div class="stats">
                <span class="name"><b>{s.name}</b></span>
                <span>
                    Spent
                    <b>{s.total}</b> in
                    <b>{s.count}</b> {plurality('payment', s.count)}
                    (Ø <b>{s.mean}</b>)
                </span>
            </div>
        </li>
    {/each}
</ul>

<div class="data-row" style="padding-top: 8px; background: black; color: white;">
    <div class="icon"></div>

    <div class="stats">
        <span>
            Total Spending:
            <b>{$summary.total}</b> in
            <b>{$summary.count}</b> {plurality('payment', $summary.count)}
            (Ø <b>{$summary.mean}</b>)
        </span>
    </div>
</div>

<style>
    ul {
        height: 510px;
        width: 100%;
        overflow-y: auto;
        margin-bottom: 0;
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

    .data-row {
        display: flex;
        flex-direction: row;
        padding: 4px;
        min-height: 50px;
        margin-bottom: 0;
    }
</style>
