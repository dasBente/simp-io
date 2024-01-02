import moment from 'moment'
import { parseCurrency } from './currency';

export type PaymentData = {date: string, name: string, amount: number, currency: string, type: string}

/**
 * Scrapes payment elements from the current page and returns data as cleaned-up strings.
 * @param elements input collection of HTML elements to parse for their payment data
 * @returns array of arrays of strings, where every sub-array is the data associated with one data point
 */
export const extractPaymentData = (elements: HTMLCollectionOf<Element>): Array<Array<string>> => {
    const payments = Array.from(elements);

    return payments.map(elem => 
        (elem.textContent || "").split("\n")
        .map(text => text.trim())
        .filter(text => text !== ""));
}

/**
 * Extracts info about a payment from it's cleaned string array representation
 * @param data payment data lines to be parsed
 * @param fallbackDate date to fall back to when not included in data
 * @returns payment data object
 */
export const parsePaymentData = (data: string[], fallbackDate: string): PaymentData => {
    let date = paymentDateFormat(data[0]);
    
    if (date === "Invalid date") {
        date = paymentDateFormat(fallbackDate);
    } else {
        data = data.slice(1);
    }

    const {amount, currency} = parseCurrency(data[data.length - 1]);

    const name = data.length == 2 ? "N/A" : data[0];
    const type = data[data.length == 2 ? 0 : 1];

    return {date, name, amount, currency, type};
}

export const paymentDateFormat = (date?: string): string => {
    return moment(date).format("YYYY-MM-DD");
}