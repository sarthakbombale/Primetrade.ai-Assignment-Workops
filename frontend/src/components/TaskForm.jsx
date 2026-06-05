import '../styles/TaskForm.css'

export default function TaskForm({
  title,
  description,
  onTitle,
  onDescription,
  onSubmit,
  loading,
}) {
  return (
    <form className="task-form" onSubmit={onSubmit}>

      {/* TITLE */}
      <div className="form-group">
        <input
          className="form-input"
          placeholder="Enter task title"
          value={title}
          onChange={(e) => onTitle(e.target.value)}
          required
        />
      </div>

      {/* DESCRIPTION */}
      <div className="form-group">
        <textarea
          className="form-textarea"
          placeholder="Write task description..."
          value={description}
          onChange={(e) => onDescription(e.target.value)}
          rows={4}
        />
      </div>

      {/* LIVE PREVIEW (FIXED) */}
      {description && (
        <div className="live-preview">
          <div className="preview-header">Preview</div>
          <div className="preview-body">
            {description}
          </div>
        </div>
      )}

      {/* BUTTON */}
      <div className="form-group">
        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Create Task"}
        </button>
      </div>

    </form>
  )
}