const user = require("../models/user");


class UserService {
    constructor() {
        this.userModel = user
    }

    async addUser(payload) {
        const date = new Date();
        const { email, password, full_name, phone_number, role, profile_image, active } = payload;
        const existingEmail = await this.findByEmail(email);

        if (existingEmail) {
            throw new Error("Email Sudah Terdaftar!")
        }

        const encript = await bcrypt.hash(password, 10);

        // Simpan data pengguna ke database
        const inputUser = await this.user.create({
            email,
            password,
            full_name,
            phone_number,
            role,
            profile_image,
            active: true,
            strPassword: encript,
            createdAt: date,
            updatedAt: date,
        });
        return inputUser;
    }

}

module.exports = UserService;