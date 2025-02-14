import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const STATIC_USER = { username: "teacher", password: "password123" };
let STATIC_USER_ID: string;

// Initialize static user
async function initializeStaticUser() {
  try {
    // Check if static user exists
    let user = await prisma.user.findUnique({
      where: { username: STATIC_USER.username },
    });

    // If not, create it
    if (!user) {
      user = await prisma.user.create({
        data: {
          username: STATIC_USER.username,
          password: STATIC_USER.password,
        },
      });
      console.log("Static user created");
    }

    STATIC_USER_ID = user.id;
    console.log("Static user ID:", STATIC_USER_ID);
  } catch (error) {
    console.error("Failed to initialize static user:", error);
    process.exit(1); // Exit if we can't initialize the static user
  }
}

// Authentication
app.post("/login", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (username === STATIC_USER.username && password === STATIC_USER.password) {
    res.json({ success: true, userId: STATIC_USER_ID });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Get all quizzes
app.get("/quizzes", async (req: Request, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      where: { userId: STATIC_USER_ID },
      orderBy: { createdAt: "desc" },
    });
    res.json(quizzes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch quizzes" });
  }
});

// Create quiz
app.post("/quizzes", async (req: Request, res: Response) => {
  try {
    const { title, description } = req.body;
    const quiz = await prisma.quiz.create({
      data: {
        title,
        description,
        userId: STATIC_USER_ID, // Using the stored static user ID
      },
    });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Failed to create quiz" });
  }
});

// Update quiz
app.put("/quizzes/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const quiz = await prisma.quiz.update({
      where: {
        id,
        userId: STATIC_USER_ID, // Ensure the quiz belongs to the static user
      },
      data: { title, description },
    });
    res.json(quiz);
  } catch (error) {
    res.status(500).json({ error: "Failed to update quiz" });
  }
});

// Delete quiz
app.delete("/quizzes/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.quiz.delete({
      where: {
        id,
        userId: STATIC_USER_ID, // Ensure the quiz belongs to the static user
      },
    });
    res.json({ message: "Quiz deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete quiz" });
  }
});

// Initialize static user and start server
initializeStaticUser().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  });
});
