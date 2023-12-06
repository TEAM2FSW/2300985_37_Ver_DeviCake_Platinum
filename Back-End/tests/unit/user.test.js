const UserService = require("../../services/userService");
const { loginDataMock, registerDataMock, registerAdaDataMock, loginGagalDataMock } = require("../mocks/dataMock");

const userService = new UserService();
const userData = loginDataMock;

describe("Unit Testing : user.service.js", () => {
    it("[-] Login User to DB - Fail", async () => {
        const user = userService.login(loginGagalDataMock.email,loginGagalDataMock.password);
        await expect(user).rejects.toThrow("Pengguna tidak ditemukan.");
    })

    it("[+] Login User to DB - Success", async () => {
        const user = await userService.login(userData.email, userData.password);
        expect(user).toBeDefined(); 
    });
})

describe("Unit Testing : user.service.js", () => {
    it("[+] Register User to DB - Success", async () => {
        const user = await userService.createUser(registerDataMock);
        expect(user).toBeDefined();
        expect(user.email).toBe(registerDataMock.email);
        // Hapus user yang baru dibuat
        await userService.deleteUser(user.user_id);
    });

    it("[-] Register User to DB - Fail (Email Exists)", async () => {
        const user = userService.createUser(registerAdaDataMock);
        await expect(user).rejects.toThrow("Email sudah digunakan");
    });

    it("[-] Register User to DB - Fail (Email dan Password Kosong)", async () => {
        const user = userService.createUser(registerAdaDataMock.full_name,registerAdaDataMock.phone_number,registerAdaDataMock.profile_image);
        await expect(user).rejects.toThrow("Email dan password diperlukan");
    });
});