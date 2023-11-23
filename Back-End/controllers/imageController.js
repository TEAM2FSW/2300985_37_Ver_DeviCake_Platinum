// imageController.js

const imageService = require('../services/imageService');

const uploadImage = async (req, res) => {
    try {
        const imageUrl = await imageService.uploadToFirebase(req.file);
        res.render('displayImage', { imageUrl: imageUrl });
    } catch (error) {
        console.error('Error uploading the image:', error);
        res.status(400).send('Internal Server Error.');
    }
};

const uploadImageApi = async (req, res) => {
    try {
        const imageUrl = await imageService.uploadToFirebase(req.file, 'images/profile/');
        res.status(200).json({
            message: 'File uploaded successfully.',
            imageUrl: imageUrl
        });
    } catch (error) {
        console.error('Error uploading the image:', error);
        res.status(400).send('Internal Server Error.');
    }
};

module.exports = {
    uploadImage, uploadImageApi
};
