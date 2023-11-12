const { Payment } = require("../models");

class PaymentService {

    async getPaymentById(paymentId) {
        try {
            const payment = await Payment.findByPk(paymentId);
            if (!payment) {
                throw new Error('Payment tidak ditemukan');
            }
            return payment;
        } catch (error) {
            console.error('Error saat mengambil detail pembayaran:', error);
            throw error;
        }
    }

    async getAllPaymentsByOrderId(orderId) {
        try {
            const payments = await Payment.findAll({
                where: { order_id: orderId }
            });
            return payments;
        } catch (error) {
            console.error('Error saat mengambil semua pembayaran untuk pesanan:', error);
            throw error;
        }
    }

    async createPayment({ order_id, amount, payment_method }) {
        try {
            function generateInvoiceNumber() {
                const now = new Date();
                
                // Mendapatkan komponen tanggal
                const year = now.getFullYear();
                const month = String(now.getMonth() + 1).padStart(2, '0'); // Januari adalah 0!
                const day = String(now.getDate()).padStart(2, '0');
                
                // Mendapatkan komponen waktu
                const hours = String(now.getHours()).padStart(2, '0');
                const minutes = String(now.getMinutes()).padStart(2, '0');
                const seconds = String(now.getSeconds()).padStart(2, '0');
            
                // Menghasilkan kode unik, contoh menggunakan timestamp
                const uniqueCode = now.getTime().toString().slice(-5); // Mengambil 5 digit terakhir dari timestamp
            
                // Menggabungkan semua bagian untuk membentuk invoice number
                return `INV/${year}${month}${day}/${hours}${minutes}${seconds}/${uniqueCode}`;
            }

            function calculateInvoiceDueDate(orderDate) {
                const dueDate = new Date(orderDate);
                dueDate.setDate(dueDate.getDate() + 2); // Menambahkan 2 hari
                return dueDate;
            }
            const orderDate = new Date();

            const orderid = await Payment.findByPk(order_id);
            if (orderid) {
                throw new Error('Order id payment sudah ada');
            }


            const newPayment = await Payment.create({
                order_id,
                invoice: generateInvoiceNumber(), 
                amount,
                payment_method,
                status: 'Pending',  // Status default
                payment_date: new Date(),  // Tanggal pembayaran saat ini
                invoice_due_date: calculateInvoiceDueDate(orderDate),  // Anggap invoice_due_date sudah dihitung sebelumnya
                active: true
            });

            return newPayment;
        } catch (error) {
            console.error('Error saat membuat pembayaran:', error);
            throw error;
        }
    }

    async updatePaymentStatus(paymentId, newStatus) {
        try {
            const payment = await Payment.findByPk(paymentId);
            if (!payment) {
                throw new Error('Payment tidak ditemukan');
            }

            payment.status = newStatus;
            await payment.save();
            return payment;
        } catch (error) {
            console.error('Error saat memperbarui status pembayaran:', error);
            throw error;
        }
    }

    async deletePayment(paymentId) {
        try {
            const payment = await Payment.findByPk(paymentId);
            if (!payment) {
                throw new Error('Payment tidak ditemukan');
            }

            await payment.destroy();
            return { message: 'Payment deleted successfully' };
        } catch (error) {
            console.error('Error saat menghapus pembayaran:', error);
            throw error;
        }
    }

}

module.exports = PaymentService;
