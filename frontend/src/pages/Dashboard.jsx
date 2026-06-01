
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
      <h2>Tasks</h2>
      <button onClick={logout}>Logout</button>
      {error && <div className="error">{error}</div>}

      <form onSubmit={createTask} className="task-form">
        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">Create</button>
      </form>

      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t._id}>
            <strong>{t.title}</strong>
            <p>{t.description}</p>
            <small>{new Date(t.createdAt).toLocaleString()}</small>
            <div>
              <button onClick={() => editTask(t)}>Edit</button>
              <button onClick={() => removeTask(t._id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;