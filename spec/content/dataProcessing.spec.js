import {toDate} from '../../src/content/dataProcessing.js';
import moment from "moment";

describe("toDate", () => {
    it("converts MMM DD format into YYYY-MM-DD for the current year", () => {
        const currentYear = moment().year();
        expect(toDate("Aug 21")).toBe(`${currentYear}-08-21`);
    });

    it("converts MMM DD, YYYY into YYYY-MM-DD", () => {
        expect(toDate("Sep 4, 2012")).toBe("2012-09-04");
    });
});


import {breakDownCurrency} from "../../src/content/dataProcessing.js";

describe("breakDownCurrency", () => {
    it("separates currency and amount", () => {
        expect(breakDownCurrency("2.00€")).toEqual({amount: 2, symbol: "€"})
        expect(breakDownCurrency("32.22SGD")).toEqual({amount: 32.22, symbol: "SGD"});
    });

    it("removes whitespace from the expression", () => {
        expect(breakDownCurrency("43.33 $")).toEqual({amount: 43.33, symbol: "$"});
        expect(breakDownCurrency("1.00PHP\n")).toEqual({amount: 1, symbol: "PHP"});
        expect(breakDownCurrency("12\t\nA$ \r")).toEqual({amount: 12, symbol: "A$"});
    });
})


import {spreadDate} from '../../src/content/dataProcessing.js';

describe("spreadDate", () => {
    it("generates a closure", () => {
        const spreader = spreadDate();
        expect(typeof(spreader)).toBe("function");
    });

    it("does not mutate inputs", () => {
        const spreader = spreadDate();

        const input = {};
        expect(spreader(input)).not.toBe(input);
    })

    it("propagates dates to every input without a valid date", () => {
        const spreader = spreadDate();
        spreader({date: "a"});
        expect(spreader({}).date).toBe("a");
        expect(spreader({date: ""}).date).toBe("a");
    })

    it("does not override existing dates", () => {
        const spreader = spreadDate();
        spreader({date: "a"});
        expect(spreader({date: "b"}).date).toBe("b");
    });

    it("switches to propagating any new date it encounters", () => {
        const spreader = spreadDate();
        spreader({date: "a"});
        spreader({date: "b"});
        expect(spreader({}).date).toBe("b");
    });
});


import {addToJson} from '../../src/content/dataProcessing.js';

describe("addToJson", () => {
    it("", () => fail())
});


import {objToArray} from '../../src/content/dataProcessing.js';

describe("objToArray", () => {
    it("", () => fail())
});
