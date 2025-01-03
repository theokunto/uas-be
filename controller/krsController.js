const db = require("../db/connection");
const {getMahasiswaSingleId} = require("../utils/getMahasiswaUtils");
const {getTahunAjarSingleId} = require("../utils/getTahunAjarUtils");
const getKrs = async (req, res) => {
    const {page, size, tahunAjar,semester, status, mahasiswa} = req.body;
    try {
        const mahasiswaId = await getMahasiswaSingleId(mahasiswa);
        const tahunAjarId = await getTahunAjarSingleId(tahunAjar,semester);
        let searchObject = []
        const offset = (page - 1) * size;
        let query = 'SELECT * FROM krs WHERE'
        if (mahasiswaId && mahasiswaId !== "") {
            query = query + ' mahasiswa_id = ? AND';
            searchObject.push(mahasiswaId)
        }
        if (tahunAjarId && tahunAjarId !== "") {
            query = query + ' tahun_ajar_id = ? AND';
            searchObject.push(tahunAjarId)
        }
        if (status) {
            query = query + ' status = ?';
            searchObject.push(status.toLowerCase());
        }
        query = query + ' LIMIT ? OFFSET ?';
        searchObject.push(parseInt(size, 10))
        searchObject.push(parseInt(offset, 10))
        const [results] = await db.query(query, searchObject);

        return res.status(200).json({
            data: results,
            page: parseInt(page, 10),
            size: parseInt(size, 10),
        });
    } catch (error) {
        res.status(400).json({message: 'Error getting krs', error});
    }
}

const changeStatusKrs = async (req, res) => {
    const {krs_id,status} = req.body;
    try{
        const [resutls] = await db.query(`UPDATE krs SET status = ? WHERE krs_id = ?`,[status.toLowerCase(),Number(krs_id)])
        if(resutls){
            return res.status(200).json({message: 'success', data: resutls[0]})
        }else {
            return res.status(400).json({message: 'Error updating krs id'})
        }
    }catch(error){
        return res.status(400).json({message: "Failed to change krs status",error});
    }
}

const submitKrs = async (req, res) => {
    const {matkul,tahun_ajar_id,mahasiswa_id} = req.body;
    const stringMatkul = JSON.stringify(matkul);
    console.log(stringMatkul);
    try{
        const [resutls] = await db.query(`INSERT INTO krs (mahasiswa_id,matkul,tahun_ajar_id,status) 
    VALUE (?,?,?,?)`,[mahasiswa_id,stringMatkul,tahun_ajar_id,'created'])
        if(resutls){
            return res.status(200).json({message: 'Success submitting KRS', data: resutls[0]})
        }
    }catch(error){
        return res.status(400).json({message: 'Error submitting KRS ',error})
    }
}

module.exports = {
    getKrs,
    changeStatusKrs,
    submitKrs
}
