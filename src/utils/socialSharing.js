// src/utils/socialSharing.js
export function shareScore(score) {
    const shareText = `I just scored ${score} points in Guess What I'm Thinking! Can you beat my score?`;
    const shareUrl = 'https://yourwebsite.com/play'; // Replace with your actual game URL
  
    if (navigator.share) {
      navigator.share({
        title: 'My Game Score',
        text: shareText,
        url: shareUrl,
      }).then(() => {
        console.log('Thanks for sharing!');
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support the Web Share API
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
      window.open(twitterUrl, '_blank');
    }
  }