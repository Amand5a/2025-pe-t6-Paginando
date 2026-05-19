from flask import Flask, request, jsonify
import sqlite3

app = Flask(__name__)


@app.route("/users/login", methods=["POST"])
def login():
    """
    VULNERÁVEL — SQL Injection (CWE-89)
    """
    username = request.form.get("username")
    password = request.form.get("password")
    
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    
    # Query construída com concatenação — Semgrep vai detectar
    query = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'"
    cursor.execute(query)
    
    result = cursor.fetchone()
    conn.close()
    
    if result:
        return jsonify({"status": "ok", "user_id": result[0]})
    return jsonify({"status": "fail"}), 401


@app.route("/users/<user_id>/profile")
def get_profile(user_id):
    """
    VULNERÁVEL — SQL Injection (CWE-89)
    """
    conn = sqlite3.connect("users.db")
    cursor = conn.cursor()
    
    query = f"SELECT * FROM profiles WHERE user_id = {user_id}"
    cursor.execute(query)
    
    result = cursor.fetchone()
    conn.close()
    
    return jsonify(dict(zip(["id", "name", "email"], result)) if result else {})
