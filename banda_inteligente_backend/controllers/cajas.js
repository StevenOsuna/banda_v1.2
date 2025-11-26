const db = require("../config/db");

module.exports = {
    registrar: (req, res) => {
        const { tipo, cantidad } = req.body;

        db.query(
            "INSERT INTO cajas (tipo, cantidad) VALUES (?, ?)",
            [tipo, cantidad],
            (err) => {
                if (err) throw err;
                res.json({ ok: true });
            }
        );
    }
};
