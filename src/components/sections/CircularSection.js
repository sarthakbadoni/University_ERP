import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Calendar, Download } from "lucide-react";

// DUMMY DATA
const circulars = [
  {
    id: 1,
    title: "Mid-Semester Examination Schedule",
    date: "2024-09-10",
    type: "Academic",
    priority: "High",
    description:
      "Mid-semester examinations will be conducted from September 25-30, 2024. Students are required to check their exam schedules.",
    attachmentCount: 1,
  },
  {
    id: 2,
    title: "Library Timings Update",
    date: "2024-09-08",
    type: "General",
    priority: "Medium",
    description:
      "Library will remain open till 10 PM on weekdays from September 15, 2024.",
    attachmentCount: 0,
  },
  {
    id: 3,
    title: "Technical Fest Registration",
    date: "2024-09-05",
    type: "Events",
    priority: "Medium",
    description:
      'Registration open for annual technical fest "TechnoVision 2024" till September 20.',
    attachmentCount: 2,
  },
  {
    id: 4,
    title: "Fee Payment Deadline Extension",
    date: "2024-09-03",
    type: "Finance",
    priority: "High",
    description:
      "Semester fee payment deadline extended to September 30, 2024.",
    attachmentCount: 1,
  },
  {
    id: 5,
    title: "Placement Drive - TCS",
    date: "2024-09-01",
    type: "Placement",
    priority: "High",
    description:
      "TCS campus placement drive scheduled for September 28-29, 2024.",
    attachmentCount: 3,
  },
];

const metrics = [
  { label: "Total Circulars", value: 5 },
  { label: "High Priority", value: 3 },
  { label: "This Week", value: 3 },
  { label: "Unread", value: 2, color: "text-orange-400" },
];

const priorityColor = {
  High: "bg-red-700 text-white",
  Medium: "bg-yellow-600 text-white",
  Low: "bg-gray-500 text-white",
};
const typeColor = {
  Academic: "bg-blue-100 text-blue-800",
  Placement: "bg-orange-200 text-orange-700",
  General: "bg-slate-200 text-slate-800",
  Events: "bg-purple-200 text-purple-700",
  Finance: "bg-green-100 text-green-700",
};

export default function CircularSection() {
  return (
    <div className="max-w-6xl mx-auto px-4 pt-8">
      <h1 className="text-3xl font-bold text-white mb-2">Circulars & Notices</h1>
      <div className="text-blue-200 mb-6">Welcome back, Arjun Sharma</div>

      {/* Metrics header */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-8">
        {metrics.map((m, i) => (
          <div
            className="bg-slate-800 shadow rounded-2xl p-5 text-center"
            key={m.label}
          >
            <div className="text-md sm:text-lg font-medium text-gray-300">
              {m.label}
            </div>
            <div
              className={
                "text-3xl md:text-4xl font-bold mt-2 " +
                (m.color ? m.color : "text-purple-400")
              }
            >
              {m.value}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Circulars Card */}
      <div className="bg-slate-800 rounded-2xl shadow-lg p-8 mb-6">
        <h2 className="text-lg font-semibold text-white mb-5">
          Recent Circulars
        </h2>
        {circulars.map((circular) => (
          <div
            key={circular.id}
            className="mb-6"
          >
            <div className="bg-slate-900 rounded-xl p-6 flex flex-col gap-2 shadow hover:shadow-lg transition-shadow">
              {/* Title row with badges and priority */}
              <div className="flex flex-wrap items-center gap-2 justify-between">
                <span className="text-lg font-bold text-white">
                  {circular.title}
                </span>
                <div className="flex gap-2 items-center">
                  <span
                    className={
                      "px-2 py-0.5 text-xs rounded font-semibold " +
                      (priorityColor[circular.priority] || "bg-gray-500 text-white")
                    }
                  >
                    {circular.priority}
                  </span>
                  <span
                    className={
                      "px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap " +
                      (typeColor[circular.type] || "bg-gray-200 text-gray-800")
                    }
                  >
                    {circular.type}
                  </span>
                </div>
              </div>
              {/* Description */}
              <div className="text-gray-300">{circular.description}</div>
              {/* Bottom row: date, attachments, buttons */}
              <div className="flex flex-wrap items-center justify-between mt-2 gap-3">
                <div className="flex items-center gap-5 text-sm">
                  <span className="flex items-center gap-1 text-gray-400">
                    <Calendar size={16} />
                    {circular.date}
                  </span>
                  {circular.attachmentCount > 0 && (
                    <span className="flex items-center gap-1 text-gray-400">
                      <Download size={16} />
                      {circular.attachmentCount} attachment
                      {circular.attachmentCount > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="bg-slate-800 text-gray-200 hover:bg-slate-700 hover:text-white"
                  >
                    View Details
                  </Button>
                  {circular.attachmentCount > 0 && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex gap-1 items-center bg-slate-900 text-white border-slate-700 hover:bg-slate-700"
                    >
                      <Download size={16} />
                      Download
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
