import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Search, Mail, Phone, Filter } from "lucide-react";

export default function FacultyStudentListSection() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCourse, setSelectedCourse] = React.useState("all");
  const [selectedBranch, setSelectedBranch] = React.useState("all");
  const [selectedSemester, setSelectedSemester] = React.useState("all");
  const [selectedSection, setSelectedSection] = React.useState("all");

  const students = [
    {
      id: "STU001",
      name: "Arjun Sharma",
      rollNo: "21SCSE001",
      email: "arjun.sharma@university.edu",
      phone: "+91 98765 43210",
      course: "B.Tech",
      branch: "CSE",
      semester: "6",
      section: "A",
      attendance: "92%",
    },
    {
      id: "STU002",
      name: "Priya Patel",
      rollNo: "21SCSE002",
      email: "priya.patel@university.edu",
      phone: "+91 98765 43211",
      course: "B.Tech",
      branch: "CSE",
      semester: "6",
      section: "A",
      attendance: "88%",
    },
    {
      id: "STU003",
      name: "Rahul Kumar",
      rollNo: "21SCSE003",
      email: "rahul.kumar@university.edu",
      phone: "+91 98765 43212",
      course: "B.Tech",
      branch: "CSE",
      semester: "6",
      section: "B",
      attendance: "95%",
    },
    {
      id: "STU004",
      name: "Sneha Singh",
      rollNo: "21SCSE004",
      email: "sneha.singh@university.edu",
      phone: "+91 98765 43213",
      course: "B.Tech",
      branch: "CSE",
      semester: "6",
      section: "B",
      attendance: "90%",
    },
    {
      id: "STU005",
      name: "Amit Verma",
      rollNo: "21SECE001",
      email: "amit.verma@university.edu",
      phone: "+91 98765 43214",
      course: "B.Tech",
      branch: "ECE",
      semester: "4",
      section: "A",
      attendance: "85%",
    },
    {
      id: "STU006",
      name: "Kavya Reddy",
      rollNo: "21SECE002",
      email: "kavya.reddy@university.edu",
      phone: "+91 98765 43215",
      course: "B.Tech",
      branch: "ECE",
      semester: "4",
      section: "A",
      attendance: "91%",
    },
    {
      id: "STU007",
      name: "Rohan Gupta",
      rollNo: "22SCSE001",
      email: "rohan.gupta@university.edu",
      phone: "+91 98765 43216",
      course: "B.Tech",
      branch: "CSE",
      semester: "4",
      section: "C",
      attendance: "87%",
    },
    {
      id: "STU008",
      name: "Ananya Joshi",
      rollNo: "21SMEC001",
      email: "ananya.joshi@university.edu",
      phone: "+91 98765 43217",
      course: "B.Tech",
      branch: "Mechanical",
      semester: "6",
      section: "A",
      attendance: "93%",
    },
  ];

  const filteredStudents = students.filter(
    (student) => {
      const matchesSearch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCourse = selectedCourse === "all" || student.course === selectedCourse;
      const matchesBranch = selectedBranch === "all" || student.branch === selectedBranch;
      const matchesSemester = selectedSemester === "all" || student.semester === selectedSemester;
      const matchesSection = selectedSection === "all" || student.section === selectedSection;

      return matchesSearch && matchesCourse && matchesBranch && matchesSemester && matchesSection;
    }
  );

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-xl text-slate-100">Student List</h2>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Filter className="h-4 w-4" />
              <span>{filteredStudents.length} student{filteredStudents.length !== 1 ? 's' : ''}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search by name or roll number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-700 border-slate-600 text-slate-100"
            />
          </div>

          {/* Filter Dropdowns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Course</label>
              <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                  <SelectValue placeholder="Select Course" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Courses</SelectItem>
                  <SelectItem value="B.Tech">B.Tech</SelectItem>
                  <SelectItem value="M.Tech">M.Tech</SelectItem>
                  <SelectItem value="BCA">BCA</SelectItem>
                  <SelectItem value="MCA">MCA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">Branch</label>
              <Select value={selectedBranch} onValueChange={setSelectedBranch}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                  <SelectValue placeholder="Select Branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Branches</SelectItem>
                  <SelectItem value="CSE">Computer Science</SelectItem>
                  <SelectItem value="ECE">Electronics</SelectItem>
                  <SelectItem value="Mechanical">Mechanical</SelectItem>
                  <SelectItem value="Civil">Civil</SelectItem>
                  <SelectItem value="EEE">Electrical</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">Semester</label>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                  <SelectValue placeholder="Select Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  <SelectItem value="1">Semester 1</SelectItem>
                  <SelectItem value="2">Semester 2</SelectItem>
                  <SelectItem value="3">Semester 3</SelectItem>
                  <SelectItem value="4">Semester 4</SelectItem>
                  <SelectItem value="5">Semester 5</SelectItem>
                  <SelectItem value="6">Semester 6</SelectItem>
                  <SelectItem value="7">Semester 7</SelectItem>
                  <SelectItem value="8">Semester 8</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-slate-400">Section</label>
              <Select value={selectedSection} onValueChange={setSelectedSection}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                  <SelectValue placeholder="Select Section" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sections</SelectItem>
                  <SelectItem value="A">Section A</SelectItem>
                  <SelectItem value="B">Section B</SelectItem>
                  <SelectItem value="C">Section C</SelectItem>
                  <SelectItem value="D">Section D</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <Card key={student.id} className="bg-slate-700 border-slate-600">
                <CardContent className="p-4">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="text-slate-100 mb-1 break-words">{student.name}</h3>
                      <p className="text-sm text-slate-400">Roll No: {student.rollNo}</p>
                    </div>
                    <Badge
                      className={`shrink-0 ${
                        parseInt(student.attendance) >= 90
                          ? "bg-green-600"
                          : parseInt(student.attendance) >= 75
                          ? "bg-yellow-600"
                          : "bg-red-600"
                      }`}
                    >
                      {student.attendance} Attendance
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-300 min-w-0">
                      <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                      <span className="break-all">{student.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-300">
                      <Phone className="h-4 w-4 text-slate-400 shrink-0" />
                      {student.phone}
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-4 text-sm text-slate-400 mt-2">
                      <span>Course: {student.course}</span>
                      <span>Branch: {student.branch}</span>
                      <span>Sem: {student.semester}</span>
                      <span>Sec: {student.section}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredStudents.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              No students found matching your search.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
