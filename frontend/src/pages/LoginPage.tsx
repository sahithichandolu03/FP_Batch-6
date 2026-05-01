import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { Mail, Lock, User, ArrowRight } from "lucide-react";

const LoginPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { login, signup, isLoading } = useApp();
  const navigate = useNavigate();

  const validate = () => {
    const e: Record<string, string> = {};
    if (isSignup && !name.trim()) e.name = "Name is required";
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) e.email = "Valid email is required";
    if (password.length < 6) e.password = "Password must be at least 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    try {
      if (isSignup) {
        await signup(name, email, password);
        navigate("/");
      } else {
        await login(email, password);
        navigate("/dashboard");
      }
    } catch (error) {
      // Error is handled in the context
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 gradient-hero items-center justify-center p-12">
        <div className="max-w-md text-center">
          <div className="text-6xl mb-6">🎯</div>
          <h1 className="font-display text-4xl font-bold text-primary-foreground mb-4">
            Learn Smarter, Not Harder
          </h1>
          <p className="text-primary-foreground/80 text-lg leading-relaxed">
            Adaptive roadmaps personalized to your strengths and weaknesses. Master CS fundamentals with guided learning paths.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-2 justify-center lg:justify-start mb-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary text-primary-foreground font-bold text-lg">A</span>
              <span className="font-display text-2xl font-bold">AdaptLearn</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-foreground">
              {isSignup ? "Create your account" : "Welcome back"}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {isSignup ? "Start your adaptive learning journey" : "Continue your learning journey"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {isSignup && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text" value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-lg gradient-primary py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : (isSignup ? "Create Account" : "Sign In")}
              {!isLoading && <ArrowRight size={16} />}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
            <button onClick={() => { setIsSignup(!isSignup); setErrors({}); }} className="font-semibold text-primary hover:underline">
              {isSignup ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
