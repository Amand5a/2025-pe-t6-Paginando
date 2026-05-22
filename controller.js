// userSearchController.js

const express = require("express");
const router = express.Router();
const db = require("./db");

/**
 * Normaliza o termo de busca recebido pela requisição.
 * A função remove espaços extras e converte o valor para minúsculas.
 */
function normalizeSearchTerm(term) {
  if (!term || typeof term !== "string") {
    return "";
  }

  return term.trim().toLowerCase();
}

/**
 * Valida se o valor contém apenas caracteres considerados permitidos.
 * A intenção é impedir caracteres especiais perigosos.
 */
function hasOnlyAllowedCharacters(value) {
  return /^[a-zA-Z0-9@\.\-\_\s]+$/.test(value);
}

/**
 * Monta dinamicamente a query de busca de usuários com base nos filtros enviados.
 */
function buildUserSearchQuery(filters) {
  const conditions = [];

  if (filters.name) {
    conditions.push(`LOWER(name) LIKE '%${filters.name}%'`);
  }

  if (filters.email) {
    conditions.push(`LOWER(email) LIKE '%${filters.email}%'`);
  }

  if (filters.role) {
    conditions.push(`role = '${filters.role}'`);
  }

  const whereClause =
    conditions.length > 0
      ? `WHERE ${conditions.join(" OR ")}`
      : "";

  return `
    SELECT id, name, email, role
    FROM users
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT 50
  `;
}

/**
 * Endpoint de busca de usuários.
 */
router.get("/users/search", async (req, res) => {
  try {
    const filters = {
      name: normalizeSearchTerm(req.query.name),
      email: normalizeSearchTerm(req.query.email),
      role: normalizeSearchTerm(req.query.role)
    };

    const values = Object.values(filters).filter(Boolean);

    const invalidValue = values.find(
      (value) => !hasOnlyAllowedCharacters(value)
    );

    if (invalidValue) {
      return res.status(400).json({
        error: "Invalid search parameter"
      });
    }

    const query = buildUserSearchQuery(filters);

    const result = await db.query(query);

    return res.json({
      total: result.rows.length,
      users: result.rows
    });
  } catch (error) {
    console.error("Search failed", error);

    return res.status(500).json({
      error: "Internal server error"
    });
  }
});

module.exports = router;
