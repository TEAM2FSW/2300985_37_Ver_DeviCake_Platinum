const express = require("express");
const paymentRouter = express.Router();
const PaymentController  = require('../../controllers/paymentController');
const paymentController = new PaymentController ();


paymentRouter.post('/', paymentController.createPayment);
paymentRouter.put('/:paymentId/status', paymentController.updatePaymentStatus);
paymentRouter.get('/:paymentId', paymentController.getPaymentDetails);
paymentRouter.get('/order/:orderId', paymentController.getPaymentsForOrder);
paymentRouter.delete('/:paymentId', paymentController.deletePayment);


module.exports = paymentRouter;