<script>
    import { summary } from '../stores/payments';

    let { total, count, mean } = $summary;
</script>

<tr>
    <td></td>
    <td></td>
    <td>{total}</td>
    <td>{count}</td>
    <td>{mean}</td>
</tr>