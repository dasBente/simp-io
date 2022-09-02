import {Payment} from "../../src/model/Payment.js";

describe(Payment, () => {
    const instance = new Payment("Superchat", "4€", "Jul 28, 2021");

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
        const instance2 = new Payment("Gifted Memberships", "24.99€", "Jul 27, 1994", 5);
        expect(instance.count).toBe(undefined);
        expect(instance2.count).toBe(5);
    });

    it("can be instanced from it's serialized version", () => {
        const instance3 = Payment.fromJson(instance);
        expect(instance3).toEqual(instance);
    })
});
