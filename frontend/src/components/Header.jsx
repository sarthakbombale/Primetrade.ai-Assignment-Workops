import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const { token } = useAuth();

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="brand">TaskFlow</div>

        <nav>
          {token && <Link to="/dashboard">Dashboard</Link>}

          <button type="button" className="theme-btn" onClick={toggleTheme}>
            {theme === "light" ? (
              <>
                <Moon size={18} /> Dark
              </>
            ) : (
              <>
                <Sun size={18} /> Light
              </>
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}