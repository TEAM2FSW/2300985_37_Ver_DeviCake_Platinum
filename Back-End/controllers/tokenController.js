const TokenService = require('../services/tokenService');
const tokenService = new TokenService();

class TokenController {

    async addToken(req, res) {
        try {
            const { paymentId, token } = req.body;
            // Validasi input bisa ditambahkan di sini

            const newToken = await tokenService.addToken(paymentId, token);
            res.status(200).json({
                status: "success",
                data: newToken
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async getTokenDetails(req, res) {
        try {
            const { paymentId } = req.params;
            const token = await tokenService.getTokenByPaymentId(paymentId);
            res.status(200).json({
                status: "success",
                data: token
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

}

module.exports = TokenController;
