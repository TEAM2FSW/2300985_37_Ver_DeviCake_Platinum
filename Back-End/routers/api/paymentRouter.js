const express = require("express");
const paymentRouter = express.Router();
const PaymentController  = require('../../controllers/paymentController');
const paymentController = new PaymentController ();
const checkToken = require("../../middlewares/checkToken");


paymentRouter.post('/',checkToken, paymentController.createPayment);
paymentRouter.put('/:paymentId/status',checkToken, paymentController.updatePaymentStatus);
paymentRouter.put('/status',checkToken, paymentController.updatePaymentStatusByInvoice);
paymentRouter.get('/:paymentId',checkToken, paymentController.getPaymentDetails);
paymentRouter.get('/order/:orderId',checkToken, paymentController.getPaymentsForOrder);
paymentRouter.delete('/:paymentId',checkToken, paymentController.deletePayment);


module.exports = paymentRouter;