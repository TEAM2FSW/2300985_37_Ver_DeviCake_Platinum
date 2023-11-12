const { Order, OrderDetail, Payment } = require("../models");

class OrderService {

    async getOrderAll() {
        try {
            return await Order.findAll({ where: { active: true } });
        } catch (error) {
            console.error('Gagal mengambil data order:', error);
            throw error;
        }
    }

    async getOrderById(orderId) {
        try {
            const order = await Order.findByPk(orderId, {
                include: [
                    {
                        model: OrderDetail
                    },
                    {
                        model: Payment
                    }
                ]
            });
            if (!order) {
                throw new Error('Order tidak ditemukan');
            }
            return order;
        } catch (error) {
            console.error('Error saat mengambil detail order:', error);
            throw error;
        }
    }

    async getAllOrdersByUserId(userId) {
        try {
            const orders = await Order.findAll({
                where: { user_id: userId, active: true }
            });
            return orders;
        } catch (error) {
            console.error('Error saat mengambil pesanan pengguna:', error);
            throw error;
        }
    }

    // Fungsi untuk membuat order baru
    async createOrder({ user_id, total_price, address_id, order_date}) {
        try {
            const newOrder = await Order.create({
                user_id,
                total_price,
                address_id,
                status: 'Pending',  // Mengatur status pesanan menjadi Pending
                order_date,
                active: true
            });

            return newOrder;
        } catch (error) {
            console.error('Gagal membuat order:', error);
            throw error;
        }
    }

    async updateOrderStatus(orderId, newStatus) {
        try {
            const order = await Order.findByPk(orderId);
            if (!order) {
                throw new Error('Order tidak ditemukan');
            }
            order.status = newStatus;
            await order.save();
            return order;
        } catch (error) {
            console.error('Gagal memperbarui status order:', error);
            throw error;
        }
    }

    async deleteOrder(orderId) {
        try {
            const order = await Order.findByPk(orderId);
            if (!order) {
                throw new Error('Order tidak ditemukan');
            }

            await order.destroy();
            return { message: 'Order deleted successfully' };
        } catch (error) {
            console.error('Error saat menghapus pesanan:', error);
            throw error;
        }
    }

}

module.exports = OrderService;
