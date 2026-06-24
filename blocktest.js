// blockingCriteriaTest.js

const express = require("express");
const router = express.Router();
const crypto = require("crypto");

/**
 * TESTE 1 — Uso de MD5 para gerar hash de valor não sensível
 * Esperado: MEDIUM ou LOW
 * Não deve bloquear isoladamente.
 */
router.get("/files/checksum", (req, res) => {
  const fileContent = req.query.content || "";

  const checksum = crypto
    .createHash("md5")
    .update(fileContent)
    .digest("hex");

  return res.json({
    algorithm: "md5",
    checksum
  });
});

/**
 * TESTE 2 — Cabeçalho de segurança ausente
 * Esperado: LOW ou MEDIUM
 * Não deve bloquear isoladamente.
 */
router.get("/public/status", (req, res) => {
  res.json({
    status: "ok",
    environment: "production"
  });
});

/**
 * TESTE 3 — Mensagem de erro genérica, mas com log interno simples
 * Esperado: LOW ou Informational
 * Não deve bloquear.
 */
router.get("/health/database", async (req, res) => {
  try {
    throw new Error("Database timeout");
  } catch (error) {
    console.error("Database health check failed:", error.message);

    return res.status(500).json({
      message: "Service temporarily unavailable"
    });
  }
});

/**
 * TESTE 4 — Validação simples de parâmetro numérico
 * Esperado: sem bloqueio
 * Pode gerar recomendação de validação mais robusta, mas não vulnerabilidade crítica.
 */
router.get("/orders/:id", (req, res) => {
  const orderId = Number(req.params.id);

  if (!Number.isInteger(orderId) || orderId <= 0) {
    return res.status(400).json({
      error: "Invalid order id"
    });
  }

  return res.json({
    id: orderId,
    status: "processing"
  });
});

module.exports = router;
