const express = require("express");
const AddressController = require("../../controllers/addressController");
const addressRouter = express.Router();
const checkToken = require("../../middlewares/checkToken");

const addressController = new AddressController();
/**
 * @swagger
 * /api/addresses:
 *   get:
 *      summary: Get all addresses
 *      description: Retrieve a list of all addresses
 *      tags: [Addresses]
 *      responses:
 *          200:
 *              description: List of all addresses
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
 *                                          address_id:
 *                                              type: string
 *                                              example: String
 *                                          user_id:
 *                                              type: string
 *                                              example: String
 *                                          recipient_name:
 *                                              type: string
 *                                              example: String
 *                                          address:
 *                                              type: string
 *                                              example: String
 *                                          phone_number:
 *                                              type: string
 *                                              example: String
 *                                          active:
 *                                              type: string
 *                                              example: String
 *                                          createdAt:
 *                                              type: string
 *                                              example: String
 *                                          updatedAt:
 *                                              type: string
 *                                              example: String
 */
addressRouter.get('/',checkToken, addressController.getAddressAll);

/**
 * @swagger
 * /api/addresses/{id}:
 *   get:
 *      summary: Get address by user ID
 *      description: Retrieve address details for a specific user ID
 *      tags: [Addresses]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: User ID to retrieve the address for
 *          schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Address details for the specified user ID
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
 *                                          address_id:
 *                                              type: string
 *                                              example: String
 *                                          user_id:
 *                                              type: string
 *                                              example: String
 *                                          recipient_name:
 *                                              type: string
 *                                              example: String
 *                                          address:
 *                                              type: string
 *                                              example: String
 *                                          phone_number:
 *                                              type: string
 *                                              example: String
 *                                          active:
 *                                              type: string
 *                                              example: String
 *                                          createdAt:
 *                                              type: string
 *                                              example: String
 *                                          updatedAt:
 *                                              type: string
 *                                              example: String
 */

/**
 * @swagger
 * /api/addresses/:
 *   post:
 *      summary: Add a new address
 *      description: Create a new address for a user
 *      tags: [Addresses]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          user_id:
 *                              type: integer
 *                              description: User ID associated with the address
 *                              example: 3
 *                          recipient_name:
 *                              type: string
 *                              description: Name of the recipient
 *                              example: Ersan Putra N
 *                          address:
 *                              type: string
 *                              description: Address details
 *                              example: Jln Klaten No 123 Klaten
 *                          phone_number:
 *                              type: string
 *                              description: Phone number of the recipient
 *                              example: 6283866034541
 *      responses:
 *          200:
 *              description: New address added successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: String
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      address_id:
 *                                          type: string
 *                                          example: String
 *                                      user_id:
 *                                          type: string
 *                                          example: String
 *                                      recipient_name:
 *                                          type: string
 *                                          example: String
 *                                      address:
 *                                          type: string
 *                                          example: String
 *                                      phone_number:
 *                                          type: string
 *                                          example: String
 *                                      active:
 *                                          type: string
 *                                          example: String
 *                                      createdAt:
 *                                          type: string
 *                                          example: String
 *                                      updatedAt:
 *                                          type: string
 *                                          example: String
 */

addressRouter.post('/',checkToken, addressController.createAddress);

/**
 * @swagger
 * /api/addresses/{id}:
 *   put:
 *      summary: Update an existing address
 *      description: Update address details for a specific address ID
 *      tags: [Addresses]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: Address ID to update
 *          schema:
 *            type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          recipient_name:
 *                              type: string
 *                              description: Updated name of the recipient
 *                              example: Ersan Putra
 *                          address:
 *                              type: string
 *                              description: Updated address details
 *                              example: Jln Mana Mana
 *                          phone_number:
 *                              type: string
 *                              description: Updated phone number of the recipient
 *                              example: 6283866034541
 *      responses:
 *          200:
 *              description: Address updated successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  example: String
 *                              data:
 *                                  type: object
 *                                  properties:
 *                                      address_id:
 *                                          type: string
 *                                          example: String
 *                                      user_id:
 *                                          type: string
 *                                          example: String
 *                                      recipient_name:
 *                                          type: string
 *                                          example: String
 *                                      address:
 *                                          type: string
 *                                          example: String
 *                                      phone_number:
 *                                          type: string
 *                                          example: String
 *                                      createdAt:
 *                                          type: string
 *                                          example: String
 *                                      updatedAt:
 *                                          type: string
 *                                          example: String
 *          400:
 *              description: Bad request, such as address not found
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
 *                                  example: "Address tidak ditemukan"
 */

addressRouter.put('/:address_id',checkToken, addressController.updateAddress);


/**
 * @swagger
 * /api/addresses/{id}:
 *   delete:
 *      summary: Delete an address
 *      description: Delete an address by its ID
 *      tags: [Addresses]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID of the address to delete
 *          schema:
 *            type: integer
 *      responses:
 *          200:
 *              description: Address deleted successfully
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
 *                                          example: "Address deleted successfully"
 *          400:
 *              description: Bad request, such as address not found
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
 *                                  example: "Address tidak ditemukan"
 */

addressRouter.delete('/:address_id',checkToken, addressController.deleteAddress);


addressRouter.get('/user/:userId',checkToken, addressController.getUserAddress);

module.exports = addressRouter;