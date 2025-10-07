import { Router } from "express";
import quizzes from "../controllers/quizzes.js";
import submit from "../controllers/submitquiz.js"
import getQuiz from "../controllers/getQuiz.js"
import { getQuizHistory } from "../controllers/dashboard.js"

const router = Router();

router.get("/", (req, res) => {
    res.send("Hello from the API!");
});


router.get('/dashboard/history', (req, res) => {
    getQuizHistory(req, res);
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
