import dbConnect from '../../utils/dbConnect';
import Question from '../../models/Question';
import { questions } from '../../utils/questionManager';

export default async function handler(req, res) {
  console.log('Attempting to connect to the database...');
  try {
    await dbConnect();
    console.log('Successfully connected to the database');

    const count = await Question.countDocuments();
    console.log(`Number of questions in the database: ${count}`);

    let randomQuestion;

    if (count === 0) {
      console.log('No questions in the database, using questionManager');
      const categories = Object.keys(questions);
      const randomCategory = categories[Math.floor(Math.random() * categories.length)];
      randomQuestion = questions[randomCategory][Math.floor(Math.random() * questions[randomCategory].length)];
      randomQuestion = {
        _id: randomQuestion.id,
        hints: randomQuestion.hints,
        category: randomCategory,
        difficulty: 'medium'
      };
    } else {
      const random = Math.floor(Math.random() * count);
      randomQuestion = await Question.findOne().skip(random);
    }

    if (!randomQuestion) {
      console.log('No random question found');
      return res.status(404).json({ error: 'No questions found' });
    }

    const { answer, ...questionWithoutAnswer } = randomQuestion.toObject ? randomQuestion.toObject() : randomQuestion;

    res.status(200).json(questionWithoutAnswer);
  } catch (error) {
    console.error('Error in random-question handler:', error);
    res.status(500).json({ error: 'Error fetching random question', details: error.message });
  }
}