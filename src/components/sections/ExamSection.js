import React, { useState } from "react";
import { Download, Calendar, Clock } from "lucide-react";

// ------------------- DATA ARRAYS -------------------
const examCards = [
  {
    title: "Database Management Systems",
    code: "CS301",
    date: "2024-09-25",
    time: "09:00 AM - 12:00 PM",
    room: "Hall A-101",
    type: "Mid-Semester",
  },
  {
    title: "Software Engineering",
    code: "CS302",
    date: "2024-09-27",
    time: "02:00 PM - 05:00 PM",
    room: "Hall B-205",
    type: "Mid-Semester",
  },
  {
    title: "Computer Networks",
    code: "CS303",
    date: "2024-09-29",
    time: "09:00 AM - 12:00 PM",
    room: "Hall C-301",
    type: "Mid-Semester",
  },
];

const admitCards = [
  {
    label: "Mid-Semester Exam",
    sem: "Semester 6",
    date: "September 25-30, 2024",
    status: "Available",
  },
  {
    label: "End-Semester Exam",
    sem: "Semester 5",
    date: "May 10-20, 2024",
    status: "Downloaded",
  },
];

const resultsDatabase = [
  {
    term: "Mid Term",
    semester: "6",
    sgpa: 8.7,
    subjects: [
      { name: "Database Management Systems", code: "CS301", marks: 88, grade: "A+", pass: true },
      { name: "Software Engineering", code: "CS302", marks: 78, grade: "A", pass: true },
      { name: "Computer Networks", code: "CS303", marks: 74, grade: "B+", pass: true },
    ],
  },
  {
    term: "End Term",
    semester: "6",
    sgpa: 8.4,
    subjects: [
      { name: "Database Management Systems", code: "CS301", marks: 76, grade: "A", pass: true },
      { name: "Software Engineering", code: "CS302", marks: 64, grade: "B", pass: true },
      { name: "Computer Networks", code: "CS303", marks: 56, grade: "C", pass: false },
    ],
  },
  {
    term: "End Term",
    semester: "5",
    sgpa: 8.2,
    subjects: [
      { name: "Operating Systems", code: "CS304", marks: 85, grade: "A", pass: true },
      { name: "Web Technologies", code: "CS305", marks: 90, grade: "A+", pass: true },
      { name: "Computer Networks", code: "CS303", marks: 47, grade: "D", pass: false },
    ],
  },
];

const examTypes = ["Mid Term", "End Term"];
const semesters = [...new Set(resultsDatabase.map((r) => r.semester))];

const tabs = [
  { label: "Upcoming Exams", value: "upcoming" },
  { label: "Admit Cards", value: "admit" },
  { label: "Results", value: "result" }
];

export default function ExamSection() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [selectedType, setSelectedType] = useState("Mid Term");
  const [selectedSemester, setSelectedSemester] = useState(semesters[0]);

  const selectedResult = resultsDatabase.find(
    (r) => r.term === selectedType && r.semester === selectedSemester
  );
  const passCount = selectedResult?.subjects.filter((s) => s.pass).length || 0;
  const failCount = selectedResult?.subjects.filter((s) => !s.pass).length || 0;

  return (
    <div className="w-full max-w-3xl mx-auto px-2 pt-8 pb-20">
      {/* Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 text-center">Examinations</h1>
      <div className="text-blue-200 mb-6 text-center text-base sm:text-lg">
        Welcome back, Arjun Sharma
      </div>
      {/* Metrics Cards */}
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start mb-7">
        <div className="bg-[#232842] rounded-2xl px-6 py-4 flex-1 flex flex-col items-center w-full">
          <span className="font-medium text-gray-300 mb-1">Upcoming Exams</span>
          <span className="text-3xl font-bold text-blue-300">{examCards.length}</span>
        </div>
        <div className="bg-[#232842] rounded-2xl px-6 py-4 flex-1 flex flex-col items-center w-full">
          <span className="font-medium text-gray-300 mb-1">Next Exam</span>
          <span className="text-xl font-bold text-white">DBMS</span>
          <span className="text-lg text-blue-300 mt-1 font-semibold">Sep 25</span>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-2 mb-4 justify-center flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.value}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
              activeTab === tab.value
                ? "bg-blue-700 text-white"
                : "bg-[#181b25] text-blue-200 border border-slate-700"
            }`}
            onClick={() => setActiveTab(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Panels */}
      <div>
        {activeTab === "upcoming" && (
          <div className="flex flex-col gap-5 items-center">
            {examCards.map((exam) => (
              <div key={exam.code} className="bg-slate-900 rounded-xl px-4 py-4 w-full shadow gap-2 border border-slate-700">
                <div className="flex items-center justify-between gap-2 w-full">
                  <span className="text-base font-bold text-white">{exam.title}</span>
                  <span className="bg-slate-800 px-3 py-1 text-xs font-semibold rounded-full text-gray-100">
                    {exam.type}
                  </span>
                </div>
                <div className="text-blue-200 text-sm w-full text-left">{exam.code}</div>
                <div className="flex flex-wrap gap-3 my-1 w-full">
                  <span className="flex gap-1 items-center text-gray-400 text-sm">
                    <Calendar size={14} /> {exam.date}
                  </span>
                  <span className="flex gap-1 items-center text-gray-400 text-sm">
                    <Clock size={14} /> {exam.time}
                  </span>
                </div>
                <div className="text-gray-400 text-sm w-full text-left">
                  Room: {exam.room}
                </div>
              </div>
            ))}
          </div>
        )}
        {activeTab === "admit" && (
          <div className="flex flex-col gap-4 items-center">
            {admitCards.map((admit) => (
              <div key={admit.label} className="bg-slate-900 rounded-xl px-4 py-4 w-full shadow gap-2 border border-slate-700">
                <div className="flex items-center justify-between gap-2 w-full">
                  <span className="text-base font-bold text-white">{admit.label}</span>
                  <span className={
                    admit.status === "Available"
                      ? "bg-white px-3 py-1 text-xs font-semibold rounded-full text-gray-900"
                      : "bg-yellow-900 px-3 py-1 text-xs font-semibold rounded-full text-yellow-100"
                  }>
                    {admit.status}
                  </span>
                </div>
                <div className="text-blue-200 text-sm w-full text-left">{admit.sem}</div>
                <div className="text-gray-400 text-sm w-full text-left">{admit.date}</div>
                <button className="flex gap-2 items-center bg-slate-900 border border-slate-700 hover:bg-slate-800 px-4 py-2 rounded-lg text-white font-medium mt-2 transition">
                  <Download size={16} /> Download
                </button>
              </div>
            ))}
          </div>
        )}
        {activeTab === "result" && (
          <div>
            <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center justify-center">
              <select
                className="px-4 py-2 rounded bg-slate-900 text-blue-200 border border-slate-600 w-full max-w-[220px]"
                value={selectedType}
                onChange={(e) => {
                  setSelectedType(e.target.value);
                  setSelectedSemester(semesters[0]);
                }}
              >
                {examTypes.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              <select
                className="px-4 py-2 rounded bg-slate-900 text-blue-200 border border-slate-600 w-full max-w-[220px]"
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
              >
                {semesters.map((s) => (
                  <option key={s} value={s}>Semester {s}</option>
                ))}
              </select>
              <button
                className="bg-slate-900 px-6 py-2 rounded-lg text-white border border-slate-700 hover:bg-blue-800 flex gap-2 items-center font-semibold w-full max-w-[220px]"
                disabled={!selectedResult}
              >
                <Download size={17} /> Download Result
              </button>
            </div>
            {selectedResult ? (
              <div className="overflow-x-auto w-full">
                <table className="min-w-[340px] max-w-full border-separate border-spacing-y-2 mb-5 mx-auto">
                  <thead>
                    <tr className="text-blue-200 text-left text-base">
                      <th className="pb-2">Subject</th>
                      <th className="pb-2">Code</th>
                      <th className="pb-2">Marks</th>
                      <th className="pb-2">Grade</th>
                      <th className="pb-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedResult.subjects.map((subj) => (
                      <tr key={subj.code} className="bg-slate-700/60 hover:bg-slate-700 text-gray-100 text-[15px]">
                        <td className="py-2 px-2 font-medium">{subj.name}</td>
                        <td className="py-2 px-2">{subj.code}</td>
                        <td className="py-2 px-2">{subj.marks}</td>
                        <td className="py-2 px-2 font-bold">{subj.grade}</td>
                        <td className="py-2 px-2">
                          {subj.pass ? (
                            <span className="bg-green-200 text-green-800 px-4 py-1 rounded-full font-semibold">Pass</span>
                          ) : (
                            <span className="bg-red-200 text-red-800 px-4 py-1 rounded-full font-semibold">Fail</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex flex-col md:flex-row gap-3 items-center justify-center">
                  <span className="text-base font-semibold text-blue-300">
                    Semester SGPA: {selectedResult.sgpa}
                  </span>
                  <span className="text-base font-semibold text-green-400">
                    Passed: {passCount}
                  </span>
                  <span className="text-base font-semibold text-red-400">
                    Failed: {failCount}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-base mt-4 text-center">No result found for selected options.</div>
            )}
          </div>
        )}
      </div>
      {/* Bottom nav for mobile (optional) */}
      <div className="fixed z-30 bottom-0 left-0 w-full border-t border-slate-700 bg-[#191b25] p-2 flex justify-around text-xs text-blue-100 md:hidden">
        <div className="flex flex-col items-center"><span>🏠</span><span>Home</span></div>
        <div className="flex flex-col items-center"><span>📚</span><span>Academic</span></div>
        <div className="flex flex-col items-center"><span>📢</span><span>Notice</span></div>
        <div className="flex flex-col items-center"><span>💳</span><span>Fee</span></div>
        <div className="flex flex-col items-center"><span>⚙️</span><span>Settings</span></div>
      </div>
    </div>
  );
}
