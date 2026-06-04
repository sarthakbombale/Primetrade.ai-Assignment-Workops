import StatusBadge from './StatusBadge';

export default function TaskCard({ task, onCardClick, onEdit, onDelete, onToggle }) {
  return (
    <li className="task-card" onClick={() => onCardClick(task)}>
      <div className="task-card-row">

        {/* LEFT SIDE */}
        <div className="task-card-left">
          <input
            className="task-checkbox"
            type="checkbox"
            checked={task.status === 'completed'}
            onChange={(e) => {
              e.stopPropagation();
              onToggle(task);
            }}
          />

          <div className="task-card-content">
            <div className="task-title">{task.title}</div>
            <div className="task-desc">
              {task.description || 'No description provided.'}
            </div>
            <div className="task-meta">
              Created: {new Date(task.createdAt).toLocaleString()}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="task-card-right" onClick={(e) => e.stopPropagation()}>
          <StatusBadge status={task.status} />

          <div className="task-actions">
            <button
              className="btn btn-edit"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
            >
              Edit
            </button>

            <button
              className="btn btn-delete"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task);
              }}
            >
              Delete
            </button>
          </div>
        </div>

      </div>
    </li>
  );
}