import React from "react";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  Calendar,
  Megaphone,
  DollarSign,
  FileText,
  Building,
  MessageSquare,
  Settings,
  BookOpen,
  X,
} from "lucide-react";
import { cn } from "../ui/utils";

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "students", label: "Manage Students", icon: GraduationCap },
  { id: "faculty", label: "Manage Faculty", icon: Users },
  { id: "courses", label: "Course Management", icon: BookOpen },
  { id: "timetables", label: "Timetables", icon: Calendar },
  { id: "circulars", label: "Circulars", icon: Megaphone },
  { id: "fees", label: "Fee Management", icon: DollarSign },
  { id: "exams", label: "Examinations", icon: FileText },
  { id: "hostel", label: "Hostel Management", icon: Building },
  { id: "grievances", label: "Grievances", icon: MessageSquare },
  { id: "settings", label: "System Settings", icon: Settings },
];

export default function AdminSidebar({
  activeSection,
  onSectionChange,
  isOpen,
  onClose,
}) {
  const handleItemClick = (sectionId) => {
    onSectionChange(sectionId);
    onClose();
  };

  return (
    <aside
      className={cn(
        "fixed md:sticky top-[57px] left-0 h-[calc(100vh-57px)] bg-slate-800 border-r border-slate-700 transition-transform duration-300 ease-in-out z-50 w-64 overflow-y-auto",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="flex items-center justify-between p-4 md:hidden border-b border-slate-700">
        <span className="text-white">Menu</span>
        <button onClick={onClose} className="text-white">
          <X className="h-5 w-5" />
        </button>
      </div>
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left",
                activeSection === item.id
                  ? "bg-red-600 text-white"
                  : "text-slate-300 hover:bg-slate-700 hover:text-white"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
