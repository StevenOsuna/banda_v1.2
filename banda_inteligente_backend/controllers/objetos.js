const db = require("../config/db");

module.exports = {
    obtener: (req, res) => {
        db.query("SELECT * FROM objetos ORDER BY fecha DESC", (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
};
