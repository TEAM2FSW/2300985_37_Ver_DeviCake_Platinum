const express = require("express");
const cartRouter = express.Router();
const CartController = require('../../controllers/cartController');
const cartController = new CartController();


cartRouter.post('/', cartController.createCart);
cartRouter.get('/:cartId', cartController.getCartDetails);


module.exports = cartRouter;