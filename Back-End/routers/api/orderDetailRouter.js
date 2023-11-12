const express = require("express");
const orderDetailRouter = express.Router();
const OrderDetailController  = require('../../controllers/orderDetailController');
const orderDetailController  = new OrderDetailController();


orderDetailRouter.post('/', orderDetailController.addOrderDetail);
orderDetailRouter.put('/:orderDetailId', orderDetailController.updateOrderDetail);
orderDetailRouter.get('/:orderDetailId', orderDetailController.getOrderDetail);
orderDetailRouter.get('/order/:orderId', orderDetailController.getAllOrderDetails);
orderDetailRouter.delete('/:orderDetailId', orderDetailController.deleteOrderDetail);


module.exports = orderDetailRouter;