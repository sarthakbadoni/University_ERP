import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import StudentDashboard from "./components/Dashboard";
import FacultyDashboard from "./components/faculty/FacultyDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import "./styles/appglobals.css";

// Mock data
const mockStudentData = {
  name: "Arjun Sharma",
  studentId: "STU2021001",
  universityRollNo: "21SCSE1234567",
  classRollNo: "45",
  email: "arjun.sharma@university.edu",
  enrollmentNumber: "EN2021001234",
  course: "B.Tech",
  branch: "Computer Science Engineering",
  specialization: "Artificial Intelligence",
  semester: "6",
  photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  highschoolPercentage: "92%",
  intermediatePercentage: "88%",
  fatherName: "Rajesh Sharma",
  motherName: "Priya Sharma",
  section: "A",
};

const mockFacultyData = {
  userId: "FAC001",
  name: "Dr. John Smith",
  email: "john.smith@university.edu",
  phone: "+1 (555) 123-4567",
  department: "Computer Science",
  designation: "Associate Professor",
  qualification: "Ph.D. in Computer Science",
  experience: "12 years",
};

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (user.type === "student") {
    return (
      <StudentDashboard studentData={mockStudentData} onLogout={handleLogout} />
    );
  }

  if (user.type === "faculty") {
    return (
      <FacultyDashboard facultyData={mockFacultyData} onLogout={handleLogout} />
    );
  }

  if (user.type === "admin") {
    return (
      <AdminDashboard onLogout={handleLogout} />
    );
  }

  return null;
}
