import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Sun, Moon } from "lucide-react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EditTask from "./pages/EditTask";

import { useTheme } from "./context/ThemeContext";
import "./App.css";

function App() {
  const token = localStorage.getItem("token");
  const { theme, toggleTheme } = useTheme();

  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <header className="app-header">
        <div className="header-inner">
          <div className="brand">TaskFlow</div>

          <nav>
            {!token && <Link to="/">Login</Link>}
            {!token && <Link to="/register">Register</Link>}
            {token && <Link to="/dashboard">Dashboard</Link>}

            <button className="theme-btn" onClick={toggleTheme}>
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

      <main className="page-container">
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/edit-task/:id"
            element={token ? <EditTask /> : <Navigate to="/" />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;