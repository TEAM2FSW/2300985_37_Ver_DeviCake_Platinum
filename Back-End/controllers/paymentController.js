const PaymentService = require('../services/paymentService');
const paymentService = new PaymentService();

class PaymentController {

    async getPaymentDetails(req, res) {
        try {
            const { paymentId } = req.params;
            const payment = await paymentService.getPaymentById(paymentId);
            res.status(200).json({
                status: "success",
                data: payment
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async getPaymentsForOrder(req, res) {
        try {
            const { orderId } = req.params;
            const payments = await paymentService.getAllPaymentsByOrderId(orderId);
            res.status(200).json({
                status: "success",
                data: payments
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async createPayment(req, res) {
        try {
            const { order_id, amount, payment_method, invoice, invoice_due_date } = req.body;

            const payment = await paymentService.createPayment({ order_id, amount, payment_method });
            res.status(200).json({
                status: "success",
                data: payment
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async updatePaymentStatus(req, res) {
        try {
            const { paymentId } = req.params;
            const { status } = req.body;
            
            // Validasi input bisa ditambahkan di sini

            const updatedPayment = await paymentService.updatePaymentStatus(paymentId, status);
            res.status(200).json({
                status: "success",
                data: updatedPayment
            });
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async deletePayment(req, res) {
        try {
            const { paymentId } = req.params;
            const result = await paymentService.deletePayment(paymentId);
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

module.exports = PaymentController;
