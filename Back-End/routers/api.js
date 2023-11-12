const express = require("express");
const orderRouter = require("./api/orderRouter");
const api = express.Router();




api.use("/orders", orderRouter)

module.exports = api;
