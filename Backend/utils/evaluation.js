// Evaluation utilities

// Calculate total score and topic scores
function calculateScores(questions, answers) {
  const questionMap = {};
  questions.forEach(q => {
    questionMap[q.id] = q;
  });

  let totalCorrect = 0;
  const topicCorrect = {};
  const topicTotal = {};

  answers.forEach(answer => {
    const question = questionMap[answer.questionId];
    if (question) {
      const topic = question.topicId;
      if (!topicTotal[topic]) {
        topicTotal[topic] = 0;
        topicCorrect[topic] = 0;
      }
      topicTotal[topic]++;
      if (answer.selectedOption === question.correctAnswer) {
        totalCorrect++;
        topicCorrect[topic]++;
      }
    }
  });

  const totalScore = (totalCorrect / answers.length) * 100;
  const topicScores = {};
  for (const topic in topicTotal) {
    topicScores[topic] = (topicCorrect[topic] / topicTotal[topic]) * 100;
  }

  return { totalScore, topicScores };
}

// Generate roadmap based on topic scores
function generateRoadmap(topicScores) {
  const roadmap = {
    high: [],
    medium: [],
    low: [],
  };

  for (const topic in topicScores) {
    const score = topicScores[topic];
    if (score < 40) {
      roadmap.high.push(topic);
    } else if (score >= 40 && score <= 70) {
      roadmap.medium.push(topic);
    } else {
      roadmap.low.push(topic);
    }
  }

  return roadmap;
}

module.exports = {
  calculateScores,
  generateRoadmap,
};