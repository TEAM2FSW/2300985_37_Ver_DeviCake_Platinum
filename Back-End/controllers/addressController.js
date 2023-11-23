const AddressService = require("../services/addressService");

const addressService = new AddressService();

class AddressController{
    async getAddressAll(req, res) {
        try {
            const address = await addressService.getAddressAll();
            res.status(200).json({
                status: "success",
                data:address
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async getAddressDetails(req, res) {
        try {
            const { addressId } = req.params;
            const address = await addressService.getAddressById(addressId);
            res.status(200).json({
                status: "success",
                data: address
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async getUserAddress(req, res) {
        try {
            const { userId } = req.params;
            const address = await addressService.getAllAddressByUserId(userId);
            res.status(200).json({
                status: "success",
                data: address
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

     // Controller untuk membuat address
     async  createAddress(req, res) {
        try {
            const {user_id, recipient_name, address, phone_number } = req.body;
            // Validasi input disini jika diperlukan
            const Addaddress = await addressService.addAddress({ user_id, recipient_name, address, phone_number});
            res.status(200).json({
                status: "success",
                data: Addaddress
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async deleteAddress(req, res) {
        try {
            const { addressId } = req.params;
            const hapus = await addressService.deleteAddress(addressId);
            res.status(200).json({
                status: "success",
                data: hapus
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }
}


module.exports = AddressController;