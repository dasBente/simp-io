import { describe, expect, it } from 'vitest'

import { colorByAmount, parseCurrency, colors, scLevelsByCurrency, parsePaymentData } from './currency'
import type { PaymentData } from './types'

describe(parseCurrency, () => {
    it("should determine the correct amount and symbol for a given currency string", () => {
        [
            {money: "€3", amount: 3, currency: "EUR"},
            {money: "$4", amount: 4, currency: "USD"},
            {money: "4.5₪", amount: 4.5, currency: "ILS"},
            {money: "120 A$", amount: 120, currency: "AUD"},
            {money: "450.23 CA$", amount: 450.23, currency: "CAD"}
        ]
        .forEach(({money, amount, currency}) => {
            expect(parseCurrency(money.toString())).toStrictEqual({amount, currency})
        })
    })

    it("should default to N/A if the currency is missing", () => {
        expect(parseCurrency("120")).toStrictEqual({amount: 120, currency: "N/A"})
    })
})

describe(scLevelsByCurrency, () => {
    it("should return appropriate currency tiers for USD", () => {
        expect(scLevelsByCurrency("USD")).toStrictEqual([1, 2, 5, 10, 20, 50, 100, 500])
    })

    it("should return different multiplied values for certain other currencies", () => {
        expect(scLevelsByCurrency("INR"))
            .toStrictEqual([1, 2, 5, 10, 20, 50, 100, 500].map(s => s * 20))
        expect(scLevelsByCurrency("MKD"))
            .toStrictEqual([1, 2, 5, 10, 20, 50, 100, 500].map(s => s * 5))
        expect(scLevelsByCurrency("ISK"))
            .toStrictEqual([1, 2, 5, 10, 20, 50, 100, 500].map(s => s * 150))
    })
})

describe(colorByAmount, () => {
    const checkForCurrency = (curr: string) => {
        const levels = scLevelsByCurrency(curr)
        const results = levels.map(amount => colorByAmount(amount, curr))
        results.forEach((color, i) => expect(color).toBe(colors[i]))
    }

    it("should return specific colors for the right amounts", () => {
        checkForCurrency("USD")
    })

    it("should throw an error if count is 0 or below", () => {
        expect(() => colorByAmount(1, "USD", 0)).toThrowError()
        expect(() => colorByAmount(1, "USD", -1)).toThrowError()
    })

    it("should work for different currencies", () => {
        checkForCurrency("EUR")
        checkForCurrency("PYG")
        checkForCurrency("DKK")
    })

    it("should default to USD for unknown currencies", () => {
        const levels = scLevelsByCurrency("USD")
        levels.forEach(l => expect(colorByAmount(l, "USD")).toBe(colorByAmount(l, "N/A")))
    })

    it("should average out all payments for higher counts", () => {
        expect(colorByAmount(100, "USD", 10)).toBe(colorByAmount(10, "USD", 1))
        expect(colorByAmount(1000, "USD", 500)).toBe(colorByAmount(2, "USD"))
    })
})

describe(parsePaymentData, () => {
    const [date, name, type, money] = ["Dec 11, 2022", "Test User", "Superchat", "€10.0"];
    const formattedDate = "2022-12-11"
    const fallbackDate = "Dec 1, 2022"
    const formattedFallbackDate = "2022-12-01"

    const checkKeys = (res: PaymentData) => {
        const keys = Object.keys(res);
        ["date", "name", "amount", "currency", "type"].forEach(key => {
            expect(keys).toContain(key);
        });
    }

    const validate = (res: PaymentData, override: Partial<PaymentData> = {}) => {
        const {amount, currency} = parseCurrency(money);

        expect(res.name).toBe("name" in override ? override.name : name);
        expect(res.date).toBe("date" in override ? override.date : formattedDate);
        expect(res.type).toBe("type" in override ? override.type : type);
        expect(res.amount).toBe(amount);
        expect(res.currency).toBe(currency);
    }
    
    it("should parse (date, name, type, amount) quadruplets", () => {
        const res = parsePaymentData([date, name, type, money], fallbackDate)
        checkKeys(res);
        validate(res);
    })

    it("should parse (name, type, amount) triplets", () => {
        const res = parsePaymentData([name, type, money], fallbackDate)
        checkKeys(res);
        validate(res, {date: formattedFallbackDate});
    })

    it("should parse (date, type, amount) triplets", () => {
        const res = parsePaymentData([date, type, money], fallbackDate);
        checkKeys(res);
        validate(res, {name: "N/A"});
    })

    it("should parse (type, amount) pairs", () => {
        const res = parsePaymentData([type, money], fallbackDate);
        checkKeys(res);
        validate(res, {name: "N/A", date: formattedFallbackDate});
    })
})