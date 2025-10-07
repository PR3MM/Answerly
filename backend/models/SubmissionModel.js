
import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Quiz',
    required: true,
  },
  userId: {
    type: String,  
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },

  results: [
    {
      questionText: String,
      userAnswerText: String,
      correctAnswerText: String,
      isCorrect: Boolean,
    },
  ],
}, {
  timestamps: true,
});

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;