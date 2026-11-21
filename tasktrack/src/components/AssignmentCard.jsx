/*each assignment is displayed in an individual card */

import { useState } from "react";

function AssignmentCard({ assignment, onToggle, onDelete, onUpdate }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(assignment.title);
  const [course, setCourse] = useState(assignment.course);
  const [dueDate, setDueDate] = useState(assignment.dueDate);
  const [priority, setPriority] = useState(assignment.priority);

  const isOverdue =
    !assignment.completed &&
    assignment.dueDate < new Date().toLocaleDateString("en-CA");

  function handleSave(event) {
    event.preventDefault();

    if (!title.trim() || !course.trim() || !dueDate) {
      return;
    }

    onUpdate({
      ...assignment,
      title: title.trim(),
      course: course.trim(),
      dueDate,
      priority,
    });

    setIsEditing(false);
  }

  function handleCancel() {
    setTitle(assignment.title);
    setCourse(assignment.course);
    setDueDate(assignment.dueDate);
    setPriority(assignment.priority);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <form className="assignment-card edit-form" onSubmit={handleSave}>
        <label>
          Assignment title
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>

        <label>
          Course
          <input
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            required
          />
        </label>

        <div className="form-row">
          <label>
            Due date
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </label>

          <label>
            Priority
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </label>
        </div>

        <div className="assignment-actions">
          <button type="submit" className="complete-button">
            Save changes
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    );
  }

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

        <button onClick={() => setIsEditing(true)}>
          Edit
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
