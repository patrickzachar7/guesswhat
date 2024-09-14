import mongoose from 'mongoose';

const QuestionSchema = new mongoose.Schema({
  hints: [String],
  answer: String,
  difficulty: String,
  category: String,
});

export default mongoose.models.Question || mongoose.model('Question', QuestionSchema);