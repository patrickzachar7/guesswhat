export const getUsedQuestions = (category) => {
    const key = `usedQuestions_${category}`;
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error retrieving used questions:', error);
      return [];
    }
  };
  
  export const addUsedQuestion = (category, questionId) => {
    const usedQuestions = getUsedQuestions(category);
    usedQuestions.push(questionId);
    const key = `usedQuestions_${category}`;
    try {
      localStorage.setItem(key, JSON.stringify(usedQuestions));
    } catch (error) {
      console.error('Error saving used question:', error);
    }
  };
  
  export const resetUsedQuestions = (category) => {
    const key = `usedQuestions_${category}`;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error resetting used questions:', error);
    }
  };