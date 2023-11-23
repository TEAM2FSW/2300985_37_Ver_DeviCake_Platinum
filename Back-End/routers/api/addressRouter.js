const express = require("express");
const AddressController = require("../../controllers/addressController");
const addressRouter = express.Router();

const addressController = new AddressController();

addressRouter.get('/', addressController.getAddressAll);
addressRouter.post('/', addressController.createAddress);
// addressRouter.put('/:addressId/status', addressController.);
addressRouter.get('/:addressId', addressController.getAddressDetails);
addressRouter.get('/user/:userId', addressController.getUserAddress);
addressRouter.delete('/:adressId', addressController.deleteAddress);


module.exports = addressRouter;