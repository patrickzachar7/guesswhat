import dbConnect from '../../utils/dbConnect';
import Question from '../../models/Question';

export default async function handler(req, res) {
  try {
    console.log('Attempting to connect to the database...');
    await dbConnect();
    console.log('Successfully connected to the database');
    const count = await Question.countDocuments();
    console.log(`Number of questions in the database: ${count}`);
    res.status(200).json({ 
      status: 'Connected to database',
      questionCount: count
    });
  } catch (error) {
    console.error('Error in db-status handler:', error);
    res.status(500).json({ 
      status: 'Failed to connect to database',
      error: error.message,
      stack: error.stack
    });
  }
}