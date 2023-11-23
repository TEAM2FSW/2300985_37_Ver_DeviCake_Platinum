const { Cake } = require("../models");

class CakeService {
    async addCake(cakeData) {
        try {
            // Validasi input (Anda mungkin ingin melakukan validasi yang lebih rumit di sini)
            if (!cakeData.name || !cakeData.price) {
                throw new Error('Nama dan harga kue diperlukan');
            }

            // Menambahkan kue baru
            const cake = await Cake.create(cakeData);

            return cake;
        } catch (error) {
            console.error('Error saat menambahkan kue:', error);
            throw error;
        }
    }

    async getAllCakes() {
        try {
            const cakes = await Cake.findAll();
            return cakes;
        } catch (error) {
            console.error('Error saat mengambil semua kue:', error);
            throw error;
        }
    }

    async deleteCakeById(cake_id) {
        try {
            // Check if cake_id is provided
            if (!cake_id) {
                throw new Error('cake_id diperlukan untuk menghapus');
            }

            // Deleting the cake with the given cake_id
            const result = await Cake.destroy({
                where: { cake_id }  // Use cake_id instead of id
            });

            // You can also check if a cake was actually deleted and throw an error or return a different response if not
            if (result === 0) {
                throw new Error('Tidak ada kue yang dihapus dengan cake_id tersebut');
            }

            return { message: 'Kue berhasil dihapus' };
        } catch (error) {
            console.error('Error saat menghapus kue:', error);
            throw error;
        }
    }
}

module.exports = CakeService;
