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
  async getAddressById(address_id) {
    try {
      const address = await Address.findByPk(address_id);
      if (!address) {
        throw new Error("Address tidak ditemukan");
      }
      return address;
    } catch (error) {
      console.error("Error saat mengambil detail address:", error);
      throw error;
    }
  }



  // delete address
  async deleteAddress(address_id) {
    try {
      const address = await Address.findByPk(address_id);
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

  async updateAddress(address_id, recipient_name, address, phone_number, active) {
    try {
        const addressDetail = await Address.findByPk(address_id);
        if (!addressDetail) {
            throw new Error('Address  tidak ditemukan');
        }


        addressDetail.recipient_name = recipient_name;
        addressDetail.address = address;
        addressDetail.phone_number = phone_number;
        addressDetail.active = active;
        

        await addressDetail.save();
        return addressDetail;
    } catch (error) {
        console.error('Error saat memperbarui Address:', error);
        throw error;
    }
}
}


module.exports = AddressService;