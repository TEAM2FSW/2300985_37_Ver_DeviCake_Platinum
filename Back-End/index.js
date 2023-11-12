const express = require('express');
const router = require('./routers/router');
const app = express();
const port = 5000;


app.use(router);

app.listen(port, () => {
    console.log(`Server berjalan di port ${port}!`);
})