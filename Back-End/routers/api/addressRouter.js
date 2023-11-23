const express = require("express");
const AddressController = require("../../controllers/addressController");
const addressRouter = express.Router();

const addressController = new AddressController();

addressRouter.get('/', addressController.getAddressAll);
addressRouter.post('/', addressController.createAddress);
addressRouter.put('/:address_id', addressController.updateAddress);
addressRouter.get('/:address_id', addressController.getAddressDetails);
addressRouter.get('/user/:userId', addressController.getUserAddress);
addressRouter.delete('/:address_id', addressController.deleteAddress);


module.exports = addressRouter;