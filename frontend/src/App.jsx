import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const token = localStorage.getItem('token');

  return (
    <BrowserRouter>
      <header className="app-header">
        <div className="header-inner">
          <div className="brand">TaskFlow</div>
          <nav>
            {!token && <Link to="/">Login</Link>}
            {!token && <Link to="/register">Register</Link>}
            {token && <Link to="/dashboard">Dashboard</Link>}
          </nav>
        </div>
      </header>

      <main className="page-container">
        <Routes>
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
