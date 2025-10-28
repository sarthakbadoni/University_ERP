import React, { useState } from "react";
const sampleClasses = [
  { subject: "DBMS", time: "9:00-10:00", students: ["S1", "S2", "S3"] },
  { subject: "Software Engg", time: "11:15-12:15", students: ["S4", "S5", "S6"] }
];

export default function FacultyAttendanceSection() {
  const [selectedClass, setSelectedClass] = useState(sampleClasses[0]);
  const [attendance, setAttendance] = useState(
    selectedClass.students.reduce((a, c) => ({ ...a, [c]: false }), {})
  );

  const changeClass = idx => {
    setSelectedClass(sampleClasses[idx]);
    setAttendance(sampleClasses[idx].students.reduce((a, c) => ({ ...a, [c]: false }), {}));
  };

  const toggle = id => setAttendance(a => ({ ...a, [id]: !a[id] }));

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
      <h2 className="font-bold text-xl mb-4">Manage Attendance</h2>
      <select onChange={e => changeClass(e.target.value)} className="mb-4 p-2 rounded">
        {sampleClasses.map((cls, idx) =>
          <option key={idx} value={idx}>{cls.subject} ({cls.time})</option>
        )}
      </select>
      <form>
        <table className="min-w-full mb-4">
          <thead>
            <tr className="text-blue-700"><th>Student</th><th>Present</th></tr>
          </thead>
          <tbody>
            {selectedClass.students.map(sid =>
              <tr key={sid}>
                <td>{sid}</td>
                <td>
                  <input type="checkbox" checked={attendance[sid]} onChange={() => toggle(sid)} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2">Save Attendance</button>
      </form>
    </div>
  );
}
