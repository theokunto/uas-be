const db = require('../db/connection');
//buat dapeting semua user dari database tabel users
const getAllUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
};

module.exports = {
    getAllUsers,
};
