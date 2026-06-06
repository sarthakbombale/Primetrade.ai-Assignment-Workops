import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import "./App.css";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import EditTask from "./pages/EditTask";

import Layout from "./layout/Layout";
import { useAuth } from "./context/AuthContext";

function App() {
  const { token } = useAuth();

  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        {/* PUBLIC ROUTES (no layout) */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED ROUTES WITH HEADER */}
        <Route element={token ? <Layout /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/edit-task/:id" element={<EditTask />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;