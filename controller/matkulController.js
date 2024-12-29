const db = require('../db/connection');

const getMatkul= async (req, res) => {
    const { page , size , search = '' } = req.body;
    try{
        const offset = (page - 1) * size;
        const [results] = await db.query(
            `SELECT * 
             FROM matkul 
             WHERE nama_matkul LIKE ? 
             LIMIT ? OFFSET ?`,
            [`%${search}%`, parseInt(size, 10), parseInt(offset, 10)]
        );
        const [totalRecords] = await db.query(
            `SELECT COUNT(*) as total 
             FROM matkul 
             WHERE nama_matkul LIKE ?`,
            [`%${search}%`]
        );
        const total = totalRecords[0]?.total || 0;

        return res.status(200).json({
            data: results,
            total,
            page: parseInt(page, 10),
            size: parseInt(size, 10),
            totalPages: Math.ceil(total / size),
        });
    }catch (error) {
        res.status(400).json({ message: 'Error getting courses', error });
    }
}

module.exports = {
    getMatkul
};
