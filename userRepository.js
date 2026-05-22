// userRepository.js
const db = require("./db");

function getUser(req, res) {
  const userId = req.query.id;
  const query = "SELECT * FROM users WHERE id = '" + userId + "'";
  db.query(query, (err, rows) => res.json(rows));
}
module.exports = { getUser };
