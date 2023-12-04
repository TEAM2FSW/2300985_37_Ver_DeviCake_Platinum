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
            const cakes = await Cake.findAll({ where: { active: true } });
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
                throw new Error('cake_id diperlukan untuk memperbarui status');
            }
    
            // Updating the active status of the cake with the given cake_id to false
            const result = await Cake.update({ active: false }, {
                where: { cake_id }  // Use cake_id instead of id
            });
    
            // You can also check if a cake was actually updated and throw an error or return a different response if not
            if (result[0] === 0) {
                throw new Error('Tidak ada kue yang diperbarui dengan cake_id tersebut');
            }
    
            return { message: 'Status kue berhasil diperbarui menjadi tidak aktif' };
        } catch (error) {
            console.error('Error saat memperbarui status kue:', error);
            throw error;
        }
    }
}

module.exports = CakeService;
