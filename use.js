/ userRepository.js
const db = require("./db");

function getUser(req, res) {
  const userId = req.query.id;
  db.query("SELECT * FROM users WHERE id = ?", [userId], // parametrizado
    (err, rows) => res.json(rows));
}
module.exports = { getUser };
