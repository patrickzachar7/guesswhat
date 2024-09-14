import dbConnect from '../../utils/dbConnect';
import Question from '../../models/Question';

export default async function handler(req, res) {
  try {
    await dbConnect();
    const count = await Question.countDocuments();
    res.status(200).json({ 
      status: 'Connected to database',
      questionCount: count
    });
  } catch (error) {
    res.status(500).json({ 
      status: 'Failed to connect to database',
      error: error.message
    });
  }
}