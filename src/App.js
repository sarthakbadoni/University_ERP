import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';


const mockStudentData = {
  name: 'Arjun Sharma',
  studentId: 'CS21001',
  universityRollNo: '2021CSE001',  
  classRollNo: '21CSE01',
  email: 'arjun.sharma@university.edu.in',
  course: 'Bachelor of Technology',
  college: 'Institute of Technology and Engineering',
  specialization: 'Computer Science and Engineering',
  semester: '6th Semester',
  branch: 'Computer Science and Engineering',
  enrollmentNumber: 'EN21001CSE',
  highschoolPercentage: '92.5%',
  intermediatePercentage: '88.2%',
  status: 'Active',
  fatherName: 'Rajesh Sharma',
  motherName: 'Priya Sharma',
  photo: 'https://images.unsplash.com/photo-1585688495161-3235fa75eef0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcG9ydHJhaXQlMjB1bml2ZXJzaXR5fGVufDF8fHx8MTc1NzgzNDUxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentData, setStudentData] = useState(mockStudentData);

  const handleLogin = (studentId) => {
    // In a real application, you would fetch student data based on the studentId
    // For now, we'll use mock data
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div className="size-full dark">
      {isLoggedIn ? (
        <Dashboard 
          studentData={studentData} 
          onLogout={handleLogout} 
        />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}