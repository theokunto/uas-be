const express = require('express');
const {register, login} = require("../controller/authController");
const authenticateToken = require("../middlewares/authMiddlewares");

const router = express.Router();
router.post('/',authenticateToken, login); // get krs
router.post('/add',authenticateToken, register); // add krs by student
router.post('/edit',authenticateToken, login); // edit krs by student
router.post('/approve',authenticateToken, login); // approve krs by admin
router.post('/reject',authenticateToken, login); // reject krs by admin

module.exports = router;