const cloudinary = require('cloudinary').v2;

// Cloudinary configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Function to upload file to Cloudinary
const uploadCloudinary = async (file) => {
    try {
        const result = await cloudinary.uploader.upload(`data:${file.mimetype};base64,${file.buffer.toString('base64')}`, {
            use_filename: true,
            unique_filename: false
        });

        return result;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return null;
    }
}

module.exports = uploadCloudinary;