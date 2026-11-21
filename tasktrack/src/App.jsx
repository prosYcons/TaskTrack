
import { useEffect, useState } from "react";
import AssignmentForm from "./components/AssignmentForm";
import AssignmentList from "./components/AssignmentList";
import { getAssignments, saveAssignments } from "./modules/storage";
import "./styles/global.css";

function App() {
  const [assignments, setAssignments] = useState(getAssignments);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    saveAssignments(assignments);
  }, [assignments]);

  function addAssignment(newAssignment) {
    setAssignments((current) => [...current, newAssignment]);
  }

  function toggleAssignment(id) {
    setAssignments((current) =>
      current.map((assignment) =>
        assignment.id === id
          ? { ...assignment, completed: !assignment.completed }
          : assignment
      )
    );
  }

  function deleteAssignment(id) {
    setAssignments((current) =>
      current.filter((assignment) => assignment.id !== id)
    );
  }

  const today = new Date().toLocaleDateString("en-CA");

  const pending = assignments.filter((item) => !item.completed);
  const completed = assignments.filter((item) => item.completed);
  const overdue = pending.filter((item) => item.dueDate < today);

  const filteredAssignments = assignments
    .filter((item) => {
      if (filter === "Pending") return !item.completed;
      if (filter === "Completed") return item.completed;
      if (filter === "Overdue") return !item.completed && item.dueDate < today;
      return true;
    })
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-icon">✓</span>
          <span>TaskTrack</span>
        </div>

        <p className="sidebar-label">WORKSPACE</p>

        <nav className="sidebar-nav">
          <a href="#dashboard" className="nav-link active">
            <span>▦</span> Dashboard
          </a>
          <a href="#assignments" className="nav-link">
            <span>☷</span> Assignments
          </a>
        </nav>

        <div className="sidebar-bottom">
          <p>Stay organized.</p>
          <span>One task at a time.</span>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="topbar">
          <div>
            <p className="eyebrow">YOUR ACADEMIC WORKSPACE</p>
            <h1>My Dashboard</h1>
          </div>
          <div className="today-label">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
            })}
          </div>
        </header>

        <section className="welcome-section">
          <div>
            <p className="eyebrow">WELCOME TO TASKTRACK</p>
            <h2>Make time for what matters.</h2>
            <p>Organize your assignments and stay on top of your coursework.</p>
          </div>
          <span className="welcome-decoration">✦</span>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total assignments</span>
            <strong>{assignments.length}</strong>
            <span className="stat-note">All your coursework</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Pending</span>
            <strong>{pending.length}</strong>
            <span className="stat-note">Still to complete</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Completed</span>
            <strong>{completed.length}</strong>
            <span className="stat-note">Tasks finished</span>
          </div>

          <div className="stat-card">
            <span className="stat-label">Overdue</span>
            <strong>{overdue.length}</strong>
            <span className="stat-note">Past their due date</span>
          </div>
        </section>

        <div className="content-grid">
          <section className="assignments-section" id="assignments">
            <div className="section-heading">
              <div>
                <p className="eyebrow">STAY ON TRACK</p>
                <h2>Your assignments</h2>
              </div>

              <select
                className="filter-select"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                aria-label="Filter assignments"
              >
                <option>All</option>
                <option>Pending</option>
                <option>Completed</option>
                <option>Overdue</option>
              </select>
            </div>

            <AssignmentList
              assignments={filteredAssignments}
              onToggle={toggleAssignment}
              onDelete={deleteAssignment}
            />
          </section>

          <aside className="form-section">
            <AssignmentForm onAddAssignment={addAssignment} />
          </aside>
        </div>

        <footer className="footer">
          TaskTrack · A simpler way to manage your academic workload.
        </footer>
      </main>
    </div>
  );
}

export default App;
