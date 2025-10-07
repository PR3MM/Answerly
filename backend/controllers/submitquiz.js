import Quiz from '../models/quiz.js';
import Submission from '../models/SubmissionModel.js';  

const submit = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body;
    const userId = (req.auth && req.auth.userId) || req.body?.userId || null;
    
    // Check if the quiz exists and if it's a sample quiz
    const correctQuiz = await Quiz.findById(quizId);
    if (!correctQuiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const isSampleQuiz = correctQuiz.userId === 'system';
    
    // Allow guest submissions only for sample quizzes
    if (!userId && !isSampleQuiz) {
      console.warn('Unauthenticated request to submit quiz: no userId available on req.auth or req.body')
      return res.status(401).json({ error: 'Authentication required to submit quiz' })
    }

    if (!answers || Object.keys(answers).length === 0) {
      return res.status(400).json({ error: 'Answers are required.' });
    }

    let score = 0;
    const results = [];

    correctQuiz.questions.forEach((question) => {
      const questionId = question._id.toString();
      const correctAnswerId = question.correct_option_id;
      const userAnswerId = answers[questionId] ? parseInt(answers[questionId]) : null;

      const isCorrect = userAnswerId === correctAnswerId;
      if (isCorrect) {
        score++;
      }

      const findOptionText = (optionId) => {
        const option = question.options.find((opt) => opt.id === optionId);
        return option ? option.text : 'Not Answered';
      };

      results.push({
        questionText: question.text,
        userAnswerText: findOptionText(userAnswerId),
        correctAnswerText: findOptionText(correctAnswerId),
        isCorrect: isCorrect,
      });
    });

    // Create and save the submission record only for authenticated users
    if (userId && userId !== 'guest') {
      const newSubmission = new Submission({
        quizId,
        userId,
        score,
        total: correctQuiz.questions.length,
        results,
      });
      await newSubmission.save();
    }

    return res.status(200).json({
      message: 'Quiz submitted successfully!',
      score: score,
      total: correctQuiz.questions.length,
      results: results,
    });
  } catch (err) {
    console.error('Error submitting quiz:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default submit;