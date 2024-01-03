const stepsNormalized = [1, 2, 5, 10, 20, 50, 100, 500]

export const scLevelsByCurrency = (currencyCode: string) => {
    const multipliers: Record<string, number> = {
        'ARS': 10, 'RUB': 20, 'UGX': 1000, 'INR': 20, 'UYU': 15,
        'CZK': 10, 'ZAR': 7, 'MXN': 10, 'RSD': 5, 'PHP': 25,
        'TWD': 15, 'COP': 2000, 'HNL': 15, 'HKD': 5, 'CLP': 500,
        'HUF': 200, 'PYG': 5000, 'NIO': 25, 'BOB': 5, 'HRK': 5,
        'CRC': 500, 'DOP': 50, 'GTQ': 7, 'KRW': 1000, 'JPY': 100,
        'MKD': 5, 'NOK': 10, 'ISK': 150, 'SEK': 10, 'RON': 5,
        'PLN': 5, 'DKK': 10
    }

    if (currencyCode in multipliers) return stepsNormalized.map(s => s * multipliers[currencyCode]);
    return stepsNormalized;
}

const symToCode = (sym: string): string => {
    const symbolToCode: Record<string, string> = {
        '$': 'USD',
        '€': 'EUR',
        '£': 'GBP',
        '¥': 'JPY',
        '₪': 'ILS',
        '₩': 'KRW',
        '₱': 'PHP',
        'A$': 'AUD',
        'R$': 'BRL',
        'MXD': 'MXN', // slightly hacky
    }

    return sym in symbolToCode ? symbolToCode[sym] : sym.replace("$", 'D');
}

/** Colors for respective superchat tiers */
export const colors = [
    'rgba(30,136,229,1)', // 1
    'rgba(0,229,255,1)', // 2
    'rgba(29,233,182,1)', // 5
    'rgba(255,202,40,1)', // 10
    'rgba(245,124,0,1)', // 20
    'rgba(233,30,99,1)', // 50
    'rgba(230,33,23,1)', // 100
    'rgba(230,33,23,1)'  // 500
];

/**
 * Calculates the color corresponding to a respective superchat tier for a given amount of money.  
 * If a count is given, this will be used to determine the average over all payments.
 * 
 * @param amount total amount of money to calculate tier for
 * @param currency currency the payment is made in
 * @param count number of payments constituting the amount (default: 1)
 * @returns string color of the respective superchat tier (average)
 */
export const colorByAmount = (amount: number, currency: string, count: number = 1): string => {
    if (count <= 0) throw new Error("Can't have counts of 0 or lower");
    
    const trueAmount = amount / count;
    const steps = scLevelsByCurrency(currency || 'USD');
    const index = steps.findIndex(x => x > trueAmount) - 1;

    return colors[index < 0 ? steps.length - 1 : index];
}

const amountRegex = /(\b\d+(?:[.,]\d+)?\b(?!(?:[.,]\d+)))/

export const parseCurrency = (data: string): {amount: number, currency: string} => {
    const match = data.match(amountRegex);
    if (!match) throw Error(`Value ${data} not a valid number.`);

    const amount = Number(match[0]);
    const symbol = data.replace(amountRegex, "").trim();
    const currency = symbol === "" ? "N/A" : symToCode(symbol);

    return {amount, currency};
}