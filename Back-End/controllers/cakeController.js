const CakeService = require('../services/cakeService');
const cakeService = new CakeService();

class CakeController {
    async addCake(req, res) {
        try {
            const cakeData = req.body;
            const cake = await cakeService.addCake(cakeData);
            res.status(200).json({
                status: "success",
                data: cake
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async getAllCakes(req, res) {
        try {
            const cakes = await cakeService.getAllCakes();
            res.status(200).json({
                status: "success",
                data: cakes
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }

    async deleteCakeById(req, res) {
        try {
            const { cake_id } = req.params; // Assuming cake_id is passed as a URL parameter
            const result = await cakeService.deleteCakeById(cake_id);
            res.status(200).json({
                status: "success",
                data: result
            });
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message,
            });
        }
    }
}

module.exports = CakeController;
