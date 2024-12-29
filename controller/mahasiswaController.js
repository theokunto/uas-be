const db = require('../db/connection');

const regMahasiswa= async (req, res) => {
    const { userId, nim, namaLengkap, jurusan, angkatan, alamat } = req.body;

    try {
        const [userIds] = await db.query('SELECT * FROM appuser WHERE user_id = ?', [userId]);
        if (userIds.length === 0) {
            return res.status(404).json({ message: 'User Id not found.' });
        }else {
            await db.query('INSERT INTO mahasiswa (user_id, nim, nama_lengkap, jurusan,angkatan,alamat) VALUES (?,?,?,?,?,?)', [userId, nim, namaLengkap, jurusan, angkatan, alamat]);
            return res.status(201).json({ message: 'Student registered successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error registering student', error });
    }
};

const getMahasiswa= async (req, res) => {
    const { userId } = req.params;
    try{
        const [user] = await db.query('SELECT * FROM appuser WHERE user_id = ?', [userId]);
        const cleanUser = {...user[0],password:undefined}
        return res.status(200).json(cleanUser);
    }catch (error) {
        res.status(400).json({ message: 'Error getting student', error });
    }
}

module.exports = {
    regMahasiswa,
    getMahasiswa
};
