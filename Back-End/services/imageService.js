// imageService.js

const { bucket } = require('../models/model/imageModel');

const uploadToFirebase = (file, folder = '') => {
    return new Promise((resolve, reject) => {
        // Ganti nama file dengan menambahkan timestamp
        const timestamp = Date.now();
        const newFileName = `${folder}${timestamp}-${file.originalname}`;
        
        const blob = bucket.file(newFileName); // Gunakan nama file baru di sini
        const blobStream = blob.createWriteStream({ resumable: false });

        blobStream.on('finish', () => {
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURI(blob.name)}?alt=media`;
            resolve(publicUrl);
        });

        blobStream.on('error', (error) => {
            reject(error);
        });

        blobStream.end(file.buffer);
    });
};

module.exports = {
    uploadToFirebase
};
