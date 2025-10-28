import React from "react";
import FacultyHeader from "./FacultyHeader";
import FacultySidebar from "./FacultySidebar";
import FacultyAttendanceSection from "./FacultyAttendanceSection";
import FacultyStudentListSection from "./FacultyStudentListSection";
import FacultyAnnouncementSection from "./FacultyAnnouncementSection";
import FacultyTimetableSection from "./FacultyTimetableSection";
import FacultyResourceSection from "./FacultyResourceSection";
import FacultyFeedbackSection from "./FacultyFeedbackSection";
import FacultyProfileSection from "./FacultyProfileSection";

export default function FacultyDashboard({ facultyData, onLogout }) {
  const [activeSection, setActiveSection] = React.useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleMenuToggle = () => setIsSidebarOpen((prev) => !prev);
  const handleSidebarClose = () => setIsSidebarOpen(false);

  // Section content routing
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome facultyData={facultyData} />;
      case "attendance":
        return <FacultyAttendanceSection />;
      case "students":
        return <FacultyStudentListSection />;
      case "announcements":
        return <FacultyAnnouncementSection />;
      case "timetable":
        return <FacultyTimetableSection />;
      case "resources":
        return <FacultyResourceSection />;
      case "feedback":
        return <FacultyFeedbackSection />;
      case "profile":
        return <FacultyProfileSection facultyData={facultyData} />;
      default:
        return <div>Section not found.</div>;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col">
      <FacultyHeader
        facultyName={facultyData?.name || "Faculty"}
        onLogout={onLogout}
        onMenuClick={handleMenuToggle}
      />
      <div className="flex flex-1 w-full relative">
        <FacultySidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
        />
        <main className="flex-1 flex justify-center items-start pt-8 pb-24 px-2 md:px-0">
          <div className="w-full max-w-3xl mx-auto">{renderContent()}</div>
        </main>
      </div>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={handleSidebarClose}
          aria-hidden="true"
        ></div>
      )}
    </div>
  );
}

// Home section for the dashboard (can be split to its own file if you want)
function DashboardHome({ facultyData }) {
  return (
    <div className="w-full bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 mb-4">
      <h2 className="font-bold text-xl mb-2 text-blue-700">
        Welcome, {facultyData?.name || "Faculty"}!
      </h2>
      <ul className="text-base text-slate-700 dark:text-slate-300 mb-4">
        <li>Check today's class schedule and recent announcements below.</li>
        <li>Use the navigation to mark attendance, message students, or upload new material.</li>
      </ul>
    </div>
  );
}
