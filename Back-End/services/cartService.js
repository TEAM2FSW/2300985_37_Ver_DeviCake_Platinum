const { Cart } = require("../models");

class CartService {

    async createCart(userId) {
        try {
            // Mengecek apakah pengguna sudah memiliki keranjang
            const existingCart = await Cart.findOne({ where: { user_id: userId } });
            if (existingCart) {
                throw new Error('Pengguna sudah memiliki keranjang');
            }

            // Jika tidak, buat keranjang baru
            const newCart = await Cart.create({
                user_id: userId
            });

            return newCart;
        } catch (error) {
            console.error('Error saat membuat keranjang:', error);
            throw error;
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await Cart.findByPk(cartId);
            if (!cart) {
                throw new Error('Keranjang tidak ditemukan');
            }
            return cart;
        } catch (error) {
            console.error('Error saat mengambil detail keranjang:', error);
            throw error;
        }
    }

}

module.exports = CartService;
