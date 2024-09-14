import dbConnect from '../../utils/dbConnect';
import Score from '../../models/Score';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const scores = await Score.find().sort({ score: -1 }).limit(10);
      res.status(200).json(scores);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ error: 'Error fetching leaderboard' });
    }
  } else if (req.method === 'POST') {
    const { username, score } = req.body;

    if (!username || !score) {
      return res.status(400).json({ error: 'Username and score are required' });
    }

    try {
      const newScore = new Score({ username, score });
      await newScore.save();
      res.status(201).json(newScore);
    } catch (error) {
      console.error('Error adding score:', error);
      res.status(500).json({ error: 'Error adding score' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}