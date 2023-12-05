const express = require('express');
const uploader = require('../../middlewares/uploader');
const uploadCloudinary = require('../../libs/upload-cloudinary')
const uploadRouter = express.Router()
const multer = require('multer');

uploadRouter.post('/upload', uploader.single('file'), async (req, res, next) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
    }

    try {
        const result = await uploadCloudinary(req.file);
        if (result && result.url) {
            res.status(200).json({
                message: "Upload successful!",
                imageUrl: result.url
            });
        } else {
            res.status(400).json({ message: "Failed to retrieve URL from Cloudinary." });
        }
    } catch (error) {
        res.status(400).json({ message: "Upload failed due to server error." });
    }
}, (error, req, res, next) => {
    // This function will be called if an error occurs in the 'uploader' middleware
    if (error) {
        return res.status(400).json({ message: error.message });
    }
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const imageController = require('../../controllers/imageController');

uploadRouter.post('/upload/profile', uploader.single('file'), imageController.uploadImageApi);

module.exports = uploadRouter;