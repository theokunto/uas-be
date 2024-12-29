const express = require('express');
const {regMahasiswa, getMahasiswa} = require("../controller/mahasiswaController");
const authenticateToken = require("../middlewares/authMiddlewares");
const router = express.Router();
router.post('/register', regMahasiswa);
router.get('/:userId', authenticateToken ,getMahasiswa);

module.exports = router;