const express = require('express');
const router = require('./routers/router');
const path = require("path");
const productRoutes = require('./routers/productRoutes');
const morgan = require('morgan');

const app = express();
const port = 3000;


app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use(router);

app.use('/products', productRoutes);

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}!`);
})