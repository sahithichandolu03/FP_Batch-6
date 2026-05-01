import { useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { courses } from "@/data/courses";
import ProgressBar from "@/components/ProgressBar";
import { ArrowRight, CheckCircle2, Trophy } from "lucide-react";

const Dashboard = () => {
  const { user, getCompletedCount, quizResults } = useApp();
  const navigate = useNavigate();

  const totalTopics = courses.reduce((sum, c) => sum + c.topics.length, 0);
  const totalCompleted = courses.reduce((sum, c) => sum + getCompletedCount(c.id, c.topics.length), 0);
  const overallProgress = totalTopics > 0 ? (totalCompleted / totalTopics) * 100 : 0;
  const quizzesCompleted = Object.keys(quizResults).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-foreground">
          Welcome back, {user?.name} 👋
        </h1>
        <p className="mt-1 text-muted-foreground">Track your progress and continue learning.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <p className="text-sm text-muted-foreground mb-1">Overall Progress</p>
          <p className="font-display text-2xl font-bold text-foreground">{Math.round(overallProgress)}%</p>
          <ProgressBar value={overallProgress} showPercentage={false} />
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <CheckCircle2 size={16} className="text-success" /> Topics Completed
          </div>
          <p className="font-display text-2xl font-bold text-foreground">{totalCompleted} / {totalTopics}</p>
        </div>
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
            <Trophy size={16} className="text-warning" /> Quizzes Taken
          </div>
          <p className="font-display text-2xl font-bold text-foreground">{quizzesCompleted} / {courses.length}</p>
        </div>
      </div>

      {/* Course cards */}
      <h2 className="font-display text-xl font-bold text-foreground mb-4">Your Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {courses.map((course) => {
          const completed = getCompletedCount(course.id, course.topics.length);
          const pct = (completed / course.topics.length) * 100;
          const hasResult = !!quizResults[course.id];

          return (
            <div
              key={course.id}
              className="group rounded-xl border border-border bg-card p-6 shadow-card hover:shadow-elevated transition-shadow cursor-pointer"
              onClick={() => navigate(`/course/${course.id}`)}
            >
              <div className="flex items-start gap-4">
                <span className="text-4xl">{course.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{course.description}</p>
                  <div className="mt-3">
                    <ProgressBar value={pct} label={`${completed}/${course.topics.length} topics`} variant={pct === 100 ? "success" : "default"} />
                  </div>
                  <div className="mt-4 flex items-center gap-3">
                    <button className="flex items-center gap-1.5 rounded-lg gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
                      {completed > 0 ? "Continue" : "Start Course"}
                      <ArrowRight size={14} />
                    </button>
                    {hasResult && (
                      <span className="text-xs font-medium text-success flex items-center gap-1">
                        <CheckCircle2 size={14} /> Quiz done
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
