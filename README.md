# 🧠 Node.js Fundamentals — Native HTTP CRUD API

A lightweight API built using only **Node.js core modules**, designed to demonstrate fundamental backend concepts without any external frameworks (like Express). It includes:

- A full CRUD system
- Custom routing
- JSON body parsing
- File-based storage (JSON DB)
- Query parameter parsing
- Dynamic route matching with RegExp

This project simulates how HTTP servers work at a low level and was created as part of my backend learning path.

---

## 🚀 Features

- ✅ Native `http` server
- ✅ In-memory database with JSON file persistence
- ✅ Dynamic route matching (e.g., `/users/:id`)
- ✅ Supports query strings and search filters
- ✅ Custom middleware for parsing request body
- ✅ Full CRUD operations (`GET`, `POST`, `PUT`, `DELETE`)

---

## 📦 Technologies

- Node.js (no frameworks)
- `fs/promises` for file I/O
- `crypto.randomUUID()` for ID generation
- RegExp for route pattern matching

---


---

## 🧪 API Endpoints

### `GET /users`

Returns all users.  
Supports optional search via query:

```bash
/users?search=john
```
POST /users

Creates a new user.
Body:
```bash
{
  "name": "John Doe",
  "email": "john@example.com"
}
```
DELETE /users/:id

Deletes a user.

## 🛠️ Running Locally

```bash
# Clone the repository
git clone https://github.com/ithauront/fundamentosNodeJs

# Navigate into the project
cd fundamentosNodeJs

# Start the development server
npm run dev
```
The API will be running at:
http://localhost:3333

## 📚 What I Learned

  * Manual route matching with RegExp

  * Middleware creation in Node.js

  * Streaming/parsing request body

  * File persistence without databases

  * Native HTTP module internals

