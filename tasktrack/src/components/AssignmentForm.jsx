/*this component allows users to add new assignments */

import { useState } from "react";

function AssignmentForm({ onAddAssignment }) {
  const [title, setTitle] = useState("");
  const [course, setCourse] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !course.trim() || !dueDate) {
      return;
    }

    onAddAssignment({
      id: crypto.randomUUID(),
      title: title.trim(),
      course: course.trim(),
      dueDate,
      priority,
      completed: false,
    });

    setTitle("");
    setCourse("");
    setDueDate("");
    setPriority("Medium");
  }

  return (
    <form className="assignment-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <h2>Add an assignment</h2>
          <p>Keep track of your upcoming coursework.</p>
        </div>
      </div>

      <label>
        Assignment title
        <input
          type="text"
          placeholder="e.g. Research paper"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </label>

      <label>
        Course
        <input
          type="text"
          placeholder="e.g. Web Development"
          value={course}
          onChange={(event) => setCourse(event.target.value)}
          required
        />
      </label>

      <div className="form-row">
        <label>
          Due date
          <input
            type="date"
            value={dueDate}
            onChange={(event) => setDueDate(event.target.value)}
            min={new Date().toLocaleDateString("en-CA")}
            required
          />
        </label>

        <label>
          Priority
          <select
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>
      </div>

      <button className="primary-button" type="submit">
        + Add assignment
      </button>
    </form>
  );
}

export default AssignmentForm;
