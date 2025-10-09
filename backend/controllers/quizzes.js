import main from "../gemini/gemini.js";
import Quiz from '../models/quiz.js';

const quizzes = async (req, res) => {
    try {

    // req.auth may be set by an auth middleware (e.g., Clerk or custom). If it's missing,
    // fall back to an optional userId in the body (useful for testing) or null.
        const userId = (req.auth && req.auth.userId) || req.body?.userId || null;
        if (!userId) {
            console.warn('Unauthenticated request to create quiz: no userId available on req.auth or req.body')
            // return res.status(401).json({ error: 'Authentication required to create quiz' })
        }

        const { topic, count, difficulty, audience } = req.body;

        if (!topic || !count) {
            return res.status(400).json({ error: 'Topic and count are required.' });
        }

        const parameters = { topic, count, difficulty, audience };
        
        const rawAiResult = await main(parameters);

        let parsedResult;
        try {
            // Check if rawAiResult is already an object
            if (typeof rawAiResult === 'object' && rawAiResult !== null) {
                parsedResult = rawAiResult;
            } else {
                // If it's a string, try to clean and parse it
                const cleanedString = String(rawAiResult)
                    .trim()
                    .replace(/^```json\s*/, '')
                    .replace(/\s*```$/, '');

                parsedResult = JSON.parse(cleanedString);
            }
            
            // Validate that parsedResult has questions array
            if (!parsedResult.questions || !Array.isArray(parsedResult.questions)) {
                throw new Error('AI response missing questions array');
            }
        } catch (parseError) {
            console.error("Failed to parse JSON from AI:", parseError);
            console.error("Raw AI Response was:", rawAiResult);
            return res.status(500).json({ error: 'Failed to parse AI response.' });
        }


        const newQuiz = new Quiz({
            topic: topic,
            questions: parsedResult.questions,
            userId: userId
        });

        const savedQuiz = await newQuiz.save();

        const cleanedQuestions = savedQuiz.questions.map(q => ({
            _id: q._id,
            text: q.text,
            options: q.options
        }));

        return res.status(201).json({
            quizId: savedQuiz._id,
            questions: cleanedQuestions
        });

    } catch (err) {
        console.log("Error in quizzes controller:", err);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export default quizzes;