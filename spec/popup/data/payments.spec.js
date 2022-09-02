import {summarize} from "../../../src/popup/data/payments.js";

describe("summarize", () => {
    let minimal = {data: []};

    it("should work even if data is empty", () => {
        expect(summarize({})).toEqual({symbol: "", total: "0.00", count: 0, mean: "0.00"});
    });

    it("has certain fields in it's result", () => {
        let output = Object.keys(summarize(minimal));
        ["total", "mean", "count", "symbol"].forEach(k => expect(output).toContain(k));
    });

    it("does not contain a data field", () => {
        let output = Object.keys(summarize(minimal));
        expect(output).not.toContain("data");
    });

    it("keeps any other fields it might have unchanged", () => {
        expect(summarize( {...minimal, a: 2}).a).toBe(2);
    });
})
