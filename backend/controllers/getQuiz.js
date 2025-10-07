import Quiz from '../models/quiz.js';

const getQuiz = async (req, res) => {
    try {
        const { quizId } = req.params;

        const quiz = await Quiz.findById(quizId);
        
        if (!quiz) {
            return res.status(404).json({ error: 'Quiz not found' });
        }

        // Return quiz with questions (without correct answers for security)
        const cleanedQuestions = quiz.questions.map(q => ({
            _id: q._id,
            text: q.text,
            options: q.options
            // Note: we don't send correct_option_id to prevent cheating
        }));

        return res.status(200).json({
            quizId: quiz._id,
            topic: quiz.topic,
            questions: cleanedQuestions,
            createdAt: quiz.createdAt
        });

    } catch (err) {
        console.error("Error fetching quiz:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export default getQuiz;
