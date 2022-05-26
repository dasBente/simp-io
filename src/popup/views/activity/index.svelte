<script>
    import {years} from '../../stores/payments';
    import {paymentsByDay} from "../../stores/payments";
    import currency from "currency.js";
    import Range from "./Range.svelte";

    let year = $years[1];

    const processing = date => {
        if (!(date in $paymentsByDay)) return 0;
        return $paymentsByDay[date].map(p => currency(p.price).value).reduce((acc, next) => acc + next);
    }
</script>

<div>
    <svg>
        <g transform="translate(0, -20)">
            <Range {year} {processing} />
        </g>
    </svg>

    <footer>

    </footer>
</div>

<style>
    div {
        height: 510px;
        width: 100%;
    }

    svg { width: 100%; height: 510px; }

    footer {
        width: 100%;
        height: 50px;
        color: white;
        background: black;
    }
</style>
