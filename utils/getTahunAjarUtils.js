const db = require("../db/connection");
const getTahunAjarSingleId = async (tahunAjar,even_odd) => {

    const startDate = tahunAjar.split("/")[0]
    const endDate = tahunAjar.split("/")[1]
    const [tahunAjarResults] = await db.query(
        `SELECT *
         FROM tahun_ajar
         WHERE start_date LIKE ? AND end_date LIKE ? AND even_odd LIKE ?`, [`%${startDate}%`,`%${endDate}%`,`%${even_odd.toLowerCase()}%`]
    );

    if (tahunAjarResults.length > 0) {
        return tahunAjarResults[0].tahun_ajar_id || ""
    } else {
        return "";
    }
}

module.exports = {
    getTahunAjarSingleId,
}