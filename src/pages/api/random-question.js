import dbConnect from '../../utils/dbConnect';
import Question from '../../models/Question';
import { questions } from '../../utils/questionManager';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const count = await Question.countDocuments();
    let randomQuestion;

    if (count === 0) {
      // If no questions in the database, return a random question from questionManager
      const categories = Object.keys(questions);
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      randomQuestion = questions[randomCategory][Math.floor(Math.random() * questions[randomCategory].length)];
      randomQuestion = {
        _id: randomQuestion.id,
        hints: randomQuestion.hints,
        category: randomCategory,
        difficulty: 'medium' // You can adjust this as needed
      };
    } else {
      const random = Math.floor(Math.random() * count);
      randomQuestion = await Question.findOne().skip(random);
    }

    if (!randomQuestion) {
      return res.status(404).json({ error: 'No questions found' });
    }

    // Remove the answer from the response
    const { answer, ...questionWithoutAnswer } = randomQuestion.toObject ? randomQuestion.toObject() : randomQuestion;

    res.status(200).json(questionWithoutAnswer);
  } catch (error) {
    console.error('Error fetching random question:', error);
    res.status(500).json({ error: 'Error fetching random question' });
  }
}