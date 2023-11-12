const express = require("express");
const orderRouter = express.Router();
const OrderController = require('../../controllers/orderController');
const orderController = new OrderController();


orderRouter.get('/', orderController.getOrderAll);

module.exports = orderRouter;