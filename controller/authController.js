const db = require('../db/connection');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {KEY} = require("../constant/constant");

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const [key] = await db.query('SELECT value FROM config WHERE conf_name = ?', [KEY]);
        const [user] = await db.query('SELECT * FROM appuser WHERE email = ?', [email]);
        if (user.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        } else {
            const isMatch = await bcrypt.compare(password, user[0].password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            const [foundedToken] = await db.query('SELECT * FROM token WHERE user_id = ?', [user[0].user_id]);
            if(foundedToken[0]){
                await db.query('DELETE FROM token where user_id = ?', [user[0].user_id]);
                const tokens = await jwt.sign({ id: user[0].user_id, email: user[0].email }, key[0].value);
                await db.query('INSERT INTO token (token, user_id) VALUE(?,?)', [tokens, user[0].user_id]);
                res.append('Authorization', tokens);
                return res.status(200).json({ message: 'Login successful',token:tokens });
            } else {
                const tokens = await jwt.sign({ id: user[0].user_id, email: user[0].email }, key[0].value);
                const inputNewToken = await db.query('INSERT INTO token (token, user_id) VALUE (?,?)', [tokens,user[0].user_id]);
                if(inputNewToken){
                    res.append('Authorization', tokens);
                    return res.status(200).json({ message: 'Login successful',token:tokens });
                }
            }
        }
    } catch (error){
        res.status(400).json({ message: error });
    }
}

const register = async (req, res) => {
    const { username, email, password, role } = req.body;

    try {
        const [user] = await db.query('SELECT * FROM appuser WHERE email = ?', [email]);
        if (user.length > 0) {
            return res.status(400).json({ message: 'Email already registered' });
        }else {
            const hashedPassword = await bcrypt.hash(password, 10);
            await db.query('INSERT INTO appuser (username, email, password, role) VALUES (?,?,?,?)', [username, email, hashedPassword, role]);
            return res.status(201).json({ message: 'User registered successfully' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};

module.exports = {
    login,
    register,
};