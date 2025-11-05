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

import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Users,
  ClipboardCheck,
  BookOpen,
  TrendingUp,
  Calendar,
  Bell,
} from "lucide-react";

export default function FacultyDashboard({ facultyData, onLogout }) {
  const [activeSection, setActiveSection] = React.useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const handleMenuToggle = () => setIsSidebarOpen((prev) => !prev);
  const handleSidebarClose = () => setIsSidebarOpen(false);

  // Section content routing
  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <DashboardHome facultyData={facultyData} onSectionChange={setActiveSection} />;
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
        onNotificationClick={() => setActiveSection('announcements')}
      />
      <div className="flex flex-1 w-full relative">
        <FacultySidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isOpen={isSidebarOpen}
          onClose={handleSidebarClose}
        />
        <main className="flex-1 flex justify-center items-start pt-8 pb-24 px-2 md:px-6">
          <div className="w-full max-w-6xl mx-auto">{renderContent()}</div>
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

// Dashboard Home section
function DashboardHome({ facultyData, onSectionChange }) {
  const quickStats = [
    {
      title: "Total Students",
      value: "115",
      icon: Users,
      color: "bg-blue-600",
      change: "+5 this week",
    },
    {
      title: "Today's Classes",
      value: "3",
      icon: BookOpen,
      color: "bg-green-600",
      change: "3 sections today",
    },
    {
      title: "Pending Tasks",
      value: "8",
      icon: ClipboardCheck,
      color: "bg-orange-600",
      change: "4 assignments to grade",
    },
    {
      title: "Avg Attendance",
      value: "89%",
      icon: TrendingUp,
      color: "bg-purple-600",
      change: "+3% from last month",
    },
  ];

  const upcomingClasses = [
    {
      time: "09:00 AM - 10:30 AM",
      courseCode: "CS101",
      subject: "Introduction to Programming",
      section: "Section A",
      room: "Room 301",
    },
    {
      time: "11:00 AM - 12:30 PM",
      courseCode: "CS201",
      subject: "Data Structures",
      section: "Section B",
      room: "Room 205",
    },
    {
      time: "02:00 PM - 03:30 PM",
      courseCode: "CS301",
      subject: "Algorithms",
      section: "Section A",
      room: "Room 401",
    },
  ];

  const recentAnnouncements = [
    {
      title: "Midterm Exam Schedule",
      date: "2025-10-25",
      priority: "high",
    },
    {
      title: "Assignment Deadline Extended",
      date: "2025-10-26",
      priority: "medium",
    },
    {
      title: "Guest Lecture Tomorrow",
      date: "2025-10-27",
      priority: "low",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-0">
        <CardContent className="p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl mb-2">
            Welcome back, {facultyData?.name || "Faculty"}!
          </h2>
          <p className="text-sm sm:text-base text-blue-100">
            Here's what's happening with your courses today
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="text-2xl text-slate-100 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-xs text-slate-500">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="h-5 w-5 text-blue-400 shrink-0" />
              <h3 className="text-slate-100">
                Today's Schedule
              </h3>
            </div>
            <div className="space-y-3">
              {upcomingClasses.map((cls, index) => (
                <div
                  key={index}
                  className="p-3 bg-slate-700 rounded-lg border border-slate-600"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="bg-blue-600 hover:bg-blue-700 shrink-0">{cls.courseCode}</Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-300 shrink-0">{cls.section}</Badge>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">
                      {cls.time}
                    </span>
                  </div>
                  <p className="text-sm text-slate-100 mb-1 break-words">
                    {cls.subject}
                  </p>
                  <p className="text-xs text-slate-500">{cls.room}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-2 mb-4">
              <Bell className="h-5 w-5 text-blue-400 shrink-0" />
              <h3 className="text-slate-100">
                Recent Announcements
              </h3>
            </div>
            <div className="space-y-3">
              {recentAnnouncements.map((announcement, index) => (
                <div
                  key={index}
                  className="p-3 bg-slate-700 rounded-lg border border-slate-600"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                    <p className="text-sm text-slate-100 break-words flex-1">
                      {announcement.title}
                    </p>
                    <Badge
                      variant={
                        announcement.priority === "high"
                          ? "destructive"
                          : announcement.priority === "medium"
                            ? "default"
                            : "secondary"
                      }
                      className="shrink-0 self-start sm:self-auto"
                    >
                      {announcement.priority}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-500">{announcement.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-4 sm:p-6">
          <h3 className="text-slate-100 mb-3">
            Quick Actions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button 
              onClick={() => onSectionChange('attendance')}
              className="p-3 sm:p-4 bg-blue-900/20 rounded-lg hover:bg-blue-900/30 transition-colors text-center border border-blue-800/30"
            >
              <ClipboardCheck className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-slate-300">
                Mark Attendance
              </p>
            </button>
            <button 
              onClick={() => onSectionChange('resources')}
              className="p-3 sm:p-4 bg-green-900/20 rounded-lg hover:bg-green-900/30 transition-colors text-center border border-green-800/30"
            >
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-slate-300">
                Upload Resource
              </p>
            </button>
            <button 
              onClick={() => onSectionChange('announcements')}
              className="p-3 sm:p-4 bg-purple-900/20 rounded-lg hover:bg-purple-900/30 transition-colors text-center border border-purple-800/30"
            >
              <Bell className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-slate-300">
                Post Announcement
              </p>
            </button>
            <button 
              onClick={() => onSectionChange('students')}
              className="p-3 sm:p-4 bg-orange-900/20 rounded-lg hover:bg-orange-900/30 transition-colors text-center border border-orange-800/30"
            >
              <Users className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 mx-auto mb-2" />
              <p className="text-xs sm:text-sm text-slate-300">
                View Students
              </p>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
