import {breakDownCurrency, toDate} from "../data/dataProcessing.js";

export class Payment {
    constructor(...params) {
        if (params.length === 0) return;

        let [type, payment, date, count] = params;

        this.type = type;

        const {amount, symbol} = breakDownCurrency(payment);
        this.amount = amount;
        this.symbol = symbol;

        this.date = toDate(date);

        if (count) this.count = count;
    }

    static fromJson(json) {
        return Object.assign(new Payment(), json);
    }
}
