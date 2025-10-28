import React from "react";

const demoTimetable = [
  { day: "Monday", slots: [ { subject: "DBMS", time: "9-10" }, { subject: "Software Engg", time: "10-11" }] },
  { day: "Tuesday", slots: [ { subject: "DBMS", time: "11-12" } ] }
];

export default function FacultyTimetableSection() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
      <h2 className="font-bold text-xl mb-2 text-blue-700">Class Timetable</h2>
      {demoTimetable.map(day => (
        <div key={day.day} className="mb-4">
          <div className="font-semibold">{day.day}</div>
          <ul>
            {day.slots.map((slot, idx) => (
              <li key={idx} className="ml-2">
                {slot.subject} &mdash; <span className="text-slate-600">{slot.time}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <div className="text-sm mt-4 text-slate-500">Request timetable changes from department admin.</div>
    </div>
  );
}
