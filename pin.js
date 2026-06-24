const { exec } = require("child_process");

function ping(req, res) {
  const host = req.query.host;
  exec("ping -c 1 " + host, (err, stdout) => res.send(stdout));
}
module.exports = { ping };
