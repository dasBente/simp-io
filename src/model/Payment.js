import {breakDownCurrency, toDate} from "../data/dataProcessing.js";
import {descendDOM} from "../content/webScraping.js";

export class Payment {
    amount;
    symbol;
    date;

    constructor(payment, date) {
        if (payment === undefined) return;

        const {amount, symbol} = breakDownCurrency(payment);

        this.amount = amount;
        this.symbol = symbol;
        this.date = toDate(date);
    }

    static fromJson(json) {
        return Object.assign(new this(), json);
    }

    static fromElement(elem) {
        const label = elem.getAttribute('aria-label');

        if (label === null) {
            console.error("Label of element is null, which is not allowed!");
            return;
        }

        if (label === "") {
            return SuperChat.fromElement(elem);
        } else if (label.includes("Super Chat")) {
            return GiftedMembership.fromElement(elem);
        } else {
            console.error("Unknown label " + label)
        }
    }
}

export class SuperChat extends Payment {
    type = "superchat";

    static fromJson(json) {
        return Object.assign(new SuperChat(), json);
    }

    static fromElement(elem) {
        const date = descendDOM(elem, [1, 1]);
        const profile = descendDOM(elem, [1, 3, 3]);

        const payment = new SuperChat(
            descendDOM(profile, [3, 0, 1, 0, 1, 0]).textContent,
            toDate(descendDOM(date, [0, 1, 0]).textContent)
        );

        return {
            name: descendDOM(profile, [1, 1, 0, 1, 0]).textContent,
            payment
        }
    }
}

export class GiftedMembership extends Payment{
    type = "gifted";
    count;

    constructor(payment, date, count) {
        super(payment, date);
        this.count = count;
    }

    static fromElement(elem) {
        const date = descendDOM(elem, [1, 1]);
        const profile = descendDOM(elem, [1, 3]);

        return new GiftedMembership(
            descendDOM(profile, [3, 3, 0, 1]).textContent,
            toDate(date.textContent),
            descendDOM(profile, [3, 1, 3]).textContent.split(" ")[0]
        )
    }
}
