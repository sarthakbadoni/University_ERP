import React from "react";
const sections = [
  { id: "dashboard", label: "Dashboard" },
  { id: "attendance", label: "Manage Attendance" },
  { id: "students", label: "Student List" },
  { id: "announcements", label: "Circulars/Announcements" },
  { id: "timetable", label: "Class Timetable" },
  { id: "resources", label: "Resource Uploads" },
  { id: "feedback", label: "Feedback/Grievances" },
  { id: "profile", label: "Profile Section" },
];
export default function FacultySidebar({ activeSection, onSectionChange, isOpen, onClose }) {
  return (
    <aside className={`min-h-screen bg-gradient-to-b from-indigo-700 to-violet-900 text-white md:w-64 w-full p-4 flex flex-col z-50 fixed md:static top-0 left-0 transition-all ${isOpen ? "block" : "hidden md:block"}`} style={{maxWidth:"16rem"}}>
      <div className="mb-8 mt-2 text-xl font-bold flex justify-between items-center">
        Navigation
        <button className="md:hidden px-2 text-white" onClick={onClose}>
          X
        </button>
      </div>
      <nav className="flex-1">
        {sections.map(section =>
          <button key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`flex items-center gap-3 py-3 px-4 rounded-lg w-full text-left transition ${activeSection === section.id ? "bg-white bg-opacity-10 font-semibold hover:bg-white hover:bg-opacity-5" : ""}`}>
            {section.label}
          </button>
        )}
      </nav>
    </aside>
  );
}
