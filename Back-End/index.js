const express = require('express');
const router = require('./routers/router');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;


// Enable All CORS Requests
app.use(cors());


// Konfigurasi middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(router);

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}!`);
})