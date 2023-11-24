const express = require("express");
const userRouter = express.Router();
const UserController = require('../../controllers/userController');
const userController = new UserController();



userRouter.post('/register', userController.createUser);
userRouter.post('/login', userController.login);
userRouter.delete('/:id', userController.deleteUser);
userRouter.put('/:user_id', userController.updateUser);


module.exports = userRouter;