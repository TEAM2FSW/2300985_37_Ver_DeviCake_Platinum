const { Order, OrderDetail, Payment, Cake, Address } = require("../models");
const PaymentService = require('./paymentService');
const paymentService = new PaymentService();
const OrderDetailService = require('./orderDetailService');
const orderDetailService = new OrderDetailService();
const CartItemService = require('./cartItemService');
const cartItemService = new CartItemService();
const AddressService = require("./addressService");
const addressService = new AddressService();

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
                        model: OrderDetail,
                        include: [{ model: Cake }]
                    },
                    {
                        model: Payment
                    },
                    {
                        model: Address
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
                where: { user_id: userId, active: true },
                include: [
                    {
                        model: OrderDetail,
                        include: [{ model: Cake }]
                    },
                    {
                        model: Payment
                    }
                ]
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

    //buat order langsung dengan orderdetail dan payment
    async addOrderAll(data) {
        try {
            //cek dulu data id_address ada tidak
            let idAddress = "";

            if (data.address_id) {
                idAddress = data.address_id;
            } else {
                const dataAddress = {
                    user_id: data.user_id,
                    recipient_name: data.recipient_name,
                    address: data.address,
                    phone_number: data.phone_number
                };

                const Addaddress = await addressService.addAddress(dataAddress);

                idAddress = Addaddress.address_id;
            }
            
            //ambil data list keranjang
            const cartItems = await cartItemService.listCartItems(data.user_id);
            //fungsi hitung total
            function calculateTotal(cartItems) {
                return cartItems.reduce((total, item) => total + item.sub_total, 0);
            }
            //ambil data total keranjang
            const total = calculateTotal(cartItems);
            if (total <= 0) {
                throw new Error('Cart tidak ditemukan');
            }
            //ambil data order
            const dataOrder = {                
                user_id: data.user_id,
                total_price: total,
                address_id: idAddress,
                status: 'Pending',
                order_date: `${data.tanggal} ${data.waktu}:00`,
                active: true
            };
            //input data order ke tabel order
            const order = await Order.create(dataOrder);
            //looping data cart item dan input ke table order details
            for (const item of cartItems) {
                const dataCart = {
                    order_id: order.order_id,
                    cake_id: item.cake_id,
                    quantity: item.quantity
                };
                // input ke table order details
                const orderdetails = await orderDetailService.addOrderDetail(dataCart);
            }
            //ambil data payment
            const dataPayment = {
                order_id: order.order_id,
                amount: total,
                payment_method: data.paymentMethod
            };
            //input data order ke tabel payment
            const payment = await paymentService.createPayment(dataPayment);
            //delete cartitem by id usernya
            const deleted = await cartItemService.deleteCartItemsByUserId(data.user_id);

            

            return order;
            
        } catch (error) {
            console.error('Gagal menambahkan data order:', error);
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

    async updateOrderStatusByInvoice(invoice, newStatus) {
        try {
            // Temukan order yang terkait dengan invoice dari tabel Payment
            // Asumsikan ada relasi antara Payment dan Order dimana Payment memiliki field order_id
            const payment = await Payment.findOne({ 
                where: { invoice: invoice }
            });
            //console.log(invoice);
            if (!payment) {
                throw new Error('Order dengan invoice tersebut tidak ditemukan');
            }
            // Update status order
            const order = await Order.findByPk(payment.order_id);
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
