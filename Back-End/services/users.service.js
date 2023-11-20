const user = require("../models/user");

class UserService {
  constructor() {
    this.userModel = user;
  }

  async addUser(payload) {
    const date = new Date();
    const {
      email,
      password,
      full_name,
      phone_number,
      role,
      profile_image,
      active,
    } = payload;
    const existingEmail = await this.findByEmail(email);

    if (existingEmail) {
      throw new Error("Email Sudah Terdaftar!");
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

  async findByEmail(email) {
    const data = await this.userModel.findOne({ where: { email } });
    return data;
  }

  async getUser() {
    try {
      return await this.userModel.findAll();
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    const userDelete = this.userModel.destroy({
      where: {
        id,
      },
    });

    return userDelete;
  }

  async updateUser(userId, {email, password, full_name, phone_number, role, profile_image, active}) {
    try {
        const updatedUser = await user.findByPk(userId);
        if (!updatedUser) {
            throw new Error('User tidak ditemukan');
        }

        
        user.email = email;
        user.password = password;
        user.full_name = full_name;
        user.phone_number = phone_number;
        user.role = role;
        user.profile_image = profile_image;
        user.active = true;

        await updatedUser.save();
        return updatedUser;
    } catch (error) {
        console.error('Error saat memperbarui user:', error);
        throw error;
    }
}

  
}

module.exports = UserService;
