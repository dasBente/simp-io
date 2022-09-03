import {toDate} from "../data/dataProcessing.js";
import {descendDOM} from "../content/webScraping.js";

export class PaymentParser {
    type;
    name = "";
    date = "";
    data = {};

    static fromElement(elem) {
        const label = elem.getAttribute('aria-label');

        if (label === "") {
            return GiftedMembership.fromElement(elem);
        } else if (label.includes("Super Chat")) {
            return SuperChat.fromElement(elem);
        } else {
            throw new Error("No type could be determined for this element.");
        }
    }

    constructor(name, date, data) {
        this.type = this.constructor.name;
        this.name = name;
        this.date = date;
        this.data = data;
    }

    static getType(type) {
        const types = {
            "SuperChat": SuperChat,
            "GiftedMembership": GiftedMembership
        }

        if (!type in types) throw new TypeError(`Unknown type ${type}`);
        return types[type];
    }

    static Types = [SuperChat.constructor.name, GiftedMembership.constructor.name];
}

class SuperChat extends PaymentParser {
    static fromElement(elem) {
        const date = descendDOM(elem, [1, 1]);
        const profile = descendDOM(elem, [1, 3, 3]);

        return new SuperChat(
            toDate(descendDOM(date, [0, 1, 0]).textContent),
            descendDOM(profile, [1, 1, 0, 1, 0]).textContent,
            descendDOM(profile, [3, 0, 1, 0, 1, 0]).textContent
        );
    }
}

class GiftedMembership extends PaymentParser{
    count;

    constructor(payment, date, count) {
        super(payment, date);
        this.count = count;
    }

    static fromElement(elem) {
        const date = descendDOM(elem, [1, 1]);
        const profile = descendDOM(elem, [1, 3]);

        return new GiftedMembership(
            toDate(date.textContent),
            descendDOM(profile, [3, 1, 1]).textContent.split(" ").reverse().slice(2).reverse().join(" "),{
            amount: descendDOM(profile, [3, 3, 0, 1]).textContent,
            count: descendDOM(profile, [3, 1, 3]).textContent.split(" ")[0],
        });
    }
}
