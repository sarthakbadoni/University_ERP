import React, { useState } from "react";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";
import AdminOverview from "./sections/AdminOverview";
import ManageStudents from "./sections/ManageStudents";
import ManageFaculty from "./sections/ManageFaculty";
import ManageCourses from "./sections/ManageCourses";
import ManageTimetables from "./sections/ManageTimetables";
import ManageCirculars from "./sections/ManageCirculars";
import ManageFees from "./sections/ManageFees";
import ManageExams from "./sections/ManageExams";
import ManageHostel from "./sections/ManageHostel";
import ManageGrievances from "./sections/ManageGrievances";
import SystemSettings from "./sections/SystemSettings";

export default function AdminDashboard({ onLogout }) {
  const [activeSection, setActiveSection] = useState("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuToggle = () => setIsSidebarOpen((prev) => !prev);
  const handleSidebarClose = () => setIsSidebarOpen(false);

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <AdminOverview onSectionChange={setActiveSection} />;
      case "students":
        return <ManageStudents onSectionChange={setActiveSection} />;
      case "faculty":
        return <ManageFaculty onSectionChange={setActiveSection} />;
      case "courses":
        return <ManageCourses onSectionChange={setActiveSection} />;
      case "timetables":
        return <ManageTimetables onSectionChange={setActiveSection} />;
      case "circulars":
        return <ManageCirculars onSectionChange={setActiveSection} />;
      case "fees":
        return <ManageFees onSectionChange={setActiveSection} />;
      case "exams":
        return <ManageExams onSectionChange={setActiveSection} />;
      case "hostel":
        return <ManageHostel onSectionChange={setActiveSection} />;
      case "grievances":
        return <ManageGrievances onSectionChange={setActiveSection} />;
      case "settings":
        return <SystemSettings onSectionChange={setActiveSection} />;
      default:
        return <div className="text-white">Section not found.</div>;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col">
      <AdminHeader
        onLogout={onLogout}
        onMenuClick={handleMenuToggle}
      />
      <div className="flex flex-1 w-full relative">
        <AdminSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
        />
        <main className="flex-1 flex justify-center items-start pt-8 pb-24 px-2 md:px-6">
          <div className="w-full max-w-7xl mx-auto">{renderContent()}</div>
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
