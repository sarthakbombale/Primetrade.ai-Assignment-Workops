import "../styles/Dashboard.css";
import { useEffect, useState } from 'react';
import api from '../api';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState(null);

  async function load() {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load tasks');
    }
  }

  useEffect(() => { load(); }, []);

  async function createTask(e) {
    e.preventDefault();
    try {
      await api.post('/tasks', { title, description });
      setTitle('');
      setDescription('');
      await load();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create');
    }
  }

  async function removeTask(id) {
    if (!confirm('Delete task?')) return;
    await api.delete(`/tasks/${id}`);
    await load();
  }

  async function editTask(task) {
    const newTitle = prompt('Title', task.title);
    const newDesc = prompt('Description', task.description || '');
    if (newTitle == null) return;
    await api.put(`/tasks/${task._id}`, { title: newTitle, description: newDesc });
    await load();
  }

  function logout() {
    localStorage.removeItem('token');
    window.location.href = '/';
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>TaskFlow Dashboard</h2>
          <p className="dashboard-subtitle">Manage your tasks with ease and keep your work organized.</p>
        </div>
        <button className="logout-button" onClick={logout}>Logout</button>
      </div>

      {error && <div className="error">{error}</div>}

      <form onSubmit={createTask} className="task-form">
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={!title}>Create</button>
      </form>

      {tasks.length === 0 ? (
        <div className="no-tasks">No tasks created yet. Add a new task to get started.</div>
      ) : (
        <ul className="task-list">
          {tasks.map((t) => (
            <li key={t._id} className="task-card">
              <strong>{t.title}</strong>
              <p>{t.description || 'No description added.'}</p>
              <small>Created: {new Date(t.createdAt).toLocaleString()}</small>
              <div className="task-actions">
                <button className="edit" type="button" onClick={() => editTask(t)}>Edit</button>
                <button className="delete" type="button" onClick={() => removeTask(t._id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Dashboard;