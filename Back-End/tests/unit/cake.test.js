const CakeService = require("../../services/cakeService");
const { addCakeMock, addCakeIncompleteMock } = require("../mocks/dataMock");

const cakeService = new CakeService();

describe("Unit Testing : cake.service.js", () => {
    it("[+] Add Cake - Success", async () => {

        const cake = await cakeService.addCake(addCakeMock);
        expect(cake).toBeDefined();
        expect(cake.name).toBe(addCakeMock.name);
        expect(cake.price).toBe(addCakeMock.price);
    });

    it("[-] Add Cake - Fail (Incomplete Data)", async () => {
        await expect(cakeService.addCake(addCakeIncompleteMock)).rejects.toThrow("Nama dan harga kue diperlukan");
    });
});