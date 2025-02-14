"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const PORT = process.env.PORT || 5000;
const STATIC_USER = { username: "teacher", password: "password123" };
let STATIC_USER_ID;
// Initialize static user
function initializeStaticUser() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Check if static user exists
            let user = yield prisma.user.findUnique({
                where: { username: STATIC_USER.username },
            });
            // If not, create it
            if (!user) {
                user = yield prisma.user.create({
                    data: {
                        username: STATIC_USER.username,
                        password: STATIC_USER.password,
                    },
                });
                console.log("Static user created");
            }
            STATIC_USER_ID = user.id;
            console.log("Static user ID:", STATIC_USER_ID);
        }
        catch (error) {
            console.error("Failed to initialize static user:", error);
            process.exit(1); // Exit if we can't initialize the static user
        }
    });
}
// Authentication
app.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (username === STATIC_USER.username && password === STATIC_USER.password) {
        res.json({ success: true, userId: STATIC_USER_ID });
    }
    else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
}));
// Get all quizzes
app.get("/quizzes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const quizzes = yield prisma.quiz.findMany({
            where: { userId: STATIC_USER_ID },
            orderBy: { createdAt: "desc" },
        });
        res.json(quizzes);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to fetch quizzes" });
    }
}));
// Create quiz
app.post("/quizzes", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const quiz = yield prisma.quiz.create({
            data: {
                title,
                description,
                userId: STATIC_USER_ID, // Using the stored static user ID
            },
        });
        res.json(quiz);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to create quiz" });
    }
}));
// Update quiz
app.put("/quizzes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const quiz = yield prisma.quiz.update({
            where: {
                id,
                userId: STATIC_USER_ID, // Ensure the quiz belongs to the static user
            },
            data: { title, description },
        });
        res.json(quiz);
    }
    catch (error) {
        res.status(500).json({ error: "Failed to update quiz" });
    }
}));
// Delete quiz
app.delete("/quizzes/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield prisma.quiz.delete({
            where: {
                id,
                userId: STATIC_USER_ID, // Ensure the quiz belongs to the static user
            },
        });
        res.json({ message: "Quiz deleted" });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to delete quiz" });
    }
}));
// Initialize static user and start server
initializeStaticUser().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
});
