const db = require("../db/connection");
const getMahasiswaSingleId = async (mahasiswaName) => {
    const [mahasiswaResults] = await db.query(
        `SELECT *
         FROM mahasiswa
         WHERE nama_lengkap LIKE ?`, [`%${mahasiswaName}%`]
    );

    if (mahasiswaResults.length > 0) {
        return mahasiswaResults[0].mahasiswa_id || ""
    } else {
        return "";
    }
}

module.exports = {
    getMahasiswaSingleId,
}