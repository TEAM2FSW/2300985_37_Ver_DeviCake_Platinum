const express = require("express");
const router = express.Router();
const api = require("./api");

router.use("/api", api);

module.exports = router;


