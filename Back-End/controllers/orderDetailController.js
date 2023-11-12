const OrderDetailService = require('../services/orderDetailService');
const orderDetailService = new OrderDetailService();

class OrderDetailController {

    async getOrderDetail(req, res) {
        try {
            const { orderDetailId } = req.params;
            const orderDetail = await orderDetailService.getOrderDetailById(orderDetailId);
            res.status(200).json({
                status: "success",
                data: orderDetail
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async getAllOrderDetails(req, res) {
        try {
            const { orderId } = req.params;
            const orderDetails = await orderDetailService.getAllOrderDetailsByOrderId(orderId);
            res.status(200).json({
                status: "success",
                data: orderDetails
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async addOrderDetail(req, res) {
        try {
            const { order_id, cake_id, quantity } = req.body;

            const orderDetail = await orderDetailService.addOrderDetail({ order_id, cake_id, quantity });
            res.status(200).json({
                status: "success",
                data: orderDetail
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async updateOrderDetail(req, res) {
        try {
            const { orderDetailId } = req.params;
            const { cake_id, quantity } = req.body;
            
            // Validasi input bisa ditambahkan di sini

            const updatedOrderDetail = await orderDetailService.updateOrderDetail(orderDetailId, { cake_id, quantity });
            res.status(200).json({
                status: "success",
                data: updatedOrderDetail
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async deleteOrderDetail(req, res) {
        try {
            const { orderDetailId } = req.params;
            const result = await orderDetailService.deleteOrderDetail(orderDetailId);
            res.status(200).json({
                status: "success",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: error.message,
            });
        }
    }

}

module.exports = OrderDetailController;
