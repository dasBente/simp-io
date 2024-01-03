import { describe, expect, it } from 'vitest'

import { colorByAmount, parseCurrency, colors, scLevelsByCurrency } from './currency'

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