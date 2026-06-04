import "../styles/EditTask.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    fetchTask();
  }, []);

  async function fetchTask() {
    try {
      const res = await api.get(`/tasks/${id}`);

      setTitle(res.data.data.title);
      setDescription(res.data.data.description || "");
      setStatus(res.data.data.status || 'pending');
    } catch {
      toast.error("Failed to load task");
    }
  }

  async function updateTask(e) {
    e.preventDefault();

    try {
      await api.put(`/tasks/${id}`, {
        title,
        description,
        status,
      });

      toast.success("Task updated successfully");

      navigate("/dashboard");
    } catch {
      toast.error("Failed to update task");
    }
  }

  return (
    <div className="edit-task-container">
      <form className="edit-task-form" onSubmit={updateTask}>
        <h2>Edit Task</h2>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="5"
        />

        <div style={{ marginTop: 8 }}>
          <label>
            Status:{' '}
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </label>
        </div>

        <button type="submit">
          Update Task
        </button>

        <button
          type="button"
          className="back-btn"
          onClick={() => navigate("/dashboard")}
        >
          Back
        </button>
      </form>
    </div>
  );
}

export default EditTask;