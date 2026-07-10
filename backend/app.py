from flask import Flask, request, jsonify
import sqlite3
from flask_cors import CORS

import os
from dotenv import load_dotenv 
import google.generativeai as genai 

load_dotenv()

# Gemini configuration
genai.configure(
    api_key=os.getenv("GEMINI_API_KEY")
)


model = genai.GenerativeModel(
    "gemini-2.5-flash"
)

app = Flask(__name__)

# Allow React frontend to connect
CORS(app)

DATABASE = "mydatabase.db"

# Create database and table
def create_database():
    conn = sqlite3.connect(DATABASE)
    conn.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
    )
    """)

    conn.commit()
    conn.close()

create_database()

# Signup API
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json

    name = data["name"]
    email = data["email"]
    password = data["password"]

    try:

        conn = sqlite3.connect(DATABASE)
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO users(name,email,password)
            VALUES(?,?,?)
            """,
            (name,email,password)
        )

        conn.commit()
        conn.close()

        return jsonify({
            "message":"User registered successfully"
        })
    
    except sqlite3.IntegrityError:

        return jsonify({
            "message":"Email already exists"
        }),400


# Login API
@app.route("/login", methods=["POST"])
def login():

    data = request.json

    email = data["email"]
    password = data["password"]

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute(
        """
        SELECT * FROM users
        WHERE email=? AND password=?
        """,
        (email,password)
    )

    user = cursor.fetchone()

    conn.close()

    if user:

        return jsonify({
            "status":True,
            "message":"Login successful"
        })

    else:
        return jsonify({
            "status":False,
            "message":"Invalid email or password"
        })


@app.route("/ask", methods=["POST"])
def ask_question():
    print("/ask route called")
    data = request.json
    question = data.get("question")
    if not question:
        return jsonify({
            "answer":"Please enter a question"
        })

    try:
        prompt = f"""
        Answer the following question.

        Instructions:
        - Give only the most important points.
        - Use bullet points.
        - Keep the answer short and clear.
        - Avoid unnecessary explanations.
        - Maximum 5 to 7 points.

        Format:
        [
        "point 1",
        "point 2",
        "point 3"
        ]

        Question:
        {question}
        """        
        response = model.generate_content(prompt)
        answer = response.text
        return jsonify({
            "answer": answer
        })
    except Exception as e:
        return jsonify({
            "answer": str(e)
        }),500

if __name__ == "__main__":

    app.run(
        debug=True,
        port=5000
    )