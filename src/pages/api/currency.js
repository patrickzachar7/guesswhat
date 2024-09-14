import dbConnect from '../../utils/dbConnect';
import User from '../../models/User';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'UserId is required' });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ currency: user.currency });
    } catch (error) {
      console.error('Error fetching currency:', error);
      res.status(500).json({ error: 'Error fetching currency' });
    }
  } else if (req.method === 'POST') {
    const { userId, amount } = req.body;

    if (!userId || amount === undefined) {
      return res.status(400).json({ error: 'UserId and amount are required' });
    }

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      user.currency += amount;
      await user.save();
      res.status(200).json({ currency: user.currency });
    } catch (error) {
      console.error('Error updating currency:', error);
      res.status(500).json({ error: 'Error updating currency' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}