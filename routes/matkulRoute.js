const express = require('express');
const {getMatkul} = require("../controller/matkulController");
const authenticateToken = require("../middlewares/authMiddlewares");

const router = express.Router();
router.get('/',authenticateToken, getMatkul);
module.exports = router;