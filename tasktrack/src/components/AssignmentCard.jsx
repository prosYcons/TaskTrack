/*each assignment is displayed in an individual card */

function AssignmentCard({ assignment, onToggle, onDelete }) {
  const isOverdue =
    !assignment.completed &&
    assignment.dueDate < new Date().toLocaleDateString("en-CA");

  return (
    <article className={`assignment-card ${assignment.completed ? "completed" : ""}`}>
      <div className="assignment-info">
        <div className="assignment-title-row">
          <h3>{assignment.title}</h3>
          <span className={`priority ${assignment.priority.toLowerCase()}`}>
            {assignment.priority}
          </span>
        </div>

        <p className="course-name">{assignment.course}</p>

        <p className={isOverdue ? "due-date overdue" : "due-date"}>
          Due: {assignment.dueDate}
          {isOverdue && " · Overdue"}
        </p>
      </div>

      <div className="assignment-actions">
        <button
          className="complete-button"
          onClick={() => onToggle(assignment.id)}
        >
          {assignment.completed ? "Undo" : "Complete"}
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(assignment.id)}
          aria-label={`Delete ${assignment.title}`}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default AssignmentCard;
