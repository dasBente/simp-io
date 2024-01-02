import { describe, expect, it } from 'vitest'

import { parseCurrency } from './currency'

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
            expect(parseCurrency(money.toString())).toStrictEqual({amount, currency});
        })
    })

    it("should default to N/A if the currency is missing", () => {
        expect(parseCurrency("120")).toStrictEqual({amount: 120, currency: "N/A"})
    })
})