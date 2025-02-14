````md
# 📝 Quizo

A **full-stack** quiz management application built with **React, Node.js, Express, and PostgreSQL (Prisma ORM)**.  
This project allows users to **create, edit, delete, and fetch quizzes**.

---

## 🚀 **Project Setup (Run Locally)**

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/yourusername/Quizo.git
cd Quizo
```
````

### 2️⃣ **Backend Setup**

#### 🔹 Navigate to the backend folder

```sh
cd backend
```

#### 🔹 Install dependencies

```sh
pnpm install
```

#### 🔹 Set up environment variables

Create a `.env` file in the backend directory and add:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/quizdb"
```

#### 🔹 Run Prisma Migrations

```sh
pnpm dlx prisma migrate dev --name init
```

#### 🔹 Start the backend server

```sh
pnpm dev
```

The backend runs on **`http://localhost:5000`**.

---

### 3️⃣ **Frontend Setup**

#### 🔹 Navigate to the frontend folder

```sh
cd ../frontend
```

#### 🔹 Install dependencies

```sh
pnpm install
```

#### 🔹 Start the frontend server

```sh
pnpm run dev
```

The frontend runs on **`http://localhost:5173`** (Vite default).

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

### **Frontend:**

- **React** (Vite)
- **TypeScript**
- **Tailwind CSS**
- **ShadCN UI Components**
- **Axios** (for API calls)

### **Backend:**

- **Node.js** (Express)
- **Prisma ORM**
- **PostgreSQL**
- **CORS & dotenv**

---

```

```
