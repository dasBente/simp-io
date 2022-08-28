<script>
    import moment from 'moment';
    import {payments} from '../../stores/payments';

    let filename = `simpio-${moment().format('YYYY-MM-DD')}.json`

    $: dataString = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify($payments))}`;
</script>

<a class="button" href={dataString} download={filename}>
    Export
</a>

<style>
    a {
        margin-left: auto;
        margin-right: 4px;
        height: 36px;
    }
</style>
