const express = require("express");
const userRouter = express.Router();
const UserController = require('../../controllers/userController');
const userController = new UserController();


userRouter.get('/', userController.getUserAll);
userRouter.get('/count', userController.getCountUser);
userRouter.post('/register', userController.createUser);
userRouter.post('/login', userController.login);
userRouter.delete('/:id', userController.deleteUser);


module.exports = userRouter;