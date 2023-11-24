const { User } = require("../models");
const bcrypt = require("bcrypt");

class UserService {
  // ... (kode lainnya)

  async createUser(userData) {
    try {
      // Validasi input (Anda mungkin ingin melakukan validasi yang lebih rumit di sini)
      if (!userData.email || !userData.password) {
        throw new Error("Email dan password diperlukan");
      }

      // Cek keberadaan email
      const existingUser = await User.findOne({
        where: { email: userData.email },
      });
      if (existingUser) {
        throw new Error("Email sudah digunakan");
      }

      // Enkripsi password
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      // Membuat user baru
      const user = await User.create({
        ...userData,
        role: "USER",
        password: hashedPassword,
      });

      return user;
    } catch (error) {
      console.error("Error saat membuat pengguna:", error);
      throw error;
    }
  }

  async login(email, password) {
    // Cari pengguna berdasarkan email
    const user = await User.findOne({
      where: { email: email },
    });

    if (!user) {
      throw new Error("Pengguna tidak ditemukan.");
    }

    // Verifikasi password
    const validPassword = await this.checkPassword(password, user.password);

    if (!validPassword) {
      throw new Error("Password salah.");
    }

    // Jika semua verifikasi sukses, kembalikan data pengguna
    return user;
  }

  async checkPassword(inputPassword, storedPasswordHash) {
    return await bcrypt.compare(inputPassword, storedPasswordHash);
  }

  async deleteUser(userId) {
    try {
      // Cari pengguna berdasarkan ID
      const user = await User.findByPk(userId);

      if (!user) {
        throw new Error("Pengguna tidak ditemukan");
      }

      // Hapus pengguna
      await User.destroy({
        where: { user_id: userId },
      });

      return { message: "Pengguna berhasil dihapus." };
    } catch (error) {
      console.error("Error saat menghapus pengguna:", error);
      throw error;
    }
  }

  // ... (kode lainnya)
  async updateUser(
    user_id,
    email,
    password,
    full_name,
    phone_number,
    role,
    profile_image,
    active
  ) {
    try {
      const userDetail = await User.findByPk(user_id);
      if (!userDetail) {
        throw new Error("User  tidak ditemukan");
      }

      let hashPassword;

      if (password === "" || password === null) {
        hashPassword = userDetail.password;
      } else {
        hashPassword = await bcrypt.hash(password, 10);
      }

      userDetail.email = email;
      userDetail.password = hashPassword;
      userDetail.full_name = full_name;
      userDetail.phone_number = phone_number;
      userDetail.role = role;
      userDetail.profile_image = profile_image;
      userDetail.active = active;

      await userDetail.save();
      return userDetail;
    } catch (error) {
      console.error("Error saat memperbarui user:", error);
      throw error;
    }
  }
}

module.exports = UserService;
