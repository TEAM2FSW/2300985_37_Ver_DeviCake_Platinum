const express = require("express");
const paymentRouter = express.Router();
const PaymentController  = require('../../../../../binar/Ersan-Putra/devy-cake/controllers/paymentController');
const paymentController = new PaymentController ();
const checkToken = require("../../../../../binar/Ersan-Putra/devy-cake/middlewares/checkToken");


paymentRouter.post('/',checkToken, paymentController.createPayment);
paymentRouter.put('/:paymentId/status',checkToken, paymentController.updatePaymentStatus);
paymentRouter.put('/status',checkToken, paymentController.updatePaymentStatusByInvoice);
paymentRouter.get('/:paymentId',checkToken, paymentController.getPaymentDetails);
paymentRouter.get('/order/:orderId',checkToken, paymentController.getPaymentsForOrder);
paymentRouter.delete('/:paymentId',checkToken, paymentController.deletePayment);


module.exports = paymentRouter;