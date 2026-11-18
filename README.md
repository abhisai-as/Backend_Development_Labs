# Backend Development Labs

Course repository for **Backend Development Fundamentals (BDF)** at **Aurora Deemed to be University**.

## Student Information
- **Student Name:** GOVINDU ABHISAI 
- **Registration Number:** 252U1R6086 
- **Class / Section:** B.Tech CSE(AIML)- 2B / 207

---

## Lab Directory Index

| Lab | Title | Directory | Live Deployment URL | Status |
|:---:|---|:---:|:---:|:---:|
| **01** | **Node.js and Express Server** | [`lab-01/`](./lab-01/) | [bdf-lab-01-abhisai.onrender.com](https://bdf-lab-01-abhisai.onrender.com) | **Completed & Live** |
| **02** | **SQLite Database and CRUD Routes** | [`lab-02/`](./lab-02/) | [bdf-lab-02-abhisai.onrender.com](https://bdf-lab-02-abhisai.onrender.com) | **Completed & Live** |
| **03** | **RESTful Books API with Filtering & Sorting** | [`Lab3/`](./Lab3/) | [bdf-lab-03-abhisai.onrender.com](https://bdf-lab-03-abhisai.onrender.com) | **Completed & Live** |
| **04** | **Registration, Login and JWT** | [`lab-04/`](./lab-04/) | _Not deployed yet_ | **Completed** |

---

### Lab Summaries

#### Lab 01: Node.js and Express Server
- Plain Node.js HTTP Server (`http-server.js`) listening on port 3000.
- Production Express.js Server (`server.js`) with GET routes (`/`, `/about`, `/time`) and catch-all 404 handler.
- Full documentation and route screenshots in [`lab-01/`](./lab-01/).

#### Lab 02: SQLite Database and CRUD Routes
- Express.js application connected to SQLite database (`database/books.db`).
- Complete RESTful CRUD routing (`GET /books/`, `GET /books/:bookId/`, `POST /books/`, `PUT /books/:bookId/`, `DELETE /books/:bookId/`).
- Database populated with 10 sample books and full verification screenshots in [`lab-02/`](./lab-02/).

#### Lab 03: RESTful Books API with Filtering, Sorting & Pagination
- Express.js and SQLite RESTful API implementing complete CRUD for `/books`.
- Advanced query parameters: partial title search (`search_q`), column sorting (`order_by`, `order`), pagination (`limit`, `offset`), and price range filtering (`min_price`, `max_price`, `BETWEEN`).
- Strict request validation with JSON errors, parameterized queries, and 18 automated test cases in [`Lab3/`](./Lab3/).

#### Lab 04: Registration, Login and JWT
- User registration with bcrypt password hashing and unique username validation.
- Login endpoint that verifies credentials with `bcrypt.compare` and returns a signed JWT token.
- JWT payload contains only the username (never the password); token verified at jwt.io.
- Full Postman test screenshots for success and error cases in [`lab-04/`](./lab-04/).
