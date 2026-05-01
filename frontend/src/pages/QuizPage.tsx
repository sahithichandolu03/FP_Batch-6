import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { quizzes } from "@/data/quizzes";
import { courses } from "@/data/courses";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import api from "@/lib/api";

const QuizPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { saveQuizResult } = useApp();
  const questions = quizzes[courseId || ""] || [];
  const course = courses.find((c) => c.id === courseId);

  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  if (!course || questions.length === 0) {
    return <div className="p-8 text-center text-muted-foreground">No quiz available for this course.</div>;
  }

  const q = questions[current];
  const isLast = current === questions.length - 1;
  const answered = answers[q.id] !== undefined;

  const selectOption = (idx: number) => {
    setAnswers((prev) => ({ ...prev, [q.id]: idx }));
  };

  const handleSubmit = async () => {
    let correct = 0;
    const topicScores: Record<string, { correct: number; total: number }> = {};

    questions.forEach((question) => {
      if (!topicScores[question.topicId]) topicScores[question.topicId] = { correct: 0, total: 0 };
      topicScores[question.topicId].total++;
      if (answers[question.id] === question.correctAnswer) {
        correct++;
        topicScores[question.topicId].correct++;
      }
    });

    const quizResult = {
      courseId: courseId!,
      answers,
      score: correct,
      total: questions.length,
      topicScores,
    };

    saveQuizResult(quizResult);
    
    // Save quiz progress to backend
    try {
      await api.post('/progress/save', {
        courseId,
        completedTopics: Object.keys(topicScores),
        score: correct,
        roadmap: topicScores,
      });
    } catch (error) {
      console.error('Failed to save quiz progress:', error);
    }

    navigate(`/results/${courseId}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <button onClick={() => navigate(`/course/${courseId}`)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft size={16} /> Back to Course
      </button>

      <div className="mb-6">
        <h1 className="font-display text-2xl font-bold text-foreground">{course.icon} {course.title} Quiz</h1>
        <div className="flex items-center gap-2 mt-2">
          <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full rounded-full gradient-primary transition-all duration-300"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground font-medium">{current + 1}/{questions.length}</span>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-card">
        <p className="font-display text-lg font-semibold text-foreground mb-6">{q.question}</p>

        <div className="space-y-3">
          {q.options.map((opt, idx) => {
            const selected = answers[q.id] === idx;
            return (
              <button
                key={idx}
                onClick={() => selectOption(idx)}
                className={`w-full text-left rounded-lg border px-4 py-3 text-sm transition-all ${
                  selected
                    ? "border-primary bg-primary/10 text-foreground font-medium shadow-glow"
                    : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-muted/50"
                }`}
              >
                <span className="inline-flex items-center gap-3">
                  <span className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                    selected ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {opt}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setCurrent((p) => Math.max(0, p - 1))}
          disabled={current === 0}
          className="flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors disabled:opacity-40"
        >
          <ArrowLeft size={14} /> Previous
        </button>

        {isLast ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
            className="flex items-center gap-1 rounded-lg gradient-primary px-6 py-2 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            <CheckCircle size={14} /> Submit Quiz
          </button>
        ) : (
          <button
            onClick={() => setCurrent((p) => Math.min(questions.length - 1, p + 1))}
            disabled={!answered}
            className="flex items-center gap-1 rounded-lg gradient-primary px-4 py-2 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            Next <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
