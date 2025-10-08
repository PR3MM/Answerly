import { Router } from "express";
import quizzes from "../controllers/quizzes.js";
import submit from "../controllers/submitquiz.js"
import getQuiz from "../controllers/getQuiz.js"
import { getQuizHistory } from "../controllers/dashboard.js"
import getSampleQuiz from "../controllers/sampleQuiz.js"

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello from the API!");
});

// Health check endpoint for Render self-ping and monitoring
router.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
});


router.get('/dashboard/history', (req, res) => {
    getQuizHistory(req, res);
})

// Sample quiz route (must come before the dynamic :quizId route)
router.get("/quizzes/sample", (req, res) => {
    getSampleQuiz(req, res);
})

router.post("/quizzes", (req, res) => {
    quizzes(req, res);
})

router.get("/quizzes/:quizId", (req, res) => {
    getQuiz(req, res);
})

router.post("/quizzes/:quizId/submit", (req, res) => {
    submit(req, res);
})

export default router;
