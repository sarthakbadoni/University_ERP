import React from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardCheck,
  Megaphone,
  Calendar,
  BookOpen,
  MessageSquare,
  User,
} from "lucide-react";
import { cn } from "../ui/utils";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "attendance", label: "Attendance", icon: ClipboardCheck },
  { id: "students", label: "Students", icon: Users },
  { id: "announcements", label: "Announcements", icon: Megaphone },
  { id: "timetable", label: "Timetable", icon: Calendar },
  { id: "resources", label: "Resources", icon: BookOpen },
  { id: "feedback", label: "Feedback", icon: MessageSquare },
  { id: "profile", label: "Profile", icon: User },
];

export default function FacultySidebar({
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
        "fixed md:sticky top-[57px] left-0 h-[calc(100vh-57px)] bg-slate-800 border-r border-slate-700 transition-transform duration-300 ease-in-out z-50 w-64",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
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
                  ? "bg-blue-600 text-white"
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
