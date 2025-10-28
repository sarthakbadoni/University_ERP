import React, { useState } from "react";
import { Progress } from "../ui/progress";

const tabs = [
  { id: "subjects", label: "Subjects" },
  { id: "attendance", label: "Attendance" },
  { id: "timetable", label: "Timetable" },
];

const subjects = [
  {
    name: "Database Management Systems",
    code: "CS301",
    credits: 4,
    teacher: "Dr. R. S. Sharma",
    totalClasses: 45,
    attended: 41,
  },
  {
    name: "Software Engineering",
    code: "CS302",
    credits: 3,
    teacher: "Ms. Priya Singh",
    totalClasses: 42,
    attended: 39,
  },
  {
    name: "Computer Networks",
    code: "CS303",
    credits: 4,
    teacher: "Mr. Aman Gupta",
    totalClasses: 44,
    attended: 38,
  },
  {
    name: "Operating Systems",
    code: "CS304",
    credits: 3,
    teacher: "Dr. K. R. Mehta",
    totalClasses: 40,
    attended: 36,
  },
  {
    name: "Web Technologies",
    code: "CS305",
    credits: 3,
    teacher: "Mrs. Neha Verma",
    totalClasses: 41,
    attended: 39,
  },
];

const overallAttendance =
  Math.round(
    (subjects.reduce((a, s) => a + s.attended, 0) /
      subjects.reduce((a, s) => a + s.totalClasses, 0)) *
      100
  ) || 0;

export default function AcademicSection() {
  const [activeTab, setActiveTab] = useState("subjects");

  return (
    <div className="w-full bg-slate-900 min-h-screen">
      {/* Desktop View */}
      <section className="hidden lg:block w-full max-w-3xl mx-auto px-4 pb-10">
        <h1 className="text-3xl font-extrabold text-white mb-1 mt-2 text-center">Academic Records</h1>
        <p className="text-blue-300 mb-6 text-center text-base">Welcome back, Arjun Sharma</p>
        
        {/* Stat cards */}
        <div className="flex flex-col gap-4 mb-7 w-full">
          <div className="bg-slate-800 rounded-2xl shadow p-5 text-center w-full">
            <div className="text-md text-gray-300 font-medium mb-1">Current CGPA</div>
            <div className="text-3xl font-black text-purple-300">8.4</div>
          </div>
          <div className="bg-slate-800 rounded-2xl shadow p-5 text-center w-full">
            <div className="text-md text-gray-300 font-medium mb-1">Latest SGPA</div>
            <div className="text-3xl font-black text-blue-300">8.6</div>
          </div>
          <div className="bg-slate-800 rounded-2xl shadow p-5 text-center w-full">
            <div className="text-md text-gray-300 font-medium mb-1">Attendance</div>
            <div className="text-3xl font-black text-white">{overallAttendance}%</div>
            <Progress value={overallAttendance} className="w-full mt-2 h-2" />
          </div>
        </div>
        
        <div className="w-full flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-5 py-2 rounded-lg font-semibold text-base transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-700 text-white shadow"
                  : "bg-slate-800 text-blue-300 hover:bg-blue-800 hover:text-white border border-blue-800"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="w-full">
          {activeTab === "subjects" && (
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8 w-full">
              <div className="text-lg font-semibold text-white mb-4">Semester 6 - Subject List</div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-blue-200 text-left text-base">
                      <th className="pb-3">Subject</th>
                      <th className="pb-3">Code</th>
                      <th className="pb-3">Credits</th>
                      <th className="pb-3">Teacher</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject) => (
                      <tr
                        key={subject.code}
                        className="bg-slate-700/70 hover:bg-slate-700 text-gray-100"
                      >
                        <td className="py-3 px-4 font-medium">{subject.name}</td>
                        <td className="py-3 px-4">{subject.code}</td>
                        <td className="py-3 px-4">{subject.credits}</td>
                        <td className="py-3 px-4">{subject.teacher}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === "attendance" && (
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8 text-white w-full">
              <div className="flex flex-col sm:flex-row items-center justify-between mb-5 gap-3">
                <div className="text-lg font-semibold">Detailed Attendance</div>
                <div className="flex flex-col items-center sm:items-end">
                  <span className="text-base font-medium">Overall Attendance</span>
                  <span className="text-xl font-bold">{overallAttendance}%</span>
                  <Progress value={overallAttendance} className="w-44 mt-1 h-2" />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-y-2">
                  <thead>
                    <tr className="text-blue-200 text-left text-base">
                      <th className="pb-3">Subject</th>
                      <th className="pb-3">Code</th>
                      <th className="pb-3">Faculty</th>
                      <th className="pb-3">Classes Held</th>
                      <th className="pb-3">Attended</th>
                      <th className="pb-3">% Attendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subjects.map((subject) => {
                      const att =
                        Math.round((subject.attended / subject.totalClasses) * 100) || 0;
                      return (
                        <tr
                          key={subject.code}
                          className="bg-slate-700/70 hover:bg-slate-700 text-gray-100"
                        >
                          <td className="py-3 px-4 font-medium">{subject.name}</td>
                          <td className="py-3 px-4">{subject.code}</td>
                          <td className="py-3 px-4">{subject.teacher}</td>
                          <td className="py-3 px-4">{subject.totalClasses}</td>
                          <td className="py-3 px-4">{subject.attended}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-3 py-1 rounded-xl font-semibold text-xs ${
                                att >= 75
                                  ? "bg-green-200 text-green-800"
                                  : att >= 60
                                  ? "bg-yellow-200 text-yellow-800"
                                  : "bg-red-200 text-red-800"
                              }`}
                            >
                              {att}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          
          {activeTab === "timetable" && (
            <div className="bg-slate-800 rounded-2xl shadow-lg p-8 text-white text-center w-full">
              <div className="text-lg font-semibold mb-4">Timetable</div>
              <div>Your timetable will be displayed here.</div>
            </div>
          )}
        </div>
      </section>

      {/* Mobile View */}
      <section className="block lg:hidden w-full px-4 pb-10">
        <h1 className="text-2xl font-extrabold text-white mb-1 mt-6 text-center">Academic Records</h1>
        <p className="text-blue-300 mb-6 text-center">Welcome back, Arjun Sharma</p>
        
        {/* Stat cards */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="bg-slate-800 rounded-2xl shadow p-5 text-center">
            <div className="font-medium text-gray-300 mb-1">Current CGPA</div>
            <div className="text-3xl font-black text-purple-300">8.4</div>
          </div>
          <div className="bg-slate-800 rounded-2xl shadow p-5 text-center">
            <div className="font-medium text-gray-300 mb-1">Latest SGPA</div>
            <div className="text-3xl font-black text-blue-300">8.6</div>
          </div>
          <div className="bg-slate-800 rounded-2xl shadow p-5 text-center">
            <div className="font-medium text-gray-300 mb-1">Attendance</div>
            <div className="text-3xl font-black text-white">{overallAttendance}%</div>
            <Progress value={overallAttendance} className="w-full mt-2 h-2" />
          </div>
        </div>
        
        <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-5 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-blue-700 text-white shadow"
                  : "bg-slate-800 text-blue-300 hover:bg-blue-800 hover:text-white border border-blue-800"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="w-full">
          {activeTab === "subjects" && (
            <div className="bg-slate-800 rounded-2xl shadow-lg p-4">
              <div className="font-semibold text-white mb-4">Semester 6 - Subject List</div>
              
              {/* Subject Cards */}
              <div className="flex flex-col gap-3">
                {subjects.map((subject) => (
                  <div key={subject.code} className="bg-slate-700/70 rounded-lg p-4">
                    <div className="font-semibold text-white mb-2">{subject.name}</div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <div className="text-gray-400">Code</div>
                        <div className="text-blue-200">{subject.code}</div>
                      </div>
                      <div>
                        <div className="text-gray-400">Credits</div>
                        <div className="text-blue-200">{subject.credits}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-gray-400">Teacher</div>
                        <div className="text-blue-200">{subject.teacher}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === "attendance" && (
            <div className="bg-slate-800 rounded-2xl shadow-lg p-4 text-white">
              <div className="flex flex-col items-center mb-5">
                <div className="font-semibold mb-3">Detailed Attendance</div>
                <div className="flex flex-col items-center bg-slate-700 rounded-lg p-4 w-full">
                  <span className="font-medium mb-1">Overall Attendance</span>
                  <span className="text-2xl font-bold mb-2">{overallAttendance}%</span>
                  <Progress value={overallAttendance} className="w-full h-2" />
                </div>
              </div>
              
              {/* Attendance Cards */}
              <div className="flex flex-col gap-3">
                {subjects.map((subject) => {
                  const att = Math.round((subject.attended / subject.totalClasses) * 100) || 0;
                  return (
                    <div key={subject.code} className="bg-slate-700/70 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="font-semibold text-white flex-1">{subject.name}</div>
                        <span
                          className={`px-3 py-1 rounded-xl font-semibold text-xs ml-2 ${
                            att >= 75
                              ? "bg-green-200 text-green-800"
                              : att >= 60
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-red-200 text-red-800"
                          }`}
                        >
                          {att}%
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                        <div>
                          <div className="text-gray-400">Code</div>
                          <div className="text-blue-200">{subject.code}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Faculty</div>
                          <div className="text-blue-200">{subject.teacher}</div>
                        </div>
                      </div>
                      <div className="flex justify-between text-sm bg-slate-800 rounded-lg p-3">
                        <div>
                          <div className="text-gray-400">Classes Held</div>
                          <div className="text-blue-200 font-semibold">{subject.totalClasses}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Attended</div>
                          <div className="text-blue-200 font-semibold">{subject.attended}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Missed</div>
                          <div className="text-red-300 font-semibold">{subject.totalClasses - subject.attended}</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          
          {activeTab === "timetable" && (
            <div className="bg-slate-800 rounded-2xl shadow-lg p-4 text-white text-center">
              <div className="font-semibold mb-4">Timetable</div>
              <div>Your timetable will be displayed here.</div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
