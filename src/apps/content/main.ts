import {browser} from 'webextension-polyfill-ts';
import {fromDate} from "../../data/dataProcessing";
import {scrapePayments} from "./webScraping";

setTimeout(run, 2000);

console.log("Running?");

async function run() {
    let lastDate = fromDate("2022-08-18");//await browser.runtime.sendMessage({id: 'lastDate'});
    let data = await scrapePayments(lastDate);
    console.log(data);
    //await browser.runtime.sendMessage({ id: 'saveScore', data, newDate });
}

/*
async function parseSuperchats(date: string): Promise<Payment<any>[]> {
    let i = 0;
    let payments = paymentElements();

    let res = [];
    let keepSearching = true;

    if (payments.length == 0) return res;

    let more = true;

    while (more) {
        while (i < payments.length) {
            const payment = Payment.fromElem(payments[i], date);
            if (date != payment.date && !keepSearching) return res;
            if (date == payment.date) keepSearching = false;

            res.push(payment);
            i++;
        }

        more = await tryExpand();

        payments = paymentElements();
    }

    return res;
}
*/
