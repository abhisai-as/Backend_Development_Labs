/**
 * Backend Development Fundamentals — Lab 04
 * Registration, Login and JWT Authentication
 *
 * Student Name: GOVINDU ABHISAI
 * Registration Number: 252U1R6086
 * Course: Backend Development Fundamentals
 * Institution: Aurora Deemed to be University
 */

const express = require("express");
const path = require("path");
const sqlite3 = require("sqlite3").verbose();
const { open } = require("sqlite");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;
const dbPath = path.resolve(__dirname, "database/users.db");

// Secret key for JWT signing (will be moved to .env in Lab 8)
const JWT_SECRET = "my_super_secret_key_lab04";

let db = null;

// Middleware to parse JSON request bodies
app.use(express.json());

/**
 * Initialize SQLite database connection and create user table.
 * Starts the Express server only after the database is ready.
 */
const initializeDBAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    // Create user table with unique username constraint
    await db.exec(`
      CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        name TEXT NOT NULL,
        password TEXT NOT NULL
      );
    `);

    console.log("Database initialized — user table is ready.");

    app.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(`Lab 04 Auth API running at: http://localhost:${PORT}`);
      console.log(`=======================================================`);
    });
  } catch (e) {
    console.error(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

// ─── Root Endpoint ──────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.status(200).json({
    message:
      "Welcome to Lab 04 — Registration, Login and JWT Authentication API",
    endpoints: {
      register: "POST /register/",
      login: "POST /login/",
    },
  });
});

// ─── POST /register/ — Create a new user ────────────────────────────────────────

app.post("/register/", async (req, res) => {
  try {
    const { username, name, password } = req.body;

    // Validate required fields
    if (!username || !name || !password) {
      return res.status(400).json({
        error: "Missing required fields: username, name and password",
      });
    }

    // Check if username already exists
    const existingUser = await db.get(
      "SELECT id FROM user WHERE username = ?",
      [username]
    );

    if (existingUser) {
      return res.status(400).json({
        error: "Username already exists",
      });
    }

    // Hash the password using bcrypt (salt rounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user with the hashed password
    const result = await db.run(
      "INSERT INTO user (username, name, password) VALUES (?, ?, ?)",
      [username, name, hashedPassword]
    );

    res.status(201).json({
      message: "User registered successfully",
      userId: result.lastID,
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── POST /login/ — Authenticate user and return JWT ─────────────────────────────

app.post("/login/", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      return res.status(400).json({
        error: "Missing required fields: username and password",
      });
    }

    // Retrieve user from database
    const user = await db.get("SELECT * FROM user WHERE username = ?", [
      username,
    ]);

    if (!user) {
      return res.status(400).json({
        error: "Invalid user — username not found",
      });
    }

    // Compare provided password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Invalid password",
      });
    }

    // Generate JWT — only username in payload (never the password)
    const payload = { username: user.username };
    const jwtToken = jwt.sign(payload, JWT_SECRET);

    res.status(200).json({ jwt_token: jwtToken });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────────

app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    message: "The requested endpoint does not exist.",
  });
});

// Start the application
initializeDBAndServer();
