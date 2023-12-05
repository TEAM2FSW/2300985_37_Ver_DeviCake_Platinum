const express = require("express");
const cartItemRouter = express.Router();
const CartItemController = require('../../controllers/cartItemController');
const cartItemController = new CartItemController();
const checkToken = require("../../middlewares/checkToken");

// Route to add a new cart item
cartItemRouter.post('/',checkToken, cartItemController.addCartItem);

// Route to get a cart item by ID
cartItemRouter.get('/:id',checkToken, cartItemController.getCartItem);

// Route to update a cart item
cartItemRouter.put('/:id',checkToken, cartItemController.updateCartItem);

// Route to delete a cart item
cartItemRouter.delete('/:id',checkToken, cartItemController.deleteCartItem);

// Route to list all cart items for a specific cart
cartItemRouter.get('/list/:userId',checkToken, cartItemController.listCartItems);
cartItemRouter.put('/:id/quantity',checkToken, cartItemController.updateCartItemQuantity);

module.exports = cartItemRouter;
