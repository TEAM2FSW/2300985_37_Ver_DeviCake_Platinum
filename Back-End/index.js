const express = require('express');
const router = require('./routers/router');
const bodyParser = require('body-parser');
const cors = require('cors');

const multer = require('multer');
const imageController = require('./controllers/imageController');

const app = express();
const port = 5000;


// Enable All CORS Requests
app.use(cors());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/api/upload/profile', upload.single('image'), imageController.uploadImageApi);

// Konfigurasi middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}!`);
})