const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/cajas");

router.post("/", ctrl.registrar);

module.exports = router;
