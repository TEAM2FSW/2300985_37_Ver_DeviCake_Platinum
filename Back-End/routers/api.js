const express = require("express");
const orderRouter = require("./api/orderRouter");
const orderDetailRouter = require("./api/orderDetailRouter");
const paymentRouter = require("./api/paymentRouter");
const api = express.Router();


api.use("/orders", orderRouter)
api.use("/order-details", orderDetailRouter)
api.use("/payments", paymentRouter)

module.exports = api;
