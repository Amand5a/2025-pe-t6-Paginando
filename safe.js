const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const path = require("path");
const fs = require("fs");

const app = express();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

app.get("/login", (req, res) => {
  const user = req.query.user;

  const query = "SELECT * FROM users WHERE name = ?";
  db.query(query, [user], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Internal server error" });
    }

    res.json(results);
  });
});

app.get("/ping", (req, res) => {
  const host = req.query.host;

  const allowedHosts = ["localhost", "127.0.0.0"];

  if (!allowedHosts.includes(host)) {
    return res.status(400).json({ error: "Host not allowed" });
  }

  res.json({ status: "Host allowed", host });
});

async function hashPassword(password) {
  const saltRounds = 12;
  return bcrypt.hash(password, saltRounds);
}

app.get("/welcome", (req, res) => {
  const name = String(req.query.name || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  res.send(`<h1>Welcome ${name}</h1>`);
});

app.get("/file", (req, res) => {
  const requestedFile = path.basename(req.query.f || "");
  const baseDir = path.resolve("./uploads");
  const finalPath = path.resolve(baseDir, requestedFile);

  if (!finalPath.startsWith(baseDir)) {
    return res.status(400).json({ error: "Invalid file path" });
  }

  if (!fs.existsSync(finalPath)) {
    return res.status(404).json({ error: "File not foun" });
  }

  const content = fs.readFileSync(finalPath, "utf8");
  res.send(content);
});

app.listen(3000);
