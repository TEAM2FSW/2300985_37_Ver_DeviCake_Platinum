const multer = require("multer");
const path = require('path');


function formatDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}-${hours}-${minutes}-${seconds}`;
}

// Multer storage and file filter configuration
const storage = multer.memoryStorage({
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, fileExtension);
        const dateTimeStamp = formatDate();
        cb(null, `${baseName}-${dateTimeStamp}${fileExtension}`);
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