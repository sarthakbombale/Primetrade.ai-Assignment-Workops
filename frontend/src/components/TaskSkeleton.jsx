export default function TaskSkeleton() {
  return (
    <li className="task-card skeleton">
      <div className="task-card-row">
        
        <div className="task-card-left">
          <div className="skeleton-box checkbox"></div>

          <div className="task-card-content">
            <div className="skeleton-box title"></div>
            <div className="skeleton-box text"></div>
            <div className="skeleton-box text short"></div>
          </div>
        </div>

        <div className="task-card-right">
          <div className="skeleton-box badge"></div>

          <div className="task-actions">
            <div className="skeleton-box btn"></div>
            <div className="skeleton-box btn"></div>
          </div>
        </div>

      </div>
    </li>
  );
}