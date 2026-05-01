const Result = require('../models/Result');
const User = require('../models/User');
const { generateRoadmap } = require('../utils/evaluation');

// Static courses for now
const courses = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    description: "Master arrays, trees, graphs, sorting, and dynamic programming to ace coding interviews.",
    icon: "🧮",
    topics: [
      { id: "dsa-1", title: "Arrays & Strings", explanation: "Fundamental data structures for storing sequential data. Learn traversal, manipulation, and common patterns like sliding window and two pointers." },
      { id: "dsa-2", title: "Linked Lists", explanation: "Dynamic data structures with nodes connected by pointers. Understand singly, doubly linked lists and operations like insertion, deletion, reversal." },
      { id: "dsa-3", title: "Stacks & Queues", explanation: "LIFO and FIFO structures used in expression evaluation, BFS, and system design like task schedulers." },
      { id: "dsa-4", title: "Trees & BST", explanation: "Hierarchical structures for efficient searching and sorting. Learn traversals (inorder, preorder, postorder) and balanced trees." },
      { id: "dsa-5", title: "Graphs", explanation: "Represent relationships between entities. Master BFS, DFS, shortest path algorithms (Dijkstra, Bellman-Ford), and topological sorting." },
      { id: "dsa-6", title: "Dynamic Programming", explanation: "Optimization technique breaking problems into overlapping subproblems. Key patterns: memoization, tabulation, knapsack, LCS." },
      { id: "dsa-7", title: "Sorting & Searching", explanation: "Comparison-based (merge, quick) and non-comparison (counting, radix) sorting. Binary search and its variations." },
    ],
  },
  {
    id: "dbms",
    title: "Database Management Systems",
    description: "Learn relational databases, SQL queries, normalization, and transaction management.",
    icon: "🗄️",
    topics: [
      { id: "dbms-1", title: "ER Model & Schema Design", explanation: "Entity-Relationship diagrams for modeling real-world data. Convert ER diagrams to relational schemas." },
      { id: "dbms-2", title: "SQL Fundamentals", explanation: "Structured Query Language for data manipulation. Master SELECT, JOIN, GROUP BY, subqueries, and aggregate functions." },
      { id: "dbms-3", title: "Normalization", explanation: "Process of organizing data to reduce redundancy. Understand 1NF, 2NF, 3NF, BCNF and functional dependencies." },
      { id: "dbms-4", title: "Transactions & Concurrency", explanation: "ACID properties ensure reliable transactions. Learn locking, deadlock handling, and isolation levels." },
      { id: "dbms-5", title: "Indexing & Hashing", explanation: "Techniques to speed up data retrieval. B+ trees, hash indexes, and query optimization strategies." },
      { id: "dbms-6", title: "NoSQL Basics", explanation: "Non-relational databases for flexible schemas. Document stores, key-value, column-family, and graph databases." },
    ],
  },
  {
    id: "os",
    title: "Operating Systems",
    description: "Understand process management, memory, file systems, and synchronization.",
    icon: "⚙️",
    topics: [
      { id: "os-1", title: "Processes & Threads", explanation: "Fundamental units of execution. Learn process states, context switching, multithreading, and scheduling algorithms." },
      { id: "os-2", title: "Memory Management", explanation: "Virtual memory, paging, segmentation, and page replacement algorithms (FIFO, LRU, Optimal)." },
      { id: "os-3", title: "File Systems", explanation: "Organization of data on storage devices. Inodes, directories, file allocation methods, and journaling." },
      { id: "os-4", title: "Synchronization", explanation: "Coordination of concurrent processes. Mutexes, semaphores, monitors, and deadlock prevention." },
      { id: "os-5", title: "I/O & Storage", explanation: "Device drivers, buffering, RAID levels, and disk scheduling algorithms." },
      { id: "os-6", title: "System Calls", explanation: "Interface between user programs and OS kernel. Process control, file operations, and communication." },
    ],
  },
];

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get user's quiz results
    const results = await Result.find({ userId }).sort({ createdAt: -1 });

    // Calculate latest scores per course
    const latestScores = {};
    results.forEach(result => {
      if (!latestScores[result.courseId] || result.createdAt > latestScores[result.courseId].createdAt) {
        latestScores[result.courseId] = {
          score: result.score,
          createdAt: result.createdAt,
        };
      }
    });

    // Aggregate roadmap
    const allTopicScores = {};
    results.forEach(result => {
      for (const [topic, score] of result.topicScores) {
        if (!allTopicScores[topic] || score > allTopicScores[topic]) {
          allTopicScores[topic] = score;
        }
      }
    });
    const roadmapSummary = generateRoadmap(allTopicScores);

    // Calculate stats
    const totalTopics = courses.reduce((sum, c) => sum + c.topics.length, 0);
    const quizzesTaken = Object.keys(latestScores).length;
    // For simplicity, assume progress based on quizzes taken, but actually need topic completion tracking
    // For now, mock progress
    const overallProgress = (quizzesTaken / courses.length) * 100;
    const topicsCompleted = Math.round((overallProgress / 100) * totalTopics);

    res.json({
      enrolledCourses: courses,
      completedQuizzes: results.length,
      latestScores,
      roadmapSummary,
      stats: {
        overallProgress,
        topicsCompleted,
        quizzesTaken,
      },
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};