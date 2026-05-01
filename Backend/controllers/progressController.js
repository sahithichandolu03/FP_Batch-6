const Progress = require('../models/Progress');

exports.saveProgress = async (req, res) => {
  try {
    const { courseId, completedTopics, score, roadmap } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!courseId) {
      return res.status(400).json({ message: 'Course ID is required' });
    }

    // Find and update or create new progress
    const progress = await Progress.findOneAndUpdate(
      { userId, courseId },
      {
        userId,
        courseId,
        completedTopics: completedTopics || [],
        score: score || 0,
        roadmap: roadmap || {},
      },
      { new: true, upsert: true }
    );

    res.json({
      message: 'Progress saved successfully',
      progress,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getProgress = async (req, res) => {
  try {
    const userId = req.user.id;

    // Fetch all progress for the user
    const progress = await Progress.find({ userId }).sort({ createdAt: -1 });

    res.json({
      message: 'Progress fetched successfully',
      progress,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};
