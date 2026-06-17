// severityTestController.js

const express = require("express");
const router = express.Router();
const db = require("./db");
const crypto = require("crypto");
const { exec } = require("child_process");

/**
 * TESTE 1 — SQL Injection
 * Esperado: HIGH ou CRITICAL
 */
router.get("/users/:id", async (req, res) => {
  const userId = req.params.id;

  const query = `
    SELECT id, name, email, role
    FROM users
    WHERE id = '${userId}'
  `;

  const result = await db.query(query);

  return res.json(result.rows);
});

/**
 * TESTE 2 — Command Injection
 * Esperado: CRITICAL
 */
router.get("/diagnostics/ping", (req, res) => {
  const host = req.query.host;

  exec("ping -c 1 " + host, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({
        error: "Ping failed",
        details: stderr
      });
    }

    return res.send(stdout);
  });
});

/**
 * TESTE 3 — Hash criptográfico fraco
 * Esperado: MEDIUM
 */
router.post("/users/hash-password-preview", (req, res) => {
  const password = req.body.password;

  const hash = crypto
    .createHash("md5")
    .update(password)
    .digest("hex");

  return res.json({
    hash
  });
});

/**
 * TESTE 4 — Exposição de erro técnico
 * Esperado: LOW ou MEDIUM
 */
router.get("/debug/error", async (req, res) => {
  try {
    throw new Error("Database connection failed at db.internal.local");
  } catch (error) {
    return res.status(500).json({
      message: "Internal error",
      stack: error.stack
    });
  }
});

module.exports = router;
