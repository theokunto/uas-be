const express = require('express');
const authenticateToken = require("../middlewares/authMiddlewares");
const {getKrs,changeStatusKrs, submitKrs} = require("../controller/krsController");

const router = express.Router();
router.get('/',authenticateToken, getKrs);
router.post('/',authenticateToken, submitKrs);
router.patch('/',authenticateToken, changeStatusKrs);

module.exports = router;