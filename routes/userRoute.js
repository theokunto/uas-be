const express = require('express');
const { getAllUsers } = require('../controller/userController');

const router = express.Router();
// path buat search users
router.get('/users', getAllUsers);

module.exports = router;
