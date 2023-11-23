const { Address } = require("../models");

class AddressService {
  //create address
  async addAddress({ user_id, recipient_name, address, phone_number, active }) {
    try {
      const newAddress = await Address.create({
        user_id,
        recipient_name,
        address,
        phone_number,
        active: true,
      });

      return newAddress;
    } catch (error) {
      console.error("gagalm membuat address: ", error);
      throw error;
    }
  }

  //data all address
  async getAddressAll() {
    try {
      return await Address.findAll({ where: { active: true } });
    } catch (error) {
      console.error("Gagal mengambil data Address:", error);
      throw error;
    }
  }

  //data by id
  async getAddressById(addressId) {
    try {
      const address = await Address.findByPk(addressId);
      if (!address) {
        throw new Error("Address tidak ditemukan");
      }
      return address;
    } catch (error) {
      console.error("Error saat mengambil detail address:", error);
      throw error;
    }
  }

  //data address by user ID
  async getAllAddressByUserId(userId) {
    try {
      const address = await Address.findAll({
        where: { user_id: userId, active: true },
      });
      return address;
    } catch (error) {
      console.error("Error tidak dapat mengambil alamat pengguna:", error);
      throw error;
    }
  }

  // delete address
  async deleteAddress(addressId) {
    try {
      const address = await Address.findByPk(addressId);
      if (!address) {
        throw new Error("Address tidak ditemukan");
      }

      await address.destroy();
      return { message: "Address deleted successfully" };
    } catch (error) {
      console.error("Error saat menghapus Address:", error);
      throw error;
    }
  }
}


module.exports = AddressService;