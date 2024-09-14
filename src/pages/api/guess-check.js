import dbConnect from '../../utils/dbConnect';
import Question from '../../models/Question';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { questionId, guess } = req.body;

  if (!questionId || !guess) {
    return res.status(400).json({ error: 'questionId and guess are required' });
  }

  try {
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    const correct = question.answer.toLowerCase().trim() === guess.toLowerCase().trim();

    res.status(200).json({ correct });
  } catch (error) {
    console.error('Error processing guess:', error);
    res.status(500).json({ error: 'Error processing guess' });
  }
}