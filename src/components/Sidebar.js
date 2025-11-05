import React from "react";
import {
  LayoutDashboard,
  GraduationCap,
  DollarSign,
  FileText,
  BookOpen,
  Building,
  BedSingle,
  MessageSquare,
  Star,
  FolderOpen,
  X,
} from "lucide-react";

const sections = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "academic", label: "Academic", icon: GraduationCap },
  { id: "fee", label: "Fee", icon: DollarSign },
  { id: "circular", label: "Circular", icon: FileText },
  { id: "exam", label: "Exam", icon: BookOpen },
  { id: "placement", label: "Placement", icon: Building },
  { id: "hostel", label: "Hostel", icon: BedSingle },
  { id: "grievance", label: "Grievance", icon: MessageSquare },
  { id: "feedback", label: "Feedback", icon: Star },
  { id: "resources", label: "Resources", icon: FolderOpen },
];

export default function Sidebar({ activeSection, onSectionChange, isOpen, onClose }) {
  return (
    <aside
      className={`min-h-screen bg-gradient-to-b from-indigo-700 to-violet-900 text-white md:w-64 w-full p-4 flex flex-col z-50 fixed md:static top-0 left-0 transition-all ${
        isOpen ? "block" : "hidden md:block"
      }`}
      style={{ maxWidth: "16rem" }}
    >
      <div className="mb-8 mt-2 text-xl font-bold flex justify-between items-center">
        Navigation
        <button className="md:hidden px-2 text-white" onClick={onClose}>
          <X size={24} />
        </button>
      </div>
      <nav className="flex-1">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className={`flex items-center gap-3 py-3 px-4 rounded-lg w-full text-left transition ${
              activeSection === section.id
                ? "bg-white bg-opacity-10 font-semibold"
                : "hover:bg-white hover:bg-opacity-5"
            }`}
          >
            <section.icon size={20} />
            {section.label}
          </button>
        ))}
      </nav>
      <div className="mt-auto p-4 bg-white bg-opacity-10 rounded-lg">
        <div className="font-semibold mb-1">Quick Access</div>
        <div className="text-xs opacity-80">Use the navigation above to access different modules</div>
      </div>
    </aside>
  );
}
