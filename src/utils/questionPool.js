// src/utils/questionPool.js
let questionPool = [
    {
      id: 1,
      answer: "Inception",
      hints: [
        "This 2010 science fiction film was directed by Christopher Nolan.",
        "It features a team of thieves who enter people's dreams.",
        "Leonardo DiCaprio stars as the main character, Cobb.",
        "The movie is known for its complex plot and mind-bending visuals.",
      ],
    },
    {
      id: 2,
      answer: "The Shawshank Redemption",
      hints: [
        "This 1994 drama is based on a Stephen King novella.",
        "It's set in a prison and follows the story of Andy Dufresne.",
        "Morgan Freeman plays a character named Red.",
        "The film is often cited as one of the greatest movies ever made.",
      ],
    },
    // Add more movie questions here...
  ];
  
  const askedQuestions = new Set();
  
  export function getRandomQuestion() {
    const availableQuestions = questionPool.filter(q => !askedQuestions.has(q.id));
    if (availableQuestions.length === 0) {
      askedQuestions.clear(); // Reset if all questions have been asked
      return questionPool[Math.floor(Math.random() * questionPool.length)];
    }
    return availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  }
  
  export function markQuestionAsked(questionId) {
    askedQuestions.add(questionId);
  }