const { Order } = require("../models");

class OrderService {

    async getOrderAll() {
        try {
            return await Order.findAll({ where: { active: true } });
        } catch (error) {
            console.error('Gagal mengambil data order:', error);
            throw error;
        }
    }

}

module.exports = OrderService;
