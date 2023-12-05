const express = require("express");
const orderRouter = express.Router();
const OrderController = require('../../controllers/orderController');
const orderController = new OrderController();
const checkToken = require("../../middlewares/checkToken");

/**
 * @swagger
 * /api/orders:
 *   get:
 *      summary: Get all orders
 *      description: Retrieve a list of all orders
 *      tags: [Orders]
 *      responses:
 *          200:
 *              description: List of all orders
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
 *                                          order_id:
 *                                              type: integer
 *                                              example: 13
 *                                          user_id:
 *                                              type: integer
 *                                              example: 3
 *                                          total_price:
 *                                              type: integer
 *                                              example: 47000
 *                                          order_date:
 *                                              type: string
 *                                              format: date-time
 *                                              example: "2023-11-25T12:40:00.000Z"
 *                                          address_id:
 *                                              type: integer
 *                                              example: 3
 *                                          status:
 *                                              type: string
 *                                              example: Pending
 *                                          active:
 *                                              type: boolean
 *                                              example: true
 *                                          createdAt:
 *                                              type: string
 *                                              format: date-time
 *                                              example: "2023-11-23T09:41:33.540Z"
 *                                          updatedAt:
 *                                              type: string
 *                                              format: date-time
 *                                              example: "2023-11-23T09:41:33.540Z"
 *                                          OrderDetails:
 *                                              type: array
 *                                              items:
 *                                          Payments:
 *                                              type: array
 *                                              items:
 *                                          Address:
 *                                              type: array
 *                                              items:
 *                                          User:
 *                                              type: array
 *                                              items:
 *          500:
 *              description: Internal server error
 */

orderRouter.get('/', orderController.getOrderAll);


/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *      summary: Get order by ID
 *      description: Retrieve details of an order by its ID
 *      tags: [Orders]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the order to retrieve
 *          schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Order details for the specified ID
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
 *                                      order_id:
 *                                          type: integer
 *                                          example: 18
 *                                      user_id:
 *                                          type: integer
 *                                          example: 3
 *                                      total_price:
 *                                          type: integer
 *                                          example: 20000
 *                                      order_date:
 *                                          type: string
 *                                          format: date-time
 *                                          example: "2023-11-28T17:43:00.000Z"
 *                                      address_id:
 *                                          type: integer
 *                                          example: 3
 *                                      status:
 *                                          type: string
 *                                          example: Pending
 *                                      active:
 *                                          type: boolean
 *                                          example: true
 *                                      createdAt:
 *                                          type: string
 *                                          format: date-time
 *                                          example: "2023-11-23T14:39:17.270Z"
 *                                      updatedAt:
 *                                          type: string
 *                                          format: date-time
 *                                          example: "2023-11-23T14:39:17.270Z"
 *                                      OrderDetails:
 *                                          type: array
 *                                          items:
 *                                              
 *                                      Payments:
 *                                          type: array
 *                                          items:
 *                                             
 *                                      Address:
 *                                          type: array
 *                                          items:
 *          400:
 *              description: Bad request, such as order not found
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
 *                                  example: "Order tidak ditemukan"
 */

orderRouter.get('/:orderId',checkToken, orderController.getOrderDetails);

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *      summary: Get orders by user ID
 *      description: Retrieve a list of orders for a specific user by their user ID
 *      tags: [Orders]
 *      parameters:
 *        - in: path
 *          name: userId
 *          required: true
 *          description: User ID to retrieve orders for
 *          schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: List of orders for the specified user
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
 *                                          order_id:
 *                                              type: integer
 *                                              example: 13
 *                                          user_id:
 *                                              type: integer
 *                                              example: 3
 *                                          total_price:
 *                                              type: integer
 *                                              example: 47000
 *                                          order_date:
 *                                              type: string
 *                                              format: date-time
 *                                              example: "2023-11-25T12:40:00.000Z"
 *                                          address_id:
 *                                              type: integer
 *                                              example: 3
 *                                          status:
 *                                              type: string
 *                                              example: Pending
 *                                          active:
 *                                              type: boolean
 *                                              example: true
 *                                          createdAt:
 *                                              type: string
 *                                              format: date-time
 *                                              example: "2023-11-23T09:41:33.540Z"
 *                                          updatedAt:
 *                                              type: string
 *                                              format: date-time
 *                                              example: "2023-11-23T09:41:33.540Z"
 *                                          OrderDetails:
 *                                              type: array
 *                                              items:
 *                                          Payments:
 *                                              type: array
 *                                              items:
 */

orderRouter.get('/user/:userId',checkToken, orderController.getUserOrders);

/**
 * @swagger
 * /api/orders/all:
 *   post:
 *      summary: Create a new order
 *      description: Create a new order with the given details
 *      tags: [Orders]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user_id:
 *                              type: integer
 *                              description: User ID of the customer
 *                              example: 22
 *                          recipient_name:
 *                              type: string
 *                              description: Name of the recipient
 *                              example: ERSAN
 *                          phone_number:
 *                              type: string
 *                              description: Phone number of the recipient
 *                              example: 6283866034541
 *                          address_id:
 *                              type: integer
 *                              description: Address ID for the order delivery
 *                              example: 3
 *                          tanggal:
 *                              type: string
 *                              description: Date of the order
 *                              example: "2023-11-22"
 *                          waktu:
 *                              type: string
 *                              description: Time of the order
 *                              example: "15:42"
 *                          paymentMethod:
 *                              type: string
 *                              description: Payment method for the order
 *                              example: COD
 *      responses:
 *          200:
 *              description: New order created successfully
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
 *                                      order_id:
 *                                          type: integer
 *                                          example: 45
 *                                      user_id:
 *                                          type: integer
 *                                          example: 22
 *                                      total_price:
 *                                          type: integer
 *                                          example: 16000
 *                                      address_id:
 *                                          type: integer
 *                                          example: 3
 *                                      status:
 *                                          type: string
 *                                          example: Pending
 *                                      order_date:
 *                                          type: string
 *                                          format: date-time
 *                                          example: "2023-11-22T08:42:00.000Z"
 *                                      active:
 *                                          type: boolean
 *                                          example: true
 *                                      updatedAt:
 *                                          type: string
 *                                          format: date-time
 *                                          example: "2023-12-03T02:52:30.255Z"
 *                                      createdAt:
 *                                          type: string
 *                                          format: date-time
 *                                          example: "2023-12-03T02:52:30.255Z"
 *          400:
 *              description: Bad request, such as cart not found
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
 *                                  example: "Cart tidak ditemukan"
 */

orderRouter.post('/all',checkToken, orderController.addOrderAll);

orderRouter.post('/',checkToken, orderController.createOrder);
orderRouter.put('/:orderId/status',checkToken, orderController.updateOrderStatus);
orderRouter.put('/status',checkToken, orderController.updateOrderStatusByInvoice);
orderRouter.delete('/:orderId',checkToken, orderController.deleteOrder);

orderRouter.get('/count', orderController.getCountOrder);




module.exports = orderRouter;