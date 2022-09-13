import {descendDOM} from "../apps/content/webScraping";
import {fromDate, toDate} from "../data/dataProcessing";

export class Payment<T> {
    type: string = "";
    name: string = "";
    date: string = "";
    data: T = null;

    public static fromElem(elem: Element): Payment<any> {
        const label = elem.getAttribute('aria-label');

        let payment: Payment<any>;

        if (label === "") {
            payment = GiftedMembership.fromElement(elem);
        } else if (label.includes("Super Chat")) {
            payment = SuperChat.fromElement(elem);
        } else {
            throw new Error("No type could be determined for this element.");
        }

        return payment;
    }

    public asDate(): Date {
        return fromDate(this.date);
    }
}

export class SuperChat {
    amount: string;

    constructor(amount) {
        this.amount = amount;
    }

    static fromElement(elem): Payment<SuperChat> {
        const date = descendDOM(elem, [1, 1]);
        const profile = descendDOM(elem, [1, 3, 3]);

        const payment = new Payment<SuperChat>();
        payment.type = "SuperChat";
        payment.name = descendDOM(profile, [1, 1, 0, 1, 0]).textContent;
        payment.date = date.childElementCount > 0 && toDate(descendDOM(date, [0, 1, 0]).textContent);
        payment.data = new SuperChat(descendDOM(profile, [3, 0, 1, 0, 1, 0]).textContent);

        return payment;
    }
}

export class GiftedMembership {
    amount: string;
    count: number;

    constructor(amount, count) {
        this.count = count;
        this.amount = amount
    }

    static fromElement(elem) {
        const date = descendDOM(elem, [1, 1]);
        const profile = descendDOM(elem, [1, 3]);

        const payment = new Payment<GiftedMembership>();
        payment.type = "GiftedMembership";
        payment.name = descendDOM(profile, [3, 1, 1]).textContent.split(" ").reverse().slice(2).reverse().join(" "),
        payment.date = toDate(date.textContent);
        payment.data = new GiftedMembership(
            descendDOM(profile, [3, 3, 0, 1]).textContent,
            descendDOM(profile, [3, 1, 3]).textContent.split(" ")[0]
        )

        return payment;
    }
}
