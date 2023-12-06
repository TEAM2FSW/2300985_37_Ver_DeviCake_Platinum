const AddressService = require("../../services/addressService");
const { addAddressMock } = require("../mocks/dataMock");

const addressService = new AddressService();

describe("Unit Testing : address.service.js", () => {

    it("[+] Add Address - Success", async () => {
        const address = await addressService.addAddress(addAddressMock);
        expect(address).toBeDefined();
        expect(address.user_id).toBe(addAddressMock.user_id);
        expect(address.recipient_name).toBe(addAddressMock.recipient_name);
        expect(address.address).toBe(addAddressMock.address);
        expect(address.phone_number).toBe(addAddressMock.phone_number);
        expect(address.active).toBe(true);
    });

    it("[-] Delete Address - Fail (Address Not Found)", async () => {
        const AddressId = 999; // ID yang tidak ada dalam database
        await expect(addressService.deleteAddress(AddressId)).rejects.toThrow("Address tidak ditemukan");
    });

});