const multer = require("multer");
const path = require('path');

// Multer storage and file filter configuration
const storage = multer.memoryStorage({
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix + fileExtension);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed.'), false);
    }
};

const uploader = multer({ 
    storage: storage,
    fileFilter: fileFilter });

module.exports = uploader;