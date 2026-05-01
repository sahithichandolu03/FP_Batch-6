import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import api from "@/lib/api";
import { toast } from "sonner";

interface User {
  name: string;
  email: string;
}

interface TopicProgress {
  [topicId: string]: boolean;
}

interface CourseProgress {
  [courseId: string]: TopicProgress;
}

interface QuizResult {
  courseId: string;
  answers: Record<string, number>;
  score: number;
  total: number;
  topicScores: Record<string, { correct: number; total: number }>;
}

interface AppContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  progress: CourseProgress;
  toggleTopicComplete: (courseId: string, topicId: string) => void;
  getCompletedCount: (courseId: string, totalTopics: number) => number;
  quizResults: Record<string, QuizResult>;
  saveQuizResult: (result: QuizResult) => void;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<CourseProgress>({});
  const [quizResults, setQuizResults] = useState<Record<string, QuizResult>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Get user info
      api.get('/user/me')
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          // Token invalid, remove it
          localStorage.removeItem('token');
        });
      
      // Load saved progress
      api.get('/progress')
        .then(response => {
          const progressList = response.data.progress || [];
          
          // Convert progress array to CourseProgress format
          const courseProgress: CourseProgress = {};
          const quizzes: Record<string, QuizResult> = {};
          
          progressList.forEach((item: any) => {
            const courseId = item.courseId;
            
            if (!courseProgress[courseId]) {
              courseProgress[courseId] = {};
            }
            
            // Mark completed topics
            item.completedTopics?.forEach((topicId: string) => {
              courseProgress[courseId][topicId] = true;
            });
            
            // Store quiz results if roadmap contains topic scores
            if (item.roadmap && Object.keys(item.roadmap).length > 0) {
              quizzes[courseId] = {
                courseId,
                answers: {},
                score: item.score || 0,
                total: 0,
                topicScores: item.roadmap,
              };
            }
          });
          
          setProgress(courseProgress);
          if (Object.keys(quizzes).length > 0) {
            setQuizResults(quizzes);
          }
        })
        .catch((error) => {
          console.error('Failed to load progress:', error);
        });
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user: userData } = response.data;
      localStorage.setItem('token', token);
      setUser(userData);
      toast.success('Login successful!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      await api.post('/auth/register', { name, email, password });
      toast.success('Account created successfully! Please log in.');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setProgress({});
    setQuizResults({});
  };

  const toggleTopicComplete = (courseId: string, topicId: string) => {
    setProgress((prev) => {
      const updated = {
        ...prev,
        [courseId]: {
          ...prev[courseId],
          [topicId]: !prev[courseId]?.[topicId],
        },
      };
      
      // Get completed topics
      const completedTopics = Object.keys(updated[courseId] || {})
        .filter(id => updated[courseId][id]);
      
      // Save progress to backend
      api.post('/progress/save', {
        courseId,
        completedTopics,
        score: 0,
        roadmap: {},
      }).catch((error) => {
        console.error('Failed to save progress:', error);
      });
      
      return updated;
    });
  };

  const getCompletedCount = (courseId: string, totalTopics: number) => {
    const cp = progress[courseId];
    if (!cp) return 0;
    return Object.values(cp).filter(Boolean).length;
  };

  const saveQuizResult = (result: QuizResult) => {
    setQuizResults((prev) => ({ ...prev, [result.courseId]: result }));
  };

  return (
    <AppContext.Provider value={{ user, login, signup, logout, progress, toggleTopicComplete, getCompletedCount, quizResults, saveQuizResult, isLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
};
