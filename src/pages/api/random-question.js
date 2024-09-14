// src/pages/api/random-question.js

import dbConnect from '../../utils/dbConnect';
import Question from '../../models/Question';
import { questions } from '../../utils/questionManager';

let askedQuestions = new Set();

// Reset asked questions every 24 hours
setInterval(() => {
  askedQuestions.clear();
}, 24 * 60 * 60 * 1000);

export default async function handler(req, res) {
  console.log('Attempting to connect to the database...');
  try {
    await dbConnect();
    console.log('Successfully connected to the database');

    const count = await Question.countDocuments();
    console.log(`Number of questions in the database: ${count}`);

    if (askedQuestions.size >= count && count > 0) {
      return res.status(200).json({ gameCompleted: true, totalQuestions: count });
    }

    let randomQuestion;
    let attempts = 0;
    const maxAttempts = count > 0 ? count * 2 : 10; // Avoid infinite loop

    do {
      attempts++;
      if (count === 0) {
        console.log('No questions in the database, using questionManager');
        const categories = Object.keys(questions);
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        const categoryQuestions = questions[randomCategory];
        const randomIndex = Math.floor(Math.random() * categoryQuestions.length);
        const selectedQuestion = categoryQuestions[randomIndex];

        randomQuestion = {
          _id: selectedQuestion.id,
          hints: selectedQuestion.hints,
          category: randomCategory,
          difficulty: selectedQuestion.difficulty || 'medium',
        };
      } else {
        const random = Math.floor(Math.random() * count);
        const candidateQuestion = await Question.findOne().skip(random).lean();
        if (!askedQuestions.has(candidateQuestion._id.toString())) {
          randomQuestion = candidateQuestion;
        }
      }
    } while (!randomQuestion && attempts < maxAttempts);

    if (attempts >= maxAttempts) {
      return res.status(200).json({ gameCompleted: true, totalQuestions: count });
    }

    if (!randomQuestion) {
      console.log('No random question found after maximum attempts');
      return res.status(404).json({ error: 'No questions found' });
    }

    // Remove the 'answer' field before adding to askedQuestions and sending
    const { answer, ...questionWithoutAnswer } = randomQuestion;
    askedQuestions.add(randomQuestion._id.toString());

    console.log('Sending question without answer:', questionWithoutAnswer);

    res.status(200).json(questionWithoutAnswer);
  } catch (error) {
    console.error('Error in random-question handler:', error);
    res.status(500).json({ error: 'Error fetching random question' });
  }
}