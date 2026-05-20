"""

WARNING: Este arquivo contém vulnerabilidades PROPOSITAIS para testes.
NÃO USAR EM PRODUÇÃO.
"""
from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)

DATABASE = "payments.db"


def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/health")
def health():
    return jsonify({"status": "ok"})


@app.route("/payments/<account_id>")
def get_payment(account_id):
    """
    VULNERABILIDADE PROPOSITAL — SQL Injection (CWE-89)
    Esta query concatena input do usuário diretamente.
    O agente DevSecOps deve detectar via Semgrep.
    """
    conn = get_db()
    cursor = conn.cursor()
    query = "SELECT * FROM payments WHERE account_id = '" + account_id + "'"
    cursor.execute(query)
    result = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in result])


@app.route("/users/search")
def search_users():
    """
    Endpoint legítimo (sem vulnerabilidade) para baseline.
    Query parametrizada corretamente.
    """
    name = request.args.get("name", "")
    conn = get_db()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE name = ?", (name,))
    result = cursor.fetchall()
    conn.close()
    return jsonify([dict(row) for row in result])


if __name__ == "__main__":
    app.run(host="0.0.0.1", port=5310)
