const CartService = require('../services/cartService');
const cartService = new CartService();

class CartController {

    async createCart(req, res) {
        try {
            const { user_id } = req.body;
            // Validasi input bisa ditambahkan di sini

            const cart = await cartService.createCart(user_id);
            res.status(200).json({
                status: "success",
                data: cart
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async getCartDetails(req, res) {
        try {
            const { cartId } = req.params;
            const cart = await cartService.getCartById(cartId);
            res.status(200).json({
                status: "success",
                data: cart
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }



}

module.exports = CartController;
