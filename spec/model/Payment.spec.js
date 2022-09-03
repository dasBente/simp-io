import {PaymentParser, SuperChat, GiftedMembership} from "../../src/model/PaymentParser.js";

describe("Payment", () => {
    const instance = new PaymentParser("4€", "Jul 28, 2021");

    it("is built from payment information in a superchat", () => {
        expect(instance).toBeDefined();
    });

    it("provides methods to select internal representation of state", () => {
        expect(instance.symbol).toBe("€");
        expect(instance.amount).toBe(4);
        expect(instance.date).toBe("2021-07-28");
        expect(instance.type).toBe("Superchat");
    });

    it("can have a count for some payment types", () => {
        fail();
    });

    it("can be instanced from it's serialized version", () => {
        const instance3 = PaymentParser.fromJson(instance);
        expect(instance3).toEqual(instance);
    });
});

describe("Superchat", () => {

});

describe('GiftedMembership', () => {

});
