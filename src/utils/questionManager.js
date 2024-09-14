const questions = {
  movies: [
    {
      id: 'movies_1',
      answer: "Inception",
      answerId: 27205, // TMDb ID for Inception
      hints: [
        "Released in 2010",
        "Directed by Christopher Nolan",
        "Stars Leonardo DiCaprio",
        "Involves dreams within dreams",
        "Features a spinning top",
        "Explores the concept of shared dreaming",
        "Has a character named Cobb",
        "Includes the line 'You mustn't be afraid to dream a little bigger, darling'",
        "The team uses a 'kick' to wake up",
        "The ending is ambiguous"
      ]
    },
    {
      id: 'movies_2',
      answer: "The Shawshank Redemption",
      hints: [
        "Released in 1994",
        "Based on a Stephen King novella",
        "Set in a prison",
        "Features Morgan Freeman as a narrator",
        "The main character is wrongfully convicted",
        "Involves a poster of Rita Hayworth",
        "Friendship is a central theme",
        "Includes a famous scene with opera music",
        "The protagonist's name is Andy Dufresne",
        "Ends with a reunion on a beach"
      ]
    },
    // Add more movie questions here
  ],
  music: [
    // Add music questions here with unique ids
  ],
  sports: [
    // Add sports questions here with unique ids
  ],
  pop: [
    // Add pop culture questions here with unique ids
  ]
};

export function getRandomQuestion(category) {
  const categoryQuestions = questions[category.toLowerCase()];
  if (!categoryQuestions || categoryQuestions.length === 0) {
    throw new Error(`No questions available for category: ${category}`);
  }
  return categoryQuestions[Math.floor(Math.random() * categoryQuestions.length)];
}

export function getAllQuestionIds(category) {
  return questions[category.toLowerCase()].map(q => q.id);
}