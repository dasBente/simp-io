export const scStepsByCode = {
    'ARS': [10, 20, 50, 100, 200, 500, 1000, 5000],
    'BRL': [1, 2, 5, 10, 20, 50, 100, 500],
    'RUB': [20, 40, 100, 200, 400, 1000, 2000, 10000],
    'UGX': [1000, 2000, 5000, 10000, 20000, 50000, 100000, 500000],
    'INR': [20, 40, 100, 200, 400, 1000, 2000, 10000],
    'PEN': [1, 2, 5, 10, 20, 50, 100, 500],
    'UYU': [15, 30, 75, 150, 300, 750, 1500, 7500],
    'BYN': [1, 2, 5, 10, 20, 50, 100, 500],
    'CZK': [10, 20, 50, 100, 200, 500, 1000, 5000],
    'ZAR': [7, 14, 35, 70, 140, 350, 700, 3500],
    'MXN': [10, 20, 50, 100, 200, 500, 1000, 5000],
    'RSD': [5, 10, 100, 500, 1000, 2500, 5000, 25000],
    'PHP': [25, 50, 125, 250, 500, 1250, 2500, 12500],
    'TWD': [15, 30, 75, 150, 300, 750, 1500, 7500],
    'COP': [2000, 4000, 10000, 20000, 40000, 100000, 200000, 1000000],
    'HNL': [15, 30, 75, 150, 300, 750, 1500, 7500],
    'BAM': [1, 2, 5, 10, 20, 50, 100, 500],
    'BGN': [1, 2, 5, 10, 20, 50, 100, 500],
    'HKD': [5, 10, 25, 50, 100, 250, 500, 2500],
    'CLP': [500, 1000, 2500, 5000, 10000, 25000, 50000, 250000],
    'HUF': [200, 400, 1000, 2000, 4000, 10000, 20000, 100000],
    'NZD': [1, 2, 5, 10, 20, 50, 100, 500],
    'PYG': [5000, 10000, 25000, 50000, 100000, 250000, 500000, 2500000],
    'NIO': [25, 50, 125, 250, 500, 1250, 2500, 12500],
    'AUD': [1, 2, 5, 10, 20, 50, 100, 500],
    'BOB': [5, 10, 25, 50, 100, 250, 500, 2500],
    'SGD': [1, 2, 5, 10, 20, 50, 100, 500],
    'CAD': [1, 2, 5, 10, 20, 50, 100, 500],
    'HRK': [5, 10, 25, 50, 100, 250, 500, 2500],
    'CRC': [500, 1000, 2500, 5000, 10000, 25000, 50000, 250000],
    'DOP': [50, 100, 250, 500, 1000, 2500, 5000, 25000],
    'GTQ': [7, 14, 35, 70, 140, 350, 700, 3500],
    'KRW': [1000, 2000, 5000, 10000, 20000, 50000, 100000, 500000],
    'JPY': [100, 200, 500, 1000, 2000, 5000, 10000, 50000],
    'MKD': [5, 10, 100, 500, 1000, 2500, 5000, 25000],
    'USD': [1, 2, 5, 10, 20, 50, 100, 500],
    'NOK': [10, 20, 50, 100, 200, 500, 1000, 5000],
    'CHF': [1, 2, 5, 10, 20, 50, 100, 500],
    'ISK': [150, 300, 750, 1500, 3000, 7500, 15000, 75000],
    'SEK': [10, 20, 50, 100, 200, 500, 1000, 5000],
    'EUR': [1, 2, 5, 10, 20, 50, 100, 500],
    'RON': [5, 10, 25, 50, 100, 250, 500, 2500],
    'GBP': [1, 2, 5, 10, 20, 50, 100, 500],
    'PLN': [5, 10, 25, 50, 100, 250, 500, 2500],
    'DKK': [10, 20, 50, 100, 200, 500, 1000, 5000],
}

export const symToCode = sym => {
    if (sym.length === 3) sym.replace(/$/, 'D');

    let code = {
        '$': 'USD',
        '€': 'EUR',
        '£': 'GBP',
        '¥': 'JPY',
        '₪': 'ILS',
        '₩': 'KRW',
        'A$': 'AUD',
        'MXD': 'MXN', // slightly hacky
    }[sym];

    return code || sym;
}

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
