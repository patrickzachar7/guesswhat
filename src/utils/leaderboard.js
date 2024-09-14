// src/utils/leaderboard.js
export function addScore(score) {
  const leaderboard = JSON.parse(localStorage.getItem('leaderboard') || '[]');
  leaderboard.push({ name: 'Player', score });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem('leaderboard', JSON.stringify(leaderboard.slice(0, 10)));
}

export function getLocalLeaderboard() {
  return JSON.parse(localStorage.getItem('leaderboard') || '[]');
}

export async function getGlobalLeaderboard() {
  try {
    const response = await fetch('/api/leaderboard');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching global leaderboard:', error);
    return [];
  }
}