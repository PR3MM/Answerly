import mongoose from 'mongoose';

const optionSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
}, { _id: false });
 
const questionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  options: [optionSchema],  
  correct_option_id: {
    type: Number,  
    required: true,
  },
});
 
const quizSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
  },
  questions: [questionSchema],

  userId: {
    type: String,
    required: true
  }
}, {
  timestamps: true  
});

const Quiz = mongoose.model('Quiz', quizSchema);

export default Quiz;