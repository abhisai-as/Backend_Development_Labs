# Lab 4: Registration, Login and JWT

**GOVINDU ABHISAI** · **252U1R6086** · **B.Tech CSE(AIML) – 2B / 207**

---

## Live Link

> _Not applicable_ — Deployment will be configured in a later lab. See Postman screenshots below for all endpoint tests.

---

## How to Run

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)

### Installation

```bash
cd lab-04
npm install
```

### Environment Variables

| Variable     | Description                        | Default                     |
|:-------------|:-----------------------------------|:----------------------------|
| `PORT`       | Port the server listens on         | `3000`                      |
| `JWT_SECRET` | Secret key for signing JWT tokens  | _(hardcoded for now; moved to `.env` in Lab 8)_ |

### Start the Server

```bash
npm start
```

The server will start at `http://localhost:3000`.

---

## Endpoints

| Method | Path           | Description                                              |
|:------:|:---------------|:---------------------------------------------------------|
| `GET`  | `/`            | Health check — lists available endpoints                 |
| `POST` | `/register/`   | Register a new user (username, name, password)           |
| `POST` | `/login/`      | Authenticate user and receive a JWT token                |

### Request / Response Details

#### POST `/register/`

**Request body:**
```json
{
  "username": "abhisai",
  "name": "Govindu Abhisai",
  "password": "mypassword123"
}
```

**Success (201):**
```json
{
  "message": "User registered successfully",
  "userId": 1
}
```

**Error — duplicate username (400):**
```json
{
  "error": "Username already exists"
}
```

#### POST `/login/`

**Request body:**
```json
{
  "username": "abhisai",
  "password": "mypassword123"
}
```

**Success (200):**
```json
{
  "jwt_token": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Error — wrong password (400):**
```json
{
  "error": "Invalid password"
}
```

**Error — user not found (400):**
```json
{
  "error": "Invalid user — username not found"
}
```

---

## Screenshots

### 1. Successful Registration
<img width="2940" height="1912" alt="image" src="https://github.com/user-attachments/assets/27dd57fc-83d2-4b81-a364-f19d8b6fbd4d" />



### 2. Duplicate Username Error
![Duplicate Username](screenshots/02_register_duplicate.png)

### 3. Successful Login
![Successful Login](screenshots/03_login_success.png)

### 4. Login — Wrong Password
![Wrong Password](screenshots/04_login_wrong_password.png)

### 5. Login — User Not Found
![User Not Found](screenshots/05_login_user_not_found.png)

### 6. JWT Decoded at jwt.io
![JWT Decoded](screenshots/06_jwt_decoded.png)

### 7. Database — Hashed Passwords
![Database View](screenshots/07_database_hashes.png)

---

## Notes

### Problems Faced and Solutions

1. **bcrypt installation on macOS** — Required Xcode command-line tools. Resolved with `xcode-select --install`.
2. **Password stored as hash** — Verified in the database that the `password` column contains only bcrypt hashes, never plain text.
3. **JWT payload** — Ensured that only the `username` is placed in the token payload; the password is never included.

### Viva Preparation

| Question | Answer |
|:---------|:-------|
| Why POST for login? | POST sends credentials in the request body (not the URL), so they are not logged in browser history or server access logs. GET would expose them as query parameters. |
| Hash vs encrypt? | Hashing is **one-way** — you cannot reverse a bcrypt hash back to the password. Encryption is **two-way** — the original data can be recovered with a key. For passwords we always hash. |
| What does `jwt.sign` need? | A payload object (data to encode), a secret key (to sign the token), and optionally an options object (e.g. `expiresIn`). |
| What should never go into the payload? | Passwords, credit-card numbers, or any other sensitive / secret data. The JWT payload is only Base64-encoded, **not encrypted** — anyone can decode it. |
