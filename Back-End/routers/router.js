const express = require("express");
const router = express.Router();
const api = require("./api");
const midtransClient = require('midtrans-client');
const PaymentService = require('../services/paymentService');
const paymentService = new PaymentService();
   

router.use("/api", api);


router.post("/process-transaction", (req, res) => {
    try {
        const snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.serverKey,
            clientKey: process.env.clientKey
        });
        

        const parameter = {
            transaction_details: {
                order_id: req.body.order_id,
                gross_amount: req.body.total
            },
            customer_details: {
                first_name: req.body.name
            },
            finishRedirectUrl: null
        };

        snap.createTransaction(parameter)
            .then((transaction) => {
                const token = transaction.token;
                res.status(200).json({message: "Berhasil", token});
            })
            .catch((error) => {
                res.status(500).json({message: "Transaksi gagal", error: error.message});
            });
    } catch (error) {
        res.status(500).json({message: "Server error", error: error.message});
    }
});

router.get("/transaction/:id/status", (req, res) => {
    const transactionId = req.params.id;
    
    const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: process.env.serverKey,
        clientKey: process.env.clientKey
    });

    snap.transaction.status(transactionId)
        .then((transactionStatus) => {
            res.status(200).json({message: "Status retrieved successfully", status: transactionStatus});
        })
        .catch((error) => {
            res.status(500).json({message: "Failed to retrieve transaction status", error: error.message});
        });
});

router.post('/midtrans-notification', async (req, res) => {
    try {
        const { order_id, transaction_status } = req.body;

        // Contoh: Mengubah status menjadi 'di proses' jika pembayaran berhasil
        if (transaction_status === 'capture' || (transaction_status === 'settlement')) {
            const invoice = order_id;
            const status = "Completed";
            const updatedPayment = await paymentService.updatePaymentStatusByInvoice(invoice, status);

   
        }

        // Logika tambahan sesuai kebutuhan...

        res.status(200).json({ message: 'Notifikasi diterima' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;


