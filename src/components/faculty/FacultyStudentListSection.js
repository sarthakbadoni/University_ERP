import React from "react";

const demoStudents = [
  { id: "S1", name: "Arjun Sharma", attendance: "95%", email: "arjun.s@university.edu.in" },
  { id: "S2", name: "Priya Dev", attendance: "98%", email: "priya.d@university.edu.in" }
];

export default function FacultyStudentListSection() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
      <h2 className="font-bold text-xl mb-2 text-blue-700">Student List</h2>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="text-left p-2">Roll No</th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Attendance</th>
            <th className="text-left p-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {demoStudents.map(stu => (
            <tr key={stu.id}>
              <td className="p-2">{stu.id}</td>
              <td className="p-2">{stu.name}</td>
              <td className="p-2">{stu.attendance}</td>
              <td className="p-2">{stu.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
