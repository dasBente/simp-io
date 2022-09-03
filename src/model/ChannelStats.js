import {PaymentParser} from "./PaymentParser.js";

export class ChannelStats {
    channels = {};

    addPayment({type, name, date, data}) {
        if (!(name in this.channels)) {
            this.channels[name] = {name};
            PaymentParser.Types.forEach(t => this.channels[name][t] = {});
        }
        const channelData = this.channels[name][type];

        if (!(date in channelData)) channelData[date] = [];
        const day = channelData[date];

        day.push(data);
    }

    addPaymentFromElement(elem) {
        this.addPayment(PaymentParser.fromElement(elem));
    }
}
