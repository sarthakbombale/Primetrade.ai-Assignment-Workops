import React from 'react';

export default function TaskForm({ title, description, onTitle, onDescription, onSubmit, loading }) {
  return (
    <form onSubmit={onSubmit} style={{ marginBottom: 16 }}>
      <div>
        <input placeholder="Enter task title" value={title} onChange={(e) => onTitle(e.target.value)} required />
      </div>
      <div style={{ marginTop: 8 }}>
        <input placeholder="Enter task description" value={description} onChange={(e) => onDescription(e.target.value)} />
      </div>
      <div style={{ marginTop: 12 }}>
        <button type="submit">{loading ? 'Saving...' : 'Create Task'}</button>
      </div>
    </form>
  );
}
