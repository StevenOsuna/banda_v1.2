const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/eventos");

router.get("/", ctrl.todos);

module.exports = router;
