const express = require("express");
const cakeRouter = express.Router();
const CakeController   = require('../../controllers/cakeController');
const cakeController  = new CakeController();
const checkToken = require("../../middlewares/checkToken");

/**
 * @swagger
 * /api/cakes/:
 *   get:
 *      summary: Get all cakes
 *      description: Retrieve a list of all cakes
 *      tags: [Cakes]
 *      security:
 *        - BearerAuth: []
 *      responses:
 *          200:
 *              description: List of all cakes
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: success
 *                              data:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          cake_id:
 *                                              type: integer
 *                                              example: 19
 *                                          user_id:
 *                                              type: integer
 *                                              example: 3
 *                                          name:
 *                                              type: string
 *                                              example: Cupcakes
 *                                          description:
 *                                              type: string
 *                                              example: Delicious and colorful cupcakes
 *                                          price:
 *                                              type: integer
 *                                              example: 15000
 *                                          image:
 *                                              type: string
 *                                              example: "https://images.pexels.com/photos/913136/pexels-photo-913136.jpeg?auto=compress&cs=tinysrgb&w=1600"
 *                                          active:
 *                                              type: boolean
 *                                              example: true
 *                                          category:
 *                                              type: string
 *                                              example: cakes
 *                                          createdAt:
 *                                              type: string
 *                                              format: date-time
 *                                              example: "2023-11-19T00:07:49.364Z"
 *                                          updatedAt:
 *                                              type: string
 *                                              format: date-time
 *                                              example: "2023-11-19T00:07:49.364Z"
 */

cakeRouter.get('/', cakeController.getAllCakes);

/**
 * @swagger
 * /api/cakes:
 *   post:
 *      summary: Add a new cake
 *      description: Create a new cake item
 *      tags: [Cakes]
 *      security:
 *        - BearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user_id:
 *                              type: integer
 *                              description: User ID associated with the cake
 *                              example: 3
 *                          name:
 *                              type: string
 *                              description: Name of the cake
 *                              example: Parfait
 *                          description:
 *                              type: string
 *                              description: Description of the cake
 *                              example: "Layered parfait with fresh fruits and creamy yogurt, a delightful treat"
 *                          price:
 *                              type: integer
 *                              description: Price of the cake
 *                              example: 13000
 *                          image:
 *                              type: string
 *                              description: URL of the cake image
 *                              example: "https://images.pexels.com/photos/1229045/pexels-photo-1229045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
 *                          category:
 *                              type: string
 *                              description: Category of the cake
 *                              example: bakery
 *      responses:
 *          200:
 *              description: New cake added successfully
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
 *                                          example: true
 *                                      cake_id:
 *                                          type: integer
 *                                          example: 35
 *                                      user_id:
 *                                          type: integer
 *                                          example: 3
 *                                      name:
 *                                          type: string
 *                                          example: "Parfait"
 *                                      description:
 *                                          type: string
 *                                          example: "Layered parfait with fresh fruits and creamy yogurt, a delightful treat"
 *                                      price:
 *                                          type: integer
 *                                          example: 13000
 *                                      image:
 *                                          type: string
 *                                          example: "https://images.pexels.com/photos/1229045/pexels-photo-1229045.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
 *                                      category:
 *                                          type: string
 *                                          example: bakery
 *                                      updatedAt:
 *                                          type: string
 *                                          format: date-time
 *                                          example: "2023-12-03T02:25:10.763Z"
 *                                      createdAt:
 *                                          type: string
 *                                          format: date-time
 *                                          example: "2023-12-03T02:25:10.763Z"
 */

cakeRouter.post('/',checkToken, cakeController.addCake);

/**
 * @swagger
 * /api/cakes/{id}:
 *   delete:
 *      summary: Delete a cake
 *      description: Delete or update the status of a cake to inactive by its ID
 *      tags: [Cakes]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the cake to delete or update
 *          schema:
 *            type: integer
 *      security:
 *        - BearerAuth: []
 *      responses:
 *          200:
 *              description: Cake status updated to inactive successfully
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
 *                                      message:
 *                                          type: string
 *                                          example: "Status kue berhasil diperbarui menjadi tidak aktif"
 *          400:
 *              description: Bad request, such as cake not found or no cake updated with the given ID
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
 *                                  example: "Tidak ada kue yang diperbarui dengan cake_id tersebut"
 */

cakeRouter.delete('/:cake_id',checkToken, cakeController.deleteCakeById);


module.exports = cakeRouter;