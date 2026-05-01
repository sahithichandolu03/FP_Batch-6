export interface QuizQuestion {
  id: string;
  courseId: string;
  topicId: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export const quizzes: Record<string, QuizQuestion[]> = {
  dsa: [
    { id: "q1", courseId: "dsa", topicId: "dsa-1", question: "What is the time complexity of accessing an element in an array by index?", options: ["O(n)", "O(1)", "O(log n)", "O(n²)"], correctAnswer: 1 },
    { id: "q2", courseId: "dsa", topicId: "dsa-2", question: "Which operation is O(1) in a linked list?", options: ["Accessing middle element", "Insertion at head", "Binary search", "Sorting"], correctAnswer: 1 },
    { id: "q3", courseId: "dsa", topicId: "dsa-3", question: "Which data structure uses FIFO ordering?", options: ["Stack", "Queue", "Tree", "Graph"], correctAnswer: 1 },
    { id: "q4", courseId: "dsa", topicId: "dsa-4", question: "In a Binary Search Tree, the left child is always:", options: ["Greater than parent", "Less than parent", "Equal to parent", "Random"], correctAnswer: 1 },
    { id: "q5", courseId: "dsa", topicId: "dsa-5", question: "BFS uses which data structure?", options: ["Stack", "Queue", "Heap", "Array"], correctAnswer: 1 },
    { id: "q6", courseId: "dsa", topicId: "dsa-6", question: "Dynamic programming is based on:", options: ["Divide and conquer only", "Greedy approach", "Optimal substructure & overlapping subproblems", "Brute force"], correctAnswer: 2 },
    { id: "q7", courseId: "dsa", topicId: "dsa-7", question: "What is the best-case time complexity of Quick Sort?", options: ["O(n²)", "O(n log n)", "O(n)", "O(log n)"], correctAnswer: 1 },
    { id: "q8", courseId: "dsa", topicId: "dsa-1", question: "The sliding window technique is commonly used for:", options: ["Graph traversal", "Subarray problems", "Tree balancing", "Sorting"], correctAnswer: 1 },
    { id: "q9", courseId: "dsa", topicId: "dsa-4", question: "Inorder traversal of a BST gives:", options: ["Random order", "Sorted ascending order", "Sorted descending order", "Level order"], correctAnswer: 1 },
    { id: "q10", courseId: "dsa", topicId: "dsa-6", question: "The Fibonacci sequence is a classic example of:", options: ["Greedy algorithm", "Dynamic programming", "Graph algorithm", "Sorting algorithm"], correctAnswer: 1 },
  ],
  dbms: [
    { id: "q1", courseId: "dbms", topicId: "dbms-1", question: "An ER diagram represents:", options: ["Code flow", "Data relationships", "Memory allocation", "CPU scheduling"], correctAnswer: 1 },
    { id: "q2", courseId: "dbms", topicId: "dbms-2", question: "Which SQL keyword is used to filter groups?", options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"], correctAnswer: 1 },
    { id: "q3", courseId: "dbms", topicId: "dbms-3", question: "A table in 3NF must first be in:", options: ["BCNF", "2NF", "4NF", "5NF"], correctAnswer: 1 },
    { id: "q4", courseId: "dbms", topicId: "dbms-4", question: "ACID stands for:", options: ["Atomicity, Consistency, Isolation, Durability", "Access, Control, Index, Data", "Aggregate, Count, Insert, Delete", "None"], correctAnswer: 0 },
    { id: "q5", courseId: "dbms", topicId: "dbms-5", question: "B+ tree is primarily used for:", options: ["Sorting", "Indexing", "Hashing", "Encryption"], correctAnswer: 1 },
    { id: "q6", courseId: "dbms", topicId: "dbms-6", question: "MongoDB is an example of:", options: ["Relational DB", "Document DB", "Graph DB", "Key-value DB"], correctAnswer: 1 },
    { id: "q7", courseId: "dbms", topicId: "dbms-2", question: "JOIN combines rows from:", options: ["One table", "Two or more tables", "Only views", "Indexes"], correctAnswer: 1 },
    { id: "q8", courseId: "dbms", topicId: "dbms-3", question: "Normalization reduces:", options: ["Query speed", "Data redundancy", "Table count", "Index size"], correctAnswer: 1 },
  ],
  os: [
    { id: "q1", courseId: "os", topicId: "os-1", question: "A process in 'ready' state is waiting for:", options: ["I/O", "CPU", "Memory", "Disk"], correctAnswer: 1 },
    { id: "q2", courseId: "os", topicId: "os-2", question: "Round Robin scheduling uses:", options: ["Priority", "Time quantum", "Burst time", "Arrival time only"], correctAnswer: 1 },
    { id: "q3", courseId: "os", topicId: "os-3", question: "Page replacement is needed when:", options: ["CPU is idle", "Page fault occurs with full memory", "Process terminates", "I/O completes"], correctAnswer: 1 },
    { id: "q4", courseId: "os", topicId: "os-4", question: "Banker's algorithm is used for:", options: ["Deadlock detection", "Deadlock avoidance", "Deadlock prevention", "Deadlock recovery"], correctAnswer: 1 },
    { id: "q5", courseId: "os", topicId: "os-5", question: "Contiguous allocation suffers from:", options: ["Internal fragmentation", "External fragmentation", "Both", "Neither"], correctAnswer: 2 },
    { id: "q6", courseId: "os", topicId: "os-6", question: "A semaphore with value 1 is called:", options: ["Counting semaphore", "Binary semaphore / mutex", "Monitor", "Spinlock"], correctAnswer: 1 },
    { id: "q7", courseId: "os", topicId: "os-1", question: "Threads share everything except:", options: ["Code section", "Data section", "Stack", "Heap"], correctAnswer: 2 },
    { id: "q8", courseId: "os", topicId: "os-3", question: "LRU stands for:", options: ["Last Recently Used", "Least Recently Used", "Least Required Utility", "Last Required Update"], correctAnswer: 1 },
  ],
  cn: [
    { id: "q1", courseId: "cn", topicId: "cn-1", question: "How many layers does the OSI model have?", options: ["4", "5", "7", "6"], correctAnswer: 2 },
    { id: "q2", courseId: "cn", topicId: "cn-2", question: "CRC is used for:", options: ["Routing", "Error detection", "Encryption", "Compression"], correctAnswer: 1 },
    { id: "q3", courseId: "cn", topicId: "cn-3", question: "CIDR stands for:", options: ["Classful Inter-Domain Routing", "Classless Inter-Domain Routing", "Central IP Data Routing", "Common Internet Data Resource"], correctAnswer: 1 },
    { id: "q4", courseId: "cn", topicId: "cn-4", question: "TCP uses a ___ handshake:", options: ["Two-way", "Three-way", "Four-way", "One-way"], correctAnswer: 1 },
    { id: "q5", courseId: "cn", topicId: "cn-5", question: "DNS resolves:", options: ["IP to MAC", "Domain to IP", "Port to IP", "MAC to IP"], correctAnswer: 1 },
    { id: "q6", courseId: "cn", topicId: "cn-6", question: "SSL/TLS operates at which layer?", options: ["Network", "Transport", "Between Transport and Application", "Data Link"], correctAnswer: 2 },
    { id: "q7", courseId: "cn", topicId: "cn-4", question: "UDP is:", options: ["Connection-oriented", "Connectionless", "Reliable", "Ordered"], correctAnswer: 1 },
    { id: "q8", courseId: "cn", topicId: "cn-3", question: "Subnetting divides a network into:", options: ["Larger networks", "Smaller subnetworks", "Virtual LANs only", "None"], correctAnswer: 1 },
  ],
};
