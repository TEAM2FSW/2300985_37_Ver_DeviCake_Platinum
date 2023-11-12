const express = require('express');
const router = require('./routers/router');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

// Konfigurasi middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}!`);
})