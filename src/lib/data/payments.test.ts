import { expect, describe, it } from 'vitest'

import {parsePaymentData, type PaymentData} from './payments'
import { parseCurrency } from './currency';

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