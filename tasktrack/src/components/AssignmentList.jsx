/*list of all the assignments */

import AssignmentCard from "./AssignmentCard";

function AssignmentList({ assignments, onToggle, onDelete, onUpdate }) {
  if (assignments.length === 0) {
    return (
      <div className="empty-state">
        <span className="empty-icon">✦</span>
        <h3>No assignments found</h3>
        <p>Add an assignment to start organizing your coursework.</p>
      </div>
    );
  }

  return (
    <div className="assignment-list">
      {assignments.map((assignment) => (
        <AssignmentCard
          key={assignment.id}
          assignment={assignment}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
}

export default AssignmentList;
