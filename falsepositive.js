// falsePositiveTest.js

const express = require("express");
const router = express.Router();
const db = require("./db");
const bcrypt = require("bcrypt");

/**
 * TESTE 1 — Query SQL parametrizada
 * Esperado: não deve apontar SQL Injection.
 */
router.get("/users/:id", async (req, res) => {
  const userId = Number(req.params.id);

  if (!Number.isInteger(userId) || userId <= 0) {
    return res.status(400).json({
      error: "Invalid user id"
    });
  }

  const result = await db.query(
    `
      SELECT id, name, email, role
      FROM users
      WHERE id = $1
    `,
    [userId]
  );

  return res.json({
    user: result.rows[0] || null
  });
});

/**
 * TESTE 2 — Busca com filtros usando placeholders dinâmicos
 * Esperado: não deve apontar SQL Injection.
 */
router.get("/users/search", async (req, res) => {
  const filters = [];
  const params = [];

  if (req.query.name && typeof req.query.name === "string") {
    params.push(`%${req.query.name.trim().toLowerCase()}%`);
    filters.push(`LOWER(name) LIKE $${params.length}`);
  }

  if (req.query.email && typeof req.query.email === "string") {
    params.push(`%${req.query.email.trim().toLowerCase()}%`);
    filters.push(`LOWER(email) LIKE $${params.length}`);
  }

  const whereClause =
    filters.length > 0
      ? `WHERE ${filters.join(" OR ")}`
      : "";

  const query = `
    SELECT id, name, email
    FROM users
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT 50
  `;

  const result = await db.query(query, params);

  return res.json({
    total: result.rows.length,
    users: result.rows
  });
});

/**
 * TESTE 3 — Hash seguro de senha com bcrypt
 * Esperado: não deve apontar criptografia fraca.
 */
router.post("/users/password", async (req, res) => {
  const password = req.body.password;

  if (!password || typeof password !== "string" || password.length < 12) {
    return res.status(400).json({
      error: "Invalid password"
    });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.query(
    `
      UPDATE users
      SET password_hash = $1
      WHERE id = $2
    `,
    [passwordHash, req.body.userId]
  );

  return res.status(204).send();
});

/**
 * TESTE 4 — Tratamento de erro sem exposição ao cliente
 * Esperado: não deve apontar exposição de stack trace.
 */
router.get("/reports/:id", async (req, res) => {
  try {
    const reportId = Number(req.params.id);

    if (!Number.isInteger(reportId) || reportId <= 0) {
      return res.status(400).json({
        error: "Invalid report id"
      });
    }

    const result = await db.query(
      `
        SELECT id, title, created_at
        FROM reports
        WHERE id = $1
      `,
      [reportId]
    );

    return res.json({
      report: result.rows[0] || null
    });
  } catch (error) {
    console.error("Failed to load report:", error);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

module.exports = router;
