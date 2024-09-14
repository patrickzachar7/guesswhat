// src/pages/api/random-question.js

import dbConnect from '../../utils/dbConnect';
import Question from '../../models/Question';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID library
import cookie from 'cookie'; // For cookie parsing and serialization

export default async function handler(req, res) {
  try {
    await dbConnect();

    // Parse cookies from the request headers
    const cookies = cookie.parse(req.headers.cookie || '');

    // Generate or retrieve the user ID
    let userId = cookies.userId || generateAnonymousUserId(res);

    // Retrieve user's asked question IDs from cookies
    let askedQuestionIds = cookies.askedQuestionIds ? JSON.parse(cookies.askedQuestionIds) : [];

    // Check if all questions have been asked
    const totalQuestions = await Question.countDocuments();

    if (askedQuestionIds.length >= totalQuestions) {
      return res.status(200).json({ gameCompleted: true, totalQuestions });
    }

    // Fetch a random question the user hasn't seen
    const [randomQuestion] = await Question.aggregate([
      { $match: { _id: { $nin: askedQuestionIds } } },
      { $sample: { size: 1 } },
      { $project: { answer: 0 } }, // Exclude the 'answer' field
    ]);

    if (!randomQuestion) {
      return res.status(200).json({ gameCompleted: true, totalQuestions });
    }

    // Add the question ID to the user's asked questions
    askedQuestionIds.push(randomQuestion._id);

    // Serialize cookies
    res.setHeader('Set-Cookie', [
      cookie.serialize('userId', userId, {
        maxAge: 24 * 60 * 60, // 1 day in seconds
        httpOnly: true,
        path: '/',
      }),
      cookie.serialize('askedQuestionIds', JSON.stringify(askedQuestionIds), {
        maxAge: 24 * 60 * 60, // 1 day in seconds
        httpOnly: true,
        path: '/',
      }),
    ]);

    res.status(200).json(randomQuestion);
  } catch (error) {
    console.error('Error in random-question handler:', error);
    res.status(500).json({ error: 'Error fetching random question' });
  }
}

// Helper function to generate a user ID for anonymous users
function generateAnonymousUserId(res) {
  const userId = uuidv4(); // Generate a unique ID
  // Set cookie with userId
  res.setHeader('Set-Cookie', cookie.serialize('userId', userId, {
    maxAge: 24 * 60 * 60, // 1 day in seconds
    httpOnly: true,
    path: '/',
  }));
  return userId;
}