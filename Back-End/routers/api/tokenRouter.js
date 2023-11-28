const express = require("express");
const tokenRouter = express.Router();
const TokenController = require('../../controllers/tokenController');
const tokenController = new TokenController();

tokenRouter.post('/', tokenController.addToken);
tokenRouter.get('/:paymentId', tokenController.getTokenDetails);

module.exports = tokenRouter;