import { useMemo, useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { courses } from "@/data/courses";
import { ArrowLeft, BookOpen, Brain, Clock, Repeat } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProgressBar from "@/components/ProgressBar";
import { Badge } from "@/components/ui/badge";
import ReactFlow, { Background, useNodesState, useEdgesState, MarkerType, type Node, type Edge } from "reactflow";
import "reactflow/dist/style.css";

interface RoadmapStep {
  courseTitle: string;
  courseIcon: string;
  topicTitle: string;
  score: number;
  priority: "High" | "Medium" | "Low";
  days: string;
  action: string;
  variant: "destructive" | "warning" | "success";
}

const RoadmapPage = () => {
  const { quizResults } = useApp();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const hasResults = Object.keys(quizResults).length > 0;

  const sortedSteps = useMemo(() => {
    const allSteps: RoadmapStep[] = [];

    Object.entries(quizResults).forEach(([courseId, result]) => {
      const course = courses.find((c) => c.id === courseId);
      if (!course) return;

      course.topics.forEach((topic) => {
        const score = result.topicScores[topic.id];
        if (!score) return;

        const pct = Math.round((score.correct / score.total) * 100);
        const step: RoadmapStep = {
          courseTitle: course.title,
          courseIcon: course.icon,
          topicTitle: topic.title,
          score: pct,
          priority: pct < 40 ? "High" : pct <= 70 ? "Medium" : "Low",
          days: pct < 40 ? "5–7" : pct <= 70 ? "3–5" : "1–2",
          action: pct < 40 ? "Deep Focus + Practice" : pct <= 70 ? "Strengthen Concepts" : "Quick Revision",
          variant: pct < 40 ? "destructive" : pct <= 70 ? "warning" : "success",
        };

        allSteps.push(step);
      });
    });

    return allSteps.sort((a, b) => {
      const priorityOrder = { High: 0, Medium: 1, Low: 2 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }, [quizResults]);

  const totalDays = useMemo(
    () =>
      sortedSteps.reduce((sum, step) => {
        const [min, max] = step.days.split("–").map(Number);
        return sum + (max ? (min + max) / 2 : min);
      }, 0),
    [sortedSteps]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  useEffect(() => {
    if (!hasResults) return;

    const stepNodes: Node[] = sortedSteps.map((step, index) => {
      const isEven = index % 2 === 0;
      const xPosition = isMobile ? 0 : isEven ? 20 : 420;
      const yPosition = index * 360;

      const badgeColor =
        step.priority === "High"
          ? "border-destructive bg-destructive/10 text-destructive"
          : step.priority === "Medium"
          ? "border-warning bg-warning/10 text-warning"
          : "border-success bg-success/10 text-success";

      return {
        id: `step-${index}`,
        type: "default",
        position: { x: xPosition, y: yPosition },
        data: {
          label: (
            <div className="rounded-3xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
              <div className="flex items-center justify-between gap-4 mb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Step {index + 1}</p>
                  <h3 className="font-display text-xl font-semibold text-foreground mt-2">{step.topicTitle}</h3>
                </div>
                <div className={`rounded-full border px-3 py-1 text-xs font-semibold ${badgeColor}`}>
                  {step.priority}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock size={16} className="text-muted-foreground" />
                  <span>
                    <strong className="text-foreground">{step.days} days</strong> recommended
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {step.priority === "High" ? <Brain size={16} className="text-destructive" /> : step.priority === "Medium" ? <Repeat size={16} className="text-warning" /> : <BookOpen size={16} className="text-success" />}
                  <span className="text-foreground font-medium">{step.action}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-muted-foreground">Score</span>
                  <span className={`text-sm font-semibold ${
                    step.priority === "High"
                      ? "text-destructive"
                      : step.priority === "Medium"
                      ? "text-warning"
                      : "text-success"
                  }`}>{step.score}%</span>
                </div>
              </div>
              <div className="mt-4">
                <ProgressBar value={step.score} variant={step.variant} />
              </div>
            </div>
          ),
        },
        style: {
          width: 360,
          height: 280,
          borderRadius: 24,
          boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
        },
        draggable: false,
      };
    });

    const stepEdges: Edge[] = sortedSteps.slice(1).map((_, index) => ({
      id: `edge-${index}`,
      source: `step-${index}`,
      target: `step-${index + 1}`,
      type: "smoothstep",
      animated: true,
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: "var(--rhythm-color, #94a3b8)",
      },
      style: {
        strokeWidth: 2,
        stroke: "rgba(148, 163, 184, 0.7)",
      },
    }));

    setNodes(stepNodes);
    setEdges(stepEdges);
  }, [sortedSteps, isMobile, hasResults, setEdges, setNodes]);

  if (!hasResults) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <div className="text-6xl mb-4">🗺️</div>
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">No Roadmap Yet</h1>
        <p className="text-muted-foreground mb-6">Complete at least one quiz to generate your adaptive learning roadmap.</p>
        <button onClick={() => navigate("/dashboard")} className="rounded-lg gradient-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity">
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <button onClick={() => navigate("/dashboard")} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="mb-8 flex flex-col gap-4">
        <div>
          <h1 className="font-display text-3xl font-bold text-foreground flex items-center gap-2">🗺️ Your Adaptive Roadmap</h1>
          <p className="mt-1 text-muted-foreground">Personalized learning path based on your quiz performance.</p>
        </div>
        <div className="flex flex-col gap-2 rounded-3xl border border-border bg-muted/60 p-4 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Clock size={16} />
            <span>
              Estimated completion time: <strong className="text-foreground">{Math.round(totalDays)} days</strong>
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-3 py-1">High <span className="h-2 w-2 rounded-full bg-destructive" /></span>
            <span className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-3 py-1">Medium <span className="h-2 w-2 rounded-full bg-warning" /></span>
            <span className="inline-flex items-center gap-2 rounded-full bg-foreground/5 px-3 py-1">Low <span className="h-2 w-2 rounded-full bg-success" /></span>
          </div>
        </div>
      </div>

      <div className="rounded-[32px] border border-border bg-slate-950/80 p-4 shadow-card">
        <div className="h-[calc(100vh-280px)] min-h-[720px] overflow-hidden rounded-[28px] bg-[#0b1120]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            fitView
            fitViewOptions={{ padding: 0.3, minZoom: 0.8, maxZoom: 1.2 }}
            nodesDraggable={false}
            nodesConnectable={false}
            elementsSelectable={false}
            defaultEdgeOptions={{ animated: true, style: { strokeWidth: 2 } }}
          >
            <Background gap={24} size={1} color="rgba(148,163,184,0.12)" />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default RoadmapPage;
