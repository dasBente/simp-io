import { parsePaymentData, paymentDateFormat } from "$lib/data/currency";
import { type PaymentData } from "$lib/data/types"

(async function() {
    // Grab the button that expands older payments (if it exists)
    const button = document.getElementsByTagName("yt-button-renderer")[0] as HTMLElement;
    if (!button) {
        console.warn("No button found. If there is a button present on the page to fold out new payments, this is an error and should be reported.")
        return;
    }

    // Wait for the page to be fully expanded
    const waitTime = 100;
    while (button.offsetParent !== null) await new Promise(resolve => setTimeout(resolve, waitTime));
    
    // Extract raw payment data from page elements
    const elements = document.getElementsByTagName("yt-activity-item-renderer")
    const payments = Array.from(elements).map(elem => 
        (elem.textContent || "").split("\n")
        .map(text => text.trim())
        .filter(text => text !== ""));

    let fallbackDate = paymentDateFormat();

    // payments are assumed to be in descending order, so we just need to adjust the date for successive payments.
    const paymentData: PaymentData[] = payments.map((arr: string[]): PaymentData => {
        const data = parsePaymentData(arr, fallbackDate);
        if (fallbackDate != data.date) fallbackDate = data.date;
        return data;
    });

    browser.runtime.sendMessage({ id: 'save-score', data: paymentData });
})();

