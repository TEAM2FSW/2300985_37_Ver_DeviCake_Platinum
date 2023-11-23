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
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async getOrderDetails(req, res) {
        try {
            const { orderId } = req.params;
            const order = await orderService.getOrderById(orderId);
            res.status(200).json({
                status: "success",
                data: order
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async getUserOrders(req, res) {
        try {
            const { userId } = req.params;
            const orders = await orderService.getAllOrdersByUserId(userId);
            res.status(200).json({
                status: "success",
                data: orders
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    // Controller untuk membuat order baru
    async createOrder(req, res) {
        try {
            const { user_id, total_price, address_id, order_date } = req.body;
            // Validasi input disini jika diperlukan
            const orders = await orderService.createOrder({ user_id, total_price, address_id , order_date});
            res.status(200).json({
                status: "success",
                data: orders
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async updateOrderStatus(req, res) {
        try {
            const { orderId } = req.params;
            const { status } = req.body;

            // Anda mungkin ingin menambahkan validasi tambahan di sini

            const updatedOrder = await orderService.updateOrderStatus(orderId, status);
            res.status(200).json({
                status: "success",
                data: updatedOrder
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async deleteOrder(req, res) {
        try {
            const { orderId } = req.params;
            const result = await orderService.deleteOrder(orderId);
            res.status(200).json({
                status: "success",
                data: result
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }


}

module.exports = OrderController;
