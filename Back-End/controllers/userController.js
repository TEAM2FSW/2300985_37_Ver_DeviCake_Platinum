const UserService = require("../services/users.service");

const userService = new UserService

class UserController{
    async listUser(req, res) {
        try {
          const wali = await userService.getUser();
          res.status(200).json({ message: "SUCCES", data: wali });
        } catch (error) {
          res.status(500).json({ message: "FAILED" });
          console.error(error);
        }
      }

      async registerUser(req, res) {
        try {
          await userService.addUser(req.body);
          // Tampilkan pesan sukses atau respons yang sesuai
          res.status(201).json({ message: "Add user berhasil" });
        } catch (error) {
          console.error(error);
          res.status(400).json({ error: error.message });
        }
      }

      async deleteUser(req, res) {
        try {
          const user = await userService.delete(req.params.id);
          res.status(201).json({
            data: user,
            message: "Berhasil Menghapus User",
          });
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Gagal Menghapus User." });
        }
      }

      async updateUser(req, res) {
        try {
            const user = await userService.findOne({
                where: {
                  user_id: req.params.id,
                },
              })
            // Validasi input bisa ditambahkan di sini
            if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
            const {email, password, confPassword, full_name, phone_number, role, profile_image, active } = req.body;
   
            const updatedUser = await userService.upda(paymentId, status);
            res.status(200).json({
                status: "success",
                data: updatedPayment
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: error.message,
            });
        }
    }


}

module.exports = UserController