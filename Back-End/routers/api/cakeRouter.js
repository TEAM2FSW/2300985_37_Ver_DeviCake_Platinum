const express = require("express");
const cakeRouter = express.Router();
const CakeController   = require('../../controllers/cakeController');
const cakeController  = new CakeController();


cakeRouter.get('/', cakeController.getAllCakes);
cakeRouter.post('/', cakeController.addCake);
cakeRouter.delete('/:cake_id', cakeController.deleteCakeById);


module.exports = cakeRouter;