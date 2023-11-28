const express = require("express");
const cartItemRouter = express.Router();
const CartItemController = require('../../controllers/cartItemController');
const cartItemController = new CartItemController();

// Route to add a new cart item
cartItemRouter.post('/', cartItemController.addCartItem);

// Route to get a cart item by ID
cartItemRouter.get('/:id', cartItemController.getCartItem);

// Route to update a cart item
cartItemRouter.put('/:id', cartItemController.updateCartItem);

// Route to delete a cart item
cartItemRouter.delete('/:id', cartItemController.deleteCartItem);

// Route to list all cart items for a specific cart
cartItemRouter.get('/list/:userId', cartItemController.listCartItems);
cartItemRouter.put('/:id/quantity', cartItemController.updateCartItemQuantity);

module.exports = cartItemRouter;
