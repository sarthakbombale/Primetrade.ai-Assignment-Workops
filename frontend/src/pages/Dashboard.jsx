import "../styles/Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import api from "../services/api";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import FilterDropdown from "../components/FilterDropdown";
import TaskSkeleton from "../components/TaskSkeleton";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1);
  const [overallTotal, setOverallTotal] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadTasks = async (pageNum = page) => {
    setLoading(true);
    setError(null);

    try {
      const res = await api.get("/tasks", {
        params: {
          search: debouncedSearch || undefined,
          status: statusFilter === "all" ? undefined : statusFilter,
          page: pageNum,
          limit,
        },
      });

      const payload = res.data.data || {};
      setTasks(payload.tasks || []);
      const meta = payload.meta || {};

      setTotalPages(meta.totalPages || 1);
      setOverallTotal(meta.overallTotal || 0);
      setCompletedCount(meta.completedCount || 0);
      setPage(meta.page || pageNum);
    } catch (error) {
      console.error(error);
      setError("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks(1);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    loadTasks(page);
  }, [debouncedSearch, statusFilter, page]);


  function openTask(taskId) {
    navigate(`/edit-task/${taskId}`);
  }

  const createTask = async (e) => {
    e.preventDefault();
    try {
      await api.post("/tasks", {
        title,
        description,
      });

      setTitle("");
      setDescription("");

      toast.success("Task created successfully");
      loadTasks(1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  const removeTask = async (id) => {
    const result = await Swal.fire({
      title: "Delete Task?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      borderRadius: "16px",
    });

    if (!result.isConfirmed) return;

    try {
      await api.delete(`/tasks/${id}`);

      setTasks((prev) => prev.filter((task) => task._id !== id));

      toast.success("Task deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task");
    }
  };

  const toggleComplete = async (task) => {
    const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
    const optimistic = { ...task, status: nextStatus };
    setTasks((prev) => prev.map((t) => (t._id === task._id ? optimistic : t)));
    try {
      const res = await api.put(`/tasks/${task._id}/toggle`);
      const updated = res.data.data;
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      loadTasks(page);
      toast.success("Task status updated");
    } catch (err) {
      console.error(err);
      setTasks((prev) =>
        prev.map((t) => (t._id === task._id ? { ...t, status: task.status } : t))
      );
      toast.error("Failed to update task status");
    }
  };

  const logout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "You will need to login again.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#2563eb",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Logout",
      cancelButtonText: "Stay",
      borderRadius: "16px",
    });

    if (!result.isConfirmed) return;

    localStorage.removeItem("token");

    toast.success("Logged out successfully");

    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  };


  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div>
          <h1>TaskFlow Dashboard</h1>
          <p>Personal Task Management Workspace</p>
        </div>

        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{overallTotal}</h3>
          <span>Total Tasks</span>
        </div>

        <div className="stat-card">
          <h3>{overallTotal - completedCount}</h3>
          <span>Pending Tasks</span>
        </div>

        <div className="stat-card">
          <h3>{completedCount}</h3>
          <span>Completed Tasks</span>
        </div>
      </div>

      <div className="task-form">
        <TaskForm
          title={title}
          description={description}
          onTitle={setTitle}
          onDescription={setDescription}
          onSubmit={createTask}
        />
      </div>

      <div className="control-bar">
        <div className="control-left">
          <SearchBar
            value={searchTerm}
            onChange={(v) => {
              setSearchTerm(v);
              setPage(1);
            }}
          />
        </div>

        <div className="control-right">
          <FilterDropdown value={statusFilter} onChange={(v) => { setStatusFilter(v); setPage(1); }} />
        </div>
      </div>

      {loading ? (
        <ul className="task-list">
          {Array.from({ length: 6 }).map((_, i) => (
            <TaskSkeleton key={i} />
          ))}
        </ul>
      ) : error ? (
        <div className="fallback-error">
          <h3>Something went wrong</h3>
          <button onClick={() => loadTasks(page)}>Retry</button>
        </div>
      ) : tasks.length === 0 ? (
        <div className="fallback-empty">
          <h3>No tasks found</h3>
        </div>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onCardClick={() => navigate(`/edit-task/${task._id}`)}
              onEdit={() => navigate(`/edit-task/${task._id}`)}
              onDelete={() => removeTask(task._id)}
              onToggle={() => toggleComplete(task)}
            />
          ))}
        </ul>
      )}

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(p - 1, 1))}
        onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
      />
    </div>
  );
}

export default Dashboard;