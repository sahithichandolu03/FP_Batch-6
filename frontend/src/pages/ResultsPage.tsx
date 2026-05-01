import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { courses } from "@/data/courses";
import ProgressBar from "@/components/ProgressBar";
import { ArrowLeft, ArrowRight, Trophy, Target } from "lucide-react";

const ResultsPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { quizResults } = useApp();
  const navigate = useNavigate();

  const result = quizResults[courseId || ""];
  const course = courses.find((c) => c.id === courseId);

  if (!result || !course) {
    return <div className="p-8 text-center text-muted-foreground">No results found. Take a quiz first.</div>;
  }

  const percentage = Math.round((result.score / result.total) * 100);

  const topicPerformance = course.topics
    .filter((t) => result.topicScores[t.id])
    .map((t) => {
      const s = result.topicScores[t.id];
      return { ...t, pct: Math.round((s.correct / s.total) * 100), correct: s.correct, total: s.total };
    })
    .sort((a, b) => a.pct - b.pct);

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <button onClick={() => navigate(`/course/${courseId}`)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft size={16} /> Back to Course
      </button>

      {/* Score card */}
      <div className="rounded-xl gradient-hero p-8 text-center text-primary-foreground mb-8 shadow-elevated">
        <Trophy size={48} className="mx-auto mb-3 opacity-90" />
        <h1 className="font-display text-3xl font-bold mb-1">Quiz Complete!</h1>
        <p className="text-primary-foreground/80 mb-4">{course.title}</p>
        <div className="text-6xl font-display font-bold">{percentage}%</div>
        <p className="mt-2 text-primary-foreground/70">{result.score} out of {result.total} correct</p>
      </div>

      {/* Topic breakdown */}
      <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <Target size={20} className="text-primary" /> Topic-wise Performance
      </h2>
      <div className="space-y-4 mb-8">
        {topicPerformance.map((t) => (
          <div key={t.id} className="rounded-xl border border-border bg-card p-4 shadow-card">
            <ProgressBar
              value={t.pct}
              label={`${t.title} (${t.correct}/${t.total})`}
              variant={t.pct >= 80 ? "success" : t.pct >= 50 ? "warning" : "destructive"}
            />
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-center">
        <button
          onClick={() => navigate("/roadmap")}
          className="flex items-center gap-2 rounded-xl gradient-primary px-6 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity shadow-glow"
        >
          View Adaptive Roadmap <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default ResultsPage;
