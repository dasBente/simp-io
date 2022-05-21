<script>
    import { stats } from '../stores/payments';
    import { summary } from '../stores/payments';

    stats.subscribe(s => console.log(s))
</script>

<style>
    table { width: 800px; }
    img { border-radius: 50%; }
</style>

<table>
    <!-- Table Header -->
    <thead>
        <tr>
            <th></th>
            <th>Channel</th>
            <th>Σ</th>
            <th>#</th>
            <th>Ø</th>
        </tr>
    </thead>
    <tbody>
        <!-- Channels -->
        {#each $stats as s}
            <tr>
                <td>{#if s.icon}<img src="{s.icon}" alt="Channel icon for {s.name}">{/if}</td>
                <td>{s.name}</td>
                <td>{s.total}</td>
                <td>{s.count}</td>
                <td>{s.mean}</td>
            </tr>
        {/each}

        <!-- Summary of stats -->
        <tr>
            <td></td>
            <td></td>
            <td>{$summary.total}</td>
            <td>{$summary.count}</td>
            <td>{$summary.mean}</td>
        </tr>
    </tbody>
</table>
