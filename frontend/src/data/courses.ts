export interface Topic {
  id: string;
  title: string;
  explanation: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string;
  topics: Topic[];
}

export const courses: Course[] = [
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
      { id: "os-1", title: "Process Management", explanation: "Processes vs threads, process states, PCB. Context switching and inter-process communication mechanisms." },
      { id: "os-2", title: "CPU Scheduling", explanation: "Algorithms to allocate CPU time: FCFS, SJF, Round Robin, Priority scheduling. Understand turnaround and waiting time." },
      { id: "os-3", title: "Memory Management", explanation: "Paging, segmentation, virtual memory. Page replacement algorithms: FIFO, LRU, Optimal. Thrashing and working sets." },
      { id: "os-4", title: "Deadlocks", explanation: "Conditions for deadlock, prevention, avoidance (Banker's algorithm), detection, and recovery strategies." },
      { id: "os-5", title: "File Systems", explanation: "File organization, directory structures, allocation methods (contiguous, linked, indexed). Disk scheduling algorithms." },
      { id: "os-6", title: "Synchronization", explanation: "Critical section problem, mutex, semaphores, monitors. Classic problems: producer-consumer, readers-writers, dining philosophers." },
    ],
  },
  {
    id: "cn",
    title: "Computer Networks",
    description: "Explore networking layers, protocols, routing, and security fundamentals.",
    icon: "🌐",
    topics: [
      { id: "cn-1", title: "OSI & TCP/IP Models", explanation: "Layered architecture for network communication. Seven OSI layers and four TCP/IP layers with their responsibilities." },
      { id: "cn-2", title: "Data Link Layer", explanation: "Framing, error detection (CRC), flow control (sliding window), MAC protocols (CSMA/CD, CSMA/CA)." },
      { id: "cn-3", title: "Network Layer & Routing", explanation: "IP addressing, subnetting, CIDR. Routing algorithms: distance vector (RIP), link state (OSPF), path vector (BGP)." },
      { id: "cn-4", title: "Transport Layer", explanation: "TCP vs UDP, three-way handshake, flow control, congestion control. Port numbers and multiplexing." },
      { id: "cn-5", title: "Application Layer Protocols", explanation: "HTTP/HTTPS, DNS, FTP, SMTP, DHCP. RESTful APIs and web socket communication." },
      { id: "cn-6", title: "Network Security", explanation: "Encryption (symmetric, asymmetric), digital signatures, SSL/TLS, firewalls, and common attack vectors." },
    ],
  },
];
