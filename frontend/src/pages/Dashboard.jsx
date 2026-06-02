import "../styles/Dashboard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import api from "../api";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

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

      loadTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create task"
      );
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

      setTasks(tasks.filter((task) => task._id !== id));

      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Failed to delete task");
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
          <h1>TaskFlow</h1>
          <p>Personal Task Management Workspace</p>
        </div>

        <button className="logout-button" onClick={logout}>
          Logout
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{tasks.length}</h3>
          <span>Total Tasks</span>
        </div>

        <div className="stat-card">
          <h3>{tasks.length}</h3>
          <span>Active Tasks</span>
        </div>
      </div>

      <form onSubmit={createTask} className="task-form">
        <h3>Create New Task</h3>

        <input
          type="text"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Enter task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button type="submit">Create Task</button>
      </form>

      {tasks.length === 0 ? (
        <div className="no-tasks">
          No tasks available. Create your first task.
        </div>
      ) : (
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task._id} className="task-card">
              <strong>{task.title}</strong>

              <p>
                {task.description || "No description provided."}
              </p>

              <small>
                Created:{" "}
                {new Date(task.createdAt).toLocaleString()}
              </small>

              <div className="task-actions">
                <button
                  type="button"
                  className="edit"
                  onClick={() =>
                    navigate(`/edit-task/${task._id}`)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete"
                  onClick={() => removeTask(task._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;