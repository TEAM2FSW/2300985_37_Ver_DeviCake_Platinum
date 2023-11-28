const CartItemService = require('../services/cartItemService');
const cartItemService = new CartItemService();

class CartItemController {

    // Add a new cart item
    async addCartItem(req, res) {
        try {
            const { userId, cakeId, quantity, subTotal } = req.body;
            const newCartItem = await cartItemService.addCartItem(userId, cakeId, quantity, subTotal);
            res.status(201).json({
                status: "success",
                data: newCartItem
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    // Get a cart item by ID
    async getCartItem(req, res) {
        try {
            const cartItemId = req.params.id;
            const cartItem = await cartItemService.getCartItemById(cartItemId);
            res.status(200).json({
                status: "success",
                data: cartItem
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    // Update a cart item
    async updateCartItem(req, res) {
        try {
            const cartItemId = req.params.id;
            const updateData = req.body;
            const updatedCartItem = await cartItemService.updateCartItem(cartItemId, updateData);
            res.status(200).json({
                status: "success",
                data: updatedCartItem
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    // Delete a cart item
    async deleteCartItem(req, res) {
        try {
            const cartItemId = req.params.id;
            const deleted = await cartItemService.deleteCartItem(cartItemId);
            res.status(200).json({
                status: deleted ? "success" : "failed",
                message: deleted ? "Cart item deleted successfully" : "Cart item not found"
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    // List all cart items for a specific cart
    async listCartItems(req, res) {
        try {
            const userId = req.params.userId;
            const cartItems = await cartItemService.listCartItems(userId);
            res.status(200).json({
                status: "success",
                data: cartItems
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async updateCartItemQuantity(req, res) {
        try {
            const cartItemId = req.params.id;
            const { quantity } = req.body;
            const updatedCartItem = await cartItemService.updateCartItemQuantity(cartItemId, quantity);
            res.status(200).json({
                status: "success",
                data: updatedCartItem
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    
}

module.exports = CartItemController;
