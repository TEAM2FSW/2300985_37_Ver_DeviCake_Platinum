const UserService = require('../services/userService');
const { createTokens } = require('../libs/jwt');
const userService = new UserService();

class UserController {
    // ... (kode lainnya)

    async getUserAll(req, res) {
        try {
            const users = await userService.getUserAll();
            res.status(200).json({
                status: "success",
                data: users
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async getCountUser(req, res) {
        try {
            const users = await userService.getCountUser();
            res.status(200).json({
                status: "success",
                data: users
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
      }
    

    async createUser(req, res) {
        try {
            const { email, password, full_name, phone_number, role, profile_image } = req.body;
            
            // Anda mungkin ingin melakukan validasi tambahan di sini

            const user = await userService.createUser({ email, password, full_name, phone_number, role, profile_image });
            res.status(200).json({
                status: "success",
                data: user,
                message: 'Akun berhasil di daftarkan !!'
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }
    
    async login(req, res) {
        try {
            const user = await userService.login(req.body.email, req.body.password);

            // Membuat JWT token setelah pengguna berhasil login
            const accessToken = createTokens(user);

            const objekUser = {
                full_name: user.full_name,
                user_id: user.user_id,
                email: user.email,
                phone_number: user.phone_number,
                profile_image: user.profile_image,
                role: user.role,
                accessToken: accessToken,
      
              };
            
            res.status(201).json({
                status: 'success',
                data: objekUser,
                message: 'Login Berhasil!'
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async loginAdmin(req, res) {
        try {
            const user = await userService.loginAdmin(req.body.email, req.body.password);

            // Membuat JWT token setelah pengguna berhasil login
            const accessToken = createTokens(user);

            const objekUser = {
                full_name: user.full_name,
                user_id: user.user_id,
                email: user.email,
                phone_number: user.phone_number,
                profile_image: user.profile_image,
                role: user.role,
                accessToken: accessToken,
      
              };
            
            res.status(201).json({
                status: 'success',
                data: objekUser,
                message: 'Login Berhasil!'
            });
        } catch (error) {
            res.status(400).json({
                status: 'error',
                message: error.message
            });
        }
    }

    async deleteUser(req, res) {
        try {
            const userId = req.params.id; // Mendapatkan ID pengguna dari parameter URL

            // Panggil metode deleteUser dari UserService
            const message = await userService.deleteUser(userId);

            res.status(200).json({
                status: "success",
                message: message
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message
            });
        }
    }
}

module.exports = UserController;
