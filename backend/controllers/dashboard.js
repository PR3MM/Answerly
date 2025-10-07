import Quiz from '../models/quiz.js';

const getQuizHistory = async (req, res) => {
    try {
        // Get userId from req.auth or req.body or query params
        const userId = (req.auth && req.auth.userId) || req.body?.userId || req.query?.userId || null;

        if (!userId) {
            console.warn('Unauthenticated request to dashboard: no userId available')
            return res.status(401).json({ error: 'User not authenticated.' });
        }

        const quizzes = await Quiz.find({ userId: userId }).sort({ createdAt: -1 });


        const quizHistory = quizzes.map(quiz => ({
            quizId: quiz._id,
            topic: quiz.topic,
            questionCount: quiz.questions.length,
            createdAt: quiz.createdAt
        }));

        return res.status(200).json(quizHistory);

    } catch (err) {
        console.error("Error fetching quiz history:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }
};

export { getQuizHistory };