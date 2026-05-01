import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider, useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";
import CoursePage from "@/pages/CoursePage";
import QuizPage from "@/pages/QuizPage";
import ResultsPage from "@/pages/ResultsPage";
import RoadmapPage from "@/pages/RoadmapPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/course/:courseId" element={<ProtectedRoute><CoursePage /></ProtectedRoute>} />
      <Route path="/quiz/:courseId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
      <Route path="/results/:courseId" element={<ProtectedRoute><ResultsPage /></ProtectedRoute>} />
      <Route path="/roadmap" element={<ProtectedRoute><RoadmapPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AppProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
