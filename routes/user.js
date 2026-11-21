const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

// Solo hay login: los usuarios se dan de alta directamente en la base de datos
user.post("/login", async (req, res, next) => {
    const { user_mail, user_password } = req.body;

    if (user_mail && user_password) {
        const query = `SELECT * FROM user WHERE user_mail = '${user_mail}' AND user_password = '${user_password}'`;
        const rows = await db.query(query);

        if (rows.length == 1) {
            const token = jwt.sign({
                user_id: rows[0].user_id,
                user_mail: rows[0].user_mail
            }, process.env.JWT_KEY || "debugkey", { expiresIn: "8h" });

            return res.status(200).json({ code: 200, message: token });
        }
        return res.status(401).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
    }
    return res.status(400).json({ code: 400, message: "Campos incompletos" });
});

module.exports = user;
