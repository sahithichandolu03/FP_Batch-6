import { Link, useNavigate } from "react-router-dom";
import { useApp } from "@/context/AppContext";
import { LogOut, BookOpen, BarChart3, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) return null;

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/dashboard" className="flex items-center gap-2 font-display text-xl font-bold text-foreground">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary text-primary-foreground text-sm font-bold">A</span>
          AdaptLearn
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/dashboard" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <BookOpen size={16} />
            Dashboard
          </Link>
          <Link to="/roadmap" className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <BarChart3 size={16} />
            Roadmap
          </Link>
          <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-destructive transition-colors">
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 py-3 flex flex-col gap-3">
          <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground">Dashboard</Link>
          <Link to="/roadmap" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-foreground">Roadmap</Link>
          <button onClick={handleLogout} className="text-left text-sm font-medium text-muted-foreground hover:text-destructive">Logout</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
