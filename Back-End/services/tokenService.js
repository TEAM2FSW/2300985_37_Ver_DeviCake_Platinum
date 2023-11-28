const { Token } = require("../models");

class TokenService {

    async addToken(paymentId, tokenValue) {
        try {
            // Mengecek apakah token untuk payment ID ini sudah ada
            const existingToken = await Token.findOne({ where: { payment_id: paymentId } });
            if (existingToken) {
                throw new Error('Token untuk payment ID ini sudah ada');
            }

            // Jika tidak, buat token baru
            const newToken = await Token.create({
                payment_id: paymentId,
                token: tokenValue
            });

            return newToken;
        } catch (error) {
            console.error('Error saat menambahkan token:', error);
            throw error;
        }
    }

    async getTokenByPaymentId(paymentId) {
        try {
            const token = await Token.findOne({ where: { payment_id: paymentId } });
            if (!token) {
                throw new Error('Token tidak ditemukan');
            }
            return token;
        } catch (error) {
            console.error('Error saat mengambil token:', error);
            throw error;
        }
    }

}

module.exports = TokenService;
