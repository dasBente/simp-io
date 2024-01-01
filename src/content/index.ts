/**
 * Finds and repeatedly presses the button that expands the payment data.
 * @param ms wait time between attempts
 */
const expandPayments = async (ms: number) => {
    const button = document.getElementsByTagName("yt-button-renderer")[0] as HTMLElement;
    if (!button) {
        console.warn("No buttton found. If there is a button present on the page to fold out new payments, this is an error and should be reported.")
        return;
    }

    while (button.offsetParent !== null) await new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Scrapes payment elements and returns data as cleaned-up strings.
 * @returns array of arrays of strings, where every sub-array is the data associated with one data point
 */
const extractPaymentData = (): Array<Array<string>> => {
    const payments = Array.from(document.getElementsByTagName("yt-activity-item-renderer"));

    return payments.map(elem => 
        (elem.textContent || "").split("\n")
        .map(text => text.trim())
        .filter(text => text !== ""));
}

const scrapePaymentInfo = async () => {
    expandPayments(100); 
}

scrapePaymentInfo();