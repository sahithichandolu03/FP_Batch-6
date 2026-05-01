import { useParams, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { courses } from "@/data/courses";
import { ChevronDown, ChevronRight, CheckSquare, Square, ArrowLeft, ClipboardList } from "lucide-react";
import { useState } from "react";

const CoursePage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { progress, toggleTopicComplete } = useApp();
  const navigate = useNavigate();
  const [openTopics, setOpenTopics] = useState<Set<string>>(new Set());

  const course = courses.find((c) => c.id === courseId);
  if (!course) return <div className="p-8 text-center text-muted-foreground">Course not found.</div>;

  const toggle = (id: string) => {
    setOpenTopics((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const completedCount = course.topics.filter((t) => progress[course.id]?.[t.id]).length;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <button onClick={() => navigate("/dashboard")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="flex items-center gap-3 mb-2">
        <span className="text-4xl">{course.icon}</span>
        <h1 className="font-display text-2xl md:text-3xl font-bold text-foreground">{course.title}</h1>
      </div>
      <p className="text-muted-foreground mb-6">{course.description}</p>
      <p className="text-sm text-muted-foreground mb-6">{completedCount}/{course.topics.length} topics completed</p>

      <div className="space-y-3">
        {course.topics.map((topic, idx) => {
          const isOpen = openTopics.has(topic.id);
          const isDone = !!progress[course.id]?.[topic.id];

          return (
            <div key={topic.id} className="rounded-xl border border-border bg-card shadow-card overflow-hidden">
              <button
                onClick={() => toggle(topic.id)}
                className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-muted/50 transition-colors"
              >
                {isOpen ? <ChevronDown size={18} className="text-primary" /> : <ChevronRight size={18} className="text-muted-foreground" />}
                <span className="text-xs font-mono text-muted-foreground w-6">{String(idx + 1).padStart(2, "0")}</span>
                <span className={`flex-1 font-medium text-sm ${isDone ? "text-success line-through" : "text-foreground"}`}>{topic.title}</span>
                {isDone && <CheckSquare size={18} className="text-success" />}
              </button>

              {isOpen && (
                <div className="px-5 pb-4 border-t border-border">
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3 mb-4">{topic.explanation}</p>
                  <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-foreground">
                    <button
                      onClick={() => toggleTopicComplete(course.id, topic.id)}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      {isDone ? <CheckSquare size={20} /> : <Square size={20} />}
                    </button>
                    Mark as completed
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          onClick={() => navigate(`/quiz/${course.id}`)}
          className="flex items-center gap-2 rounded-xl gradient-primary px-8 py-3 text-sm font-bold text-primary-foreground hover:opacity-90 transition-opacity shadow-glow"
        >
          <ClipboardList size={18} />
          Take Quiz
        </button>
      </div>
    </div>
  );
};

export default CoursePage;
