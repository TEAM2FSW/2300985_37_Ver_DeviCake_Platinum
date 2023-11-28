const express = require("express");
const orderRouter = express.Router();
const OrderController = require('../../controllers/orderController');
const orderController = new OrderController();


orderRouter.get('/', orderController.getOrderAll);
orderRouter.post('/', orderController.createOrder);
orderRouter.put('/:orderId/status', orderController.updateOrderStatus);
orderRouter.put('/status', orderController.updateOrderStatusByInvoice);
orderRouter.get('/:orderId', orderController.getOrderDetails);
orderRouter.get('/user/:userId', orderController.getUserOrders);
orderRouter.delete('/:orderId', orderController.deleteOrder);
orderRouter.post('/all', orderController.addOrderAll);



module.exports = orderRouter;