const db = require("../config/db");

module.exports = {
    historial: (req, res) => {
        db.query("SELECT * FROM emergencias ORDER BY fecha DESC", (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
};
