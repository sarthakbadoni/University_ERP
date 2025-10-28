import React, { useState } from "react";
import LoginPage from "./components/LoginPage";
import Dashboard from "./components/Dashboard";
import FacultyDashboard from "./components/faculty/FacultyDashboard";

// Place all imports at the top of the file!

const mockStudentData = {
  name: "Arjun Sharma",
  studentId: "CS21001",
  universityRollNo: "2021CSE001",
  classRollNo: "21CSE01",
  email: "arjun.sharma@university.edu.in",
  course: "Bachelor of Technology",
  college: "Institute of Technology and Engineering",
  specialization: "Computer Science and Engineering",
  semester: "6th Semester",
  branch: "Computer Science and Engineering",
  enrollmentNumber: "EN21001CSE",
  highschoolPercentage: "92.5%",
  intermediatePercentage: "88.2%",
  status: "Active",
  fatherName: "Rajesh Sharma",
  motherName: "Priya Sharma",
  photo: "https://images.unsplash.com/photo-1585688495161-3235fa75eef0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjB1bml2ZXJzaXR5fGVufDF8fHx8MTc1NzgzNDUxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
};

const mockFacultyData = {
  name: "Dr. Faculty",
  facultyId: "FAC10001",
  department: "CSE",
  email: "faculty@university.edu.in",
  photo: "https://ui-avatars.com/api/?name=Dr+Faculty"
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null); // "student" or "faculty"
  const [userData, setUserData] = useState({});

  const handleLogin = ({ type, data }) => {
    // Demo: Always use mock data!
    if (type === "student") {
      setUserData(mockStudentData);
    } else if (type === "faculty") {
      setUserData(mockFacultyData);
    }
    setUserType(type);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserType(null);
    setUserData({});
  };

  return (
    <div className="size-full dark">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : userType === "student" ? (
        <Dashboard studentData={userData} onLogout={handleLogout} />
      ) : (
        <FacultyDashboard facultyData={userData} onLogout={handleLogout} />
      )}
    </div>
  );
}
