const { OrderDetail, Cake, Order } = require("../models");

class OrderDetailService {

    async getOrderDetailById(orderDetailId) {
        try {
            const orderDetail = await OrderDetail.findByPk(orderDetailId);
            if (!orderDetail) {
                throw new Error('Order detail tidak ditemukan');
            }
            return orderDetail;
        } catch (error) {
            console.error('Error saat mengambil detail pesanan:', error);
            throw error;
        }
    }

    async getAllOrderDetailsByOrderId(orderId) {
        try {
            const orderDetails = await OrderDetail.findAll({
                where: { order_id: orderId }
            });
            return orderDetails;
        } catch (error) {
            console.error('Error saat mengambil semua detail pesanan:', error);
            throw error;
        }
    }

    async addOrderDetail({ order_id, cake_id, quantity }) {
        try {
            const cake = await Cake.findByPk(cake_id);
            if (!cake) {
                throw new Error('Cake tidak ditemukan');
            }

            const order = await Order.findByPk(order_id);
            if (!order) {
                throw new Error('Order tidak ditemukan');
            }

            const sub_total = cake.price * quantity;
            //const sub_total = 0 * quantity

            const orderDetail = await OrderDetail.create({
                order_id,
                cake_id,
                quantity,
                sub_total
            });

            return orderDetail;
        } catch (error) {
            console.error('Error saat menambahkan detail pesanan:', error);
            throw error;
        }
    }

    async updateOrderDetail(orderDetailId, { cake_id, quantity }) {
        try {
            const orderDetail = await OrderDetail.findByPk(orderDetailId);
            if (!orderDetail) {
                throw new Error('Order detail tidak ditemukan');
            }

            const cake = await Cake.findByPk(cake_id);
            if (!cake) {
                throw new Error('Cake tidak ditemukan');
            }

            orderDetail.cake_id = cake_id;
            orderDetail.quantity = quantity;
            //orderDetail.sub_total = 0 * quantity;
            orderDetail.sub_total = cake.price * quantity;

            await orderDetail.save();
            return orderDetail;
        } catch (error) {
            console.error('Error saat memperbarui detail pesanan:', error);
            throw error;
        }
    }

    async deleteOrderDetail(orderDetailId) {
        try {
            const orderDetail = await OrderDetail.findByPk(orderDetailId);
            if (!orderDetail) {
                throw new Error('Order detail tidak ditemukan');
            }

            await orderDetail.destroy();
            return { message: 'Order detail deleted successfully' };
        } catch (error) {
            console.error('Error saat menghapus detail pesanan:', error);
            throw error;
        }
    }


}

module.exports = OrderDetailService;
