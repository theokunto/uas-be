const jwt = require('jsonwebtoken');
const db = require('../db/connection');
const {KEY} = require("../constant/constant");
const authenticateToken = async (req, res, next) => {
    const tokens = req.headers['authorization'];
    const cleanToken = tokens.split(" ")[1]
    try {
        if (!cleanToken) {
            return res.status(401).json({ message: 'Access denied, no token provided' });
        } else {
            const [key] = await db.query('SELECT value FROM config WHERE conf_name = ?', [KEY]);
            const [token] = await db.query('SELECT * FROM token WHERE token = ?', [cleanToken]);
            if (!token[0].token) {
                return res.status(401).json({ code:'token.expired',message: 'Access denied, token expired' });
            } else {
                req.user = jwt.verify(token[0].token, key[0].value);
                next()
            }
        }
    } catch (error) {
        res.status(403).json({ message: 'Invalid token' });
    }
};

module.exports = authenticateToken;