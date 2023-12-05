const express = require("express");
const userRouter = express.Router();
const UserController = require('../../controllers/userController');
const userController = new UserController();
const checkToken = require("../../middlewares/checkToken");


/**
 * @swagger
 * /api/users/register:
 *  post:
 *      summary: Register user
 *      description: Register a new user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                          - full_name
 *                          - phone_number
 *                          - profile_image
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: Email pengguna
 *                              example: admin@ersanputra.com
 *                          password:
 *                              type: string
 *                              description: Password pengguna
 *                              example: password123
 *                          full_name:
 *                              type: string
 *                              description: Nama lengkap pengguna
 *                              example: Ersan Putra N
 *                          phone_number:
 *                              type: string
 *                              description: Nomor telepon pengguna
 *                              example: 6283866034541
 *                          profile_image:
 *                              type: string
 *                              description: URL gambar profil pengguna
 *                              example: https://app.ersanmedia.com/img_pengguna/51-1669204847.png
 *      responses:
 *          200:
 *              description: User registered successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      active:
 *                                          type: boolean
 *                                          example: Boolean
 *                                      user_id:
 *                                          type: number
 *                                          example: Number
 *                                      email:
 *                                          type: string
 *                                          example: String
 *                                      password:
 *                                          type: string
 *                                          example: String
 *                                      full_name:
 *                                          type: string
 *                                          example: String
 *                                      phone_number:
 *                                          type: string
 *                                          example: String
 *                                      role:
 *                                          type: string
 *                                          example: String
 *                                      profile_image:
 *                                          type: string
 *                                          example: String
 *                                      updatedAt:
 *                                          type: string
 *                                          example: String
 *                                      createdAt:
 *                                          type: string
 *                                          example: String
 *                              message:
 *                                  type: string
 *                                  example: "Akun berhasil di daftarkan !!"
 *          400:
 *              description: Bad request, such as email already in use
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: failed
 *                              message:
 *                                  type: string
 *                                  example: "Email sudah digunakan"
 */


userRouter.post('/register', userController.createUser);

/**
 * @swagger
 * /api/users/login:
 *  post:
 *      summary: Login user
 *      description: Log in an existing user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - email
 *                          - password
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: Email pengguna
 *                              example: admin@ersanputra.com
 *                          password:
 *                              type: string
 *                              description: Password pengguna
 *                              example: admin
 *      responses:
 *          200:
 *              description: Successful login
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      full_name:
 *                                          type: string
 *                                          example: String
 *                                      user_id:
 *                                          type: number
 *                                          example: Number
 *                                      email:
 *                                          type: string
 *                                          example: String
 *                                      phone_number:
 *                                          type: string
 *                                          example: String
 *                                      profile_image:
 *                                          type: string
 *                                          example: String
 *                                      role:
 *                                          type: string
 *                                          example: String
 *                                      accessToken:
 *                                          type: string
 *                                          example: String
 *                              message:
 *                                  type: string
 *                                  example: "Login Berhasil!"
 *          400:
 *              description: Bad request, such as wrong password
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: error
 *                              message:
 *                                  type: string
 *                                  example: "Password salah atau Pengguna tidak ditemukan."
 */

userRouter.post('/login', userController.login);

/**
 * @swagger
 * /api/users/{id}:
 *  delete:
 *      summary: Delete a user
 *      description: Delete a user by their ID
 *      tags: [Users]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the user to delete
 *          schema:
 *            type: integer
 *      security:
 *        - BearerAuth: []
 *      responses:
 *          200:
 *              description: User deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              message:
 *                                  type: object
 *                                  properties:
 *                                      message:
 *                                          type: string
 *                                          example: "Pengguna berhasil dihapus."
 *          400:
 *              description: User not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: failed
 *                              message:
 *                                  type: string
 *                                  example: "Pengguna tidak ditemukan"
 */

userRouter.delete('/:id', userController.deleteUser);


userRouter.get('/', userController.getUserAll);
userRouter.get('/count', userController.getCountUser);

module.exports = userRouter;