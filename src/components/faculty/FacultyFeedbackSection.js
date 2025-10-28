import React, { useState } from "react";
const demoFeedback = [
  { id: 1, student: "S1", feedback: "Loved today's class!", replied: false },
  { id: 2, student: "S2", feedback: "Project deadline is too close.", replied: false }
];

export default function FacultyFeedbackSection() {
  const [feedback, setFeedback] = useState(demoFeedback);

  const handleReply = id => {
    setFeedback(fb => fb.map(f => f.id === id ? { ...f, replied: true } : f));
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
      <h2 className="font-bold text-xl mb-2 text-blue-700">Feedback / Grievances</h2>
      {feedback.map(f => (
        <div key={f.id} className="mb-4 border-b pb-2">
          <div className="font-semibold">{f.student}:</div>
          <div className="mb-2">{f.feedback}</div>
          {f.replied ? (
            <div className="text-green-700 text-sm">Replied</div>
          ) : (
            <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => handleReply(f.id)}>
              Mark as Replied
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
