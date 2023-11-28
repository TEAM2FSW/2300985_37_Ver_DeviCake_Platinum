const { Storage } = require('@google-cloud/storage');

// Lokasi lengkap dari file kunci JSON yang Anda unduh
const keyFilename = "./libs/serviceAccountKey.json"; 

const storage = new Storage({ keyFilename });
const bucket = storage.bucket('storageimagesprojek.appspot.com');

module.exports = { storage, bucket };
