const OrderService = require('../services/orderService');
const orderService = new OrderService();

class OrderController {

    async getOrderAll(req, res) {
        try {
            const orders = await orderService.getOrderAll();
            res.status(200).json({
                status: "success",
                data: orders
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: error.message,
                //stack: error.stack
            });
        }
    }


}

module.exports = OrderController;
