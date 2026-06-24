// load.js
const serialize = require("node-serialize");

function load(req, res) {
  const data = req.body.payload;
  const obj = serialize.unserialize(data); // dados não confiáveis -> RCE
  res.json(obj);
}
module.exports = { load };
