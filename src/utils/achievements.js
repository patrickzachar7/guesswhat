const achievements = [
  { id: 1, title: "First 10 Correct", description: "Answer 10 questions correctly", icon: "path/to/icon1.png" },
  { id: 2, title: "High Scorer", description: "Reach a score of 5000", icon: "path/to/icon2.png" },
  { id: 3, title: "Speed Demon", description: "Answer 5 questions in under 10 seconds each", icon: "path/to/icon3.png" },
  // Add more achievements as needed
];

export function checkAchievements(score, combo) {
  const unlockedAchievements = [];
  
  if (score >= 1000 && !localStorage.getItem('achievement_1')) {
    unlockedAchievements.push(achievements[0]);
    localStorage.setItem('achievement_1', 'true');
  }
  
  if (score >= 5000 && !localStorage.getItem('achievement_2')) {
    unlockedAchievements.push(achievements[1]);
    localStorage.setItem('achievement_2', 'true');
  }
  
  // Add more achievement checks as needed
  
  return unlockedAchievements;
}

export function getAchievements() {
  return achievements.map(achievement => ({
    ...achievement,
    unlocked: localStorage.getItem(`achievement_${achievement.id}`) === 'true'
  }));
}