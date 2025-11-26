const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/emergencia");

router.get("/", ctrl.historial);

module.exports = router;
