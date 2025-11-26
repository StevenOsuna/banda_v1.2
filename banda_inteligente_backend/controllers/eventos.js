const db = require("../config/db");

module.exports = {
    todos: (req, res) => {
        db.query("SELECT * FROM eventos ORDER BY fecha DESC", (err, rows) => {
            if (err) throw err;
            res.json(rows);
        });
    }
};
