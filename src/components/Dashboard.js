import React, { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import BottomNavigation from "./BottomNavigation";
import StudentCard from "./StudentCard";
import AcademicSection from "./sections/AcademicSection";
import FeeSection from "./sections/FeeSection";
import CircularSection from "./sections/CircularSection";
import ExamSection from "./sections/ExamSection";
import PlacementSection from "./sections/PlacementSection";
import HostelSection from "./sections/HostelSection";
import GrievanceSection from "./sections/GrievanceSection";

export default function Dashboard({ studentData, onLogout }) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuToggle = () => setIsSidebarOpen((prev) => !prev);
  const handleSidebarClose = () => setIsSidebarOpen(false);

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <StudentCard student={studentData} />;
      case "academic":
        return <AcademicSection />;
      case "fee":
        return <FeeSection />;
      case "circular":
        return <CircularSection />;
      case "exam":
        return <ExamSection />;
      case "placement":
        return <PlacementSection />;
      case "hostel":
        return <HostelSection />;
      case "grievance":
        return <GrievanceSection />;
      default:
        return <div>Section not found.</div>;
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen flex flex-col">
      <Header
        studentName={studentData?.name}
        studentPhoto={studentData?.photo}
        onLogout={onLogout}
        onMenuClick={handleMenuToggle}
      />
      <div className="flex flex-1 w-full relative">
        <Sidebar
          activeSection={activeSection}
          onSectionChange={(id) => {
            setActiveSection(id);
            setIsSidebarOpen(false);
          }}
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
        />
        {/* Center content horizontally in all remaining space */}
        <main className="flex-1 flex justify-center items-start pt-8 pb-24 px-2 md:px-0">
          <div className="w-full max-w-3xl mx-auto">
            {renderContent()}
          </div>
        </main>
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
            onClick={handleSidebarClose}
            aria-hidden="true"
          />
        )}
      </div>
      <BottomNavigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
    </div>
  );
}
