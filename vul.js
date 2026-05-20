const express = require('express');
const mysql = require('mysql');
const { exec } = require('child_process');
const crypto = require('crypto');

const app = express();

// Hardcoded secrets — Gitleaks vai pegar
const AWS_ACCESS_KEY_ID = "AKIAIOSFODNN7EXAMPLE";
const AWS_SECRET_ACCESS_KEY = "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY";
const DATABASE_PASSWORD = "admin123";
const JWT_SECRET = "supersecret-do-not-use-in-prod";

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: DATABASE_PASSWORD,
  database: 'app'
});

// SQL Injection — Semgrep vai pegar
app.get('/login', (req, res) => {
  const user = req.query.user;
  const query = "SELECT * FROM users WHERE name = '" + user + "'";
  db.query(query, (err, results) => {
    res.json(results);
  });
});

// Command Injection — Semgrep vai pegar
app.get('/ping', (req, res) => {
  const host = req.query.host;
  exec('ping -c 1 ' + host, (err, stdout) => {
    res.send(stdout);
  });
});

// Insecure Deserialization (eval) — Semgrep vai pegar
app.get('/run', (req, res) => {
  const code = req.query.code;
  const result = eval(code);
  res.json({ result });
});

// Weak crypto (MD5) — Semgrep vai pegar
function hashPassword(pwd) {
  return crypto.createHash('md5').update(pwd).digest('hex');
}

// XSS — Semgrep vai pegar
app.get('/welcome', (req, res) => {
  const name = req.query.name;
  res.send('<h1>Welcome ' + name + '</h1>');
});

// Path Traversal — Semgrep vai pegar
const fs = require('fs');
app.get('/file', (req, res) => {
  const filename = req.query.f;
  const content = fs.readFileSync('./uploads/' + filename, 'utf8');
  res.send(content);
});

app.listen(8000);
