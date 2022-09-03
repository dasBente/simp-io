export class Channel {
    name;
    payments

    constructor(name) {
        this.name = name;
        this.payments = {};
    }

    addPayment(payment) {
        if (!payment.constructor.name in this.payments) this.payments[payment.constructor.name] = [];
        this.payments[payment.constructor.name].push(payment);
    }

    static fromJson(json) {
        const channel = new Channel(json.name);

        Object.keys(json.payments).forEach(k => {

        })
    }
}
