````md
# 📝 Quiz Management API

A **REST API** built with **Node.js, Express, and Prisma** to manage quizzes.  
This API allows a static user to **create, edit, delete, and fetch quizzes**.

---

## 🚀 **Project Setup**

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/yourusername/quiz-api.git
cd quiz-api
```
````

### 2️⃣ **Install Dependencies**

```sh
npm install
```

### 3️⃣ **Set Up Environment Variables**

Create a `.env` file in the root directory and add:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/quizdb"
```

### 4️⃣ **Run Database Migrations**

```sh
npx prisma migrate dev --name init
```

### 5️⃣ **Start the Server**

```sh
npm start
```

Server runs at **`http://localhost:5000`**.

---

## 📌 **API Documentation**

### **Base URL:**

```
http://localhost:5000
```

---

### 🔑 **Authentication**

A static user is pre-defined:

```json
{
  "username": "teacher",
  "password": "password123"
}
```

---

### 🔹 **Login**

#### ✅ Request

```http
POST /login
```

```json
{
  "username": "teacher",
  "password": "password123"
}
```

#### ✅ Response

```json
{
  "success": true,
  "userId": "static-user-id"
}
```

---

### 📋 **Quizzes API**

### 🔹 **Get All Quizzes**

#### ✅ Request

```http
GET /quizzes
```

#### ✅ Response

```json
[
  {
    "id": "1",
    "title": "JavaScript Basics",
    "description": "A quiz on JS fundamentals",
    "createdAt": "2024-02-14T12:00:00.000Z",
    "userId": "static-user-id"
  }
]
```

---

### 🔹 **Create a Quiz**

#### ✅ Request

```http
POST /quizzes
```

```json
{
  "title": "React Basics",
  "description": "A quiz on React components and hooks"
}
```

#### ✅ Response

```json
{
  "id": "2",
  "title": "React Basics",
  "description": "A quiz on React components and hooks",
  "createdAt": "2024-02-14T12:10:00.000Z",
  "userId": "static-user-id"
}
```

---

### 🔹 **Update a Quiz**

#### ✅ Request

```http
PUT /quizzes/:id
```

```json
{
  "title": "Updated Quiz Title",
  "description": "Updated description"
}
```

#### ✅ Response

```json
{
  "id": "1",
  "title": "Updated Quiz Title",
  "description": "Updated description",
  "createdAt": "2024-02-14T12:00:00.000Z",
  "userId": "static-user-id"
}
```

---

### 🔹 **Delete a Quiz**

#### ✅ Request

```http
DELETE /quizzes/:id
```

#### ✅ Response

```json
{
  "message": "Quiz deleted"
}
```

---

## 🛠 **Tech Stack**

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** Static User (Future: JWT Authentication)
- **ORM:** Prisma

---
