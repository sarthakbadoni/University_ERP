import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Badge } from "../../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Search, Plus, Edit, Trash2, Download, Mail, ArrowLeft } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../ui/alert-dialog";

export default function ManageStudents({ onSectionChange }) {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Arjun Sharma",
      studentId: "STU2021001",
      email: "arjun.sharma@university.edu",
      course: "B.Tech",
      branch: "Computer Science",
      semester: "6",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Patel",
      studentId: "STU2021002",
      email: "priya.patel@university.edu",
      course: "B.Tech",
      branch: "Electrical Engineering",
      semester: "4",
      status: "Active",
    },
    {
      id: 3,
      name: "Rahul Kumar",
      studentId: "STU2021003",
      email: "rahul.kumar@university.edu",
      course: "B.Tech",
      branch: "Mechanical Engineering",
      semester: "6",
      status: "Active",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterBranch, setFilterBranch] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteStudentId, setDeleteStudentId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [newStudent, setNewStudent] = useState({
    name: "",
    studentId: "",
    email: "",
    course: "",
    branch: "",
    specialization: "",
    semester: "",
    section: "",
    classRollNumber: "",
    universityRollNumber: "",
    status: "Active",
  });

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = filterCourse === "all" || student.course === filterCourse;
    const matchesBranch = filterBranch === "all" || student.branch === filterBranch;
    return matchesSearch && matchesCourse && matchesBranch;
  });

  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.studentId || !newStudent.email) {
      alert("Please fill in all required fields");
      return;
    }
    setStudents([...students, { ...newStudent, id: students.length + 1 }]);
    setNewStudent({
      name: "",
      studentId: "",
      email: "",
      course: "",
      branch: "",
      specialization: "",
      semester: "",
      section: "",
      classRollNumber: "",
      universityRollNumber: "",
      status: "Active",
    });
    setIsAddDialogOpen(false);
    alert("Student added successfully!");
  };

  const handleEditStudent = () => {
    if (!editingStudent.name || !editingStudent.studentId || !editingStudent.email) {
      alert("Please fill in all required fields");
      return;
    }
    setStudents(
      students.map((s) => (s.id === editingStudent.id ? editingStudent : s))
    );
    setIsEditDialogOpen(false);
    setEditingStudent(null);
    alert("Student updated successfully!");
  };

  const handleDeleteStudent = () => {
    setStudents(students.filter((s) => s.id !== deleteStudentId));
    setDeleteStudentId(null);
    alert("Student deleted successfully!");
  };

  const openEditDialog = (student) => {
    setEditingStudent({ ...student });
    setIsEditDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {onSectionChange && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSectionChange("overview")}
                  className="text-slate-400 hover:text-slate-100 hover:bg-slate-700"
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              )}
              <CardTitle className="text-blue-400">Manage Students</CardTitle>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-slate-100">Add New Student</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Full Name *</Label>
                      <Input
                        placeholder="Enter student name"
                        value={newStudent.name}
                        onChange={(e) =>
                          setNewStudent({ ...newStudent, name: e.target.value })
                        }
                        className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Student ID *</Label>
                      <Input
                        placeholder="STU2025XXX"
                        value={newStudent.studentId}
                        onChange={(e) =>
                          setNewStudent({ ...newStudent, studentId: e.target.value })
                        }
                        className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label className="text-slate-300">Email *</Label>
                      <Input
                        type="email"
                        placeholder="student@university.edu"
                        value={newStudent.email}
                        onChange={(e) =>
                          setNewStudent({ ...newStudent, email: e.target.value })
                        }
                        className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Course</Label>
                      <Select
                        value={newStudent.course}
                        onValueChange={(value) =>
                          setNewStudent({ ...newStudent, course: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="B.Tech">B.Tech</SelectItem>
                          <SelectItem value="M.Tech">M.Tech</SelectItem>
                          <SelectItem value="BCA">BCA</SelectItem>
                          <SelectItem value="MCA">MCA</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300">Branch</Label>
                      <Select
                        value={newStudent.branch}
                        onValueChange={(value) =>
                          setNewStudent({ ...newStudent, branch: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                          <SelectValue placeholder="Select branch" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Computer Science">Computer Science</SelectItem>
                          <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                          <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                          <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300">Specialization</Label>
                      <Select
                        value={newStudent.specialization}
                        onValueChange={(value) =>
                          setNewStudent({ ...newStudent, specialization: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                          <SelectValue placeholder="Select specialization" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Core">Core</SelectItem>
                          <SelectItem value="AI/ML">AI/ML</SelectItem>
                          <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                          <SelectItem value="Data Science">Data Science</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300">Semester</Label>
                      <Select
                        value={newStudent.semester}
                        onValueChange={(value) =>
                          setNewStudent({ ...newStudent, semester: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                          <SelectValue placeholder="Select semester" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                            <SelectItem key={sem} value={sem.toString()}>
                              Semester {sem}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300">Section</Label>
                      <Select
                        value={newStudent.section}
                        onValueChange={(value) =>
                          setNewStudent({ ...newStudent, section: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Section A</SelectItem>
                          <SelectItem value="B">Section B</SelectItem>
                          <SelectItem value="C">Section C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300">Class Roll Number</Label>
                      <Input
                        placeholder="e.g., 101"
                        value={newStudent.classRollNumber}
                        onChange={(e) =>
                          setNewStudent({ ...newStudent, classRollNumber: e.target.value })
                        }
                        className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">University Roll Number</Label>
                      <Input
                        placeholder="e.g., 2021BTCS001"
                        value={newStudent.universityRollNumber}
                        onChange={(e) =>
                          setNewStudent({ ...newStudent, universityRollNumber: e.target.value })
                        }
                        className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Status</Label>
                      <Select
                        value={newStudent.status}
                        onValueChange={(value) =>
                          setNewStudent({ ...newStudent, status: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                          <SelectItem value="Graduated">Graduated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    onClick={handleAddStudent}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Add Student
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search by name or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-slate-100 placeholder:text-slate-400"
              />
            </div>
            <Select value={filterCourse} onValueChange={setFilterCourse}>
              <SelectTrigger className="w-full md:w-48 bg-slate-700 border-slate-600 text-slate-100">
                <SelectValue placeholder="Filter by course" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                <SelectItem value="B.Tech">B.Tech</SelectItem>
                <SelectItem value="M.Tech">M.Tech</SelectItem>
                <SelectItem value="BCA">BCA</SelectItem>
                <SelectItem value="MCA">MCA</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBranch} onValueChange={setFilterBranch}>
              <SelectTrigger className="w-full md:w-48 bg-slate-700 border-slate-600 text-slate-100">
                <SelectValue placeholder="Filter by branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Electrical Engineering">Electrical Engineering</SelectItem>
                <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              className="hidden md:flex bg-slate-700 border-slate-600 text-slate-100 hover:bg-slate-600"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Desktop Table View */}
          <div className="hidden md:block rounded-lg border border-slate-700 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-700/50 border-slate-600 hover:bg-slate-700/50">
                  <TableHead className="text-slate-300">Student ID</TableHead>
                  <TableHead className="text-slate-300">Name</TableHead>
                  <TableHead className="text-slate-300">Email</TableHead>
                  <TableHead className="text-slate-300">Course</TableHead>
                  <TableHead className="text-slate-300">Branch</TableHead>
                  <TableHead className="text-slate-300">Semester</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow
                    key={student.id}
                    className="border-slate-700 hover:bg-slate-700/30"
                  >
                    <TableCell className="text-slate-200">{student.studentId}</TableCell>
                    <TableCell className="text-slate-200">{student.name}</TableCell>
                    <TableCell className="text-slate-400">{student.email}</TableCell>
                    <TableCell className="text-slate-200">{student.course}</TableCell>
                    <TableCell className="text-slate-200">{student.branch}</TableCell>
                    <TableCell className="text-slate-200">{student.semester}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          student.status === "Active"
                            ? "default"
                            : student.status === "Graduated"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {student.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                          onClick={() => openEditDialog(student)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-slate-700"
                          onClick={() => setDeleteStudentId(student.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="text-slate-300 text-sm mb-1">Student ID</div>
                    <div className="text-slate-100 font-medium">{student.studentId}</div>
                  </div>
                  <Badge
                    variant={
                      student.status === "Active"
                        ? "default"
                        : student.status === "Graduated"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {student.status}
                  </Badge>
                </div>
                <div className="mb-2">
                  <div className="text-slate-300 text-sm mb-1">Name</div>
                  <div className="text-slate-100">{student.name}</div>
                </div>
                <div className="mb-3">
                  <div className="text-slate-300 text-sm mb-1">Email</div>
                  <div className="text-slate-400 text-sm break-all">{student.email}</div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                  <div>
                    <div className="text-slate-300 mb-1">Course</div>
                    <div className="text-slate-100">{student.course}</div>
                  </div>
                  <div>
                    <div className="text-slate-300 mb-1">Semester</div>
                    <div className="text-slate-100">{student.semester}</div>
                  </div>
                </div>
                <div className="mb-3">
                  <div className="text-slate-300 text-sm mb-1">Branch</div>
                  <div className="text-slate-100 text-sm">{student.branch}</div>
                </div>
                <div className="flex gap-2 pt-2 border-t border-slate-600">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex-1 text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                    onClick={() => openEditDialog(student)}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex-1 text-red-400 hover:text-red-300 hover:bg-slate-700"
                    onClick={() => setDeleteStudentId(student.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-sm text-slate-400">
            Showing {filteredStudents.length} of {students.length} students
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {editingStudent && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-slate-100">Edit Student</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Full Name *</Label>
                  <Input
                    value={editingStudent.name}
                    onChange={(e) =>
                      setEditingStudent({ ...editingStudent, name: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Student ID *</Label>
                  <Input
                    value={editingStudent.studentId}
                    onChange={(e) =>
                      setEditingStudent({
                        ...editingStudent,
                        studentId: e.target.value,
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label className="text-slate-300">Email *</Label>
                  <Input
                    type="email"
                    value={editingStudent.email}
                    onChange={(e) =>
                      setEditingStudent({ ...editingStudent, email: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Course</Label>
                  <Select
                    value={editingStudent.course}
                    onValueChange={(value) =>
                      setEditingStudent({ ...editingStudent, course: value })
                    }
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="B.Tech">B.Tech</SelectItem>
                      <SelectItem value="M.Tech">M.Tech</SelectItem>
                      <SelectItem value="BCA">BCA</SelectItem>
                      <SelectItem value="MCA">MCA</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Branch</Label>
                  <Select
                    value={editingStudent.branch}
                    onValueChange={(value) =>
                      setEditingStudent({ ...editingStudent, branch: value })
                    }
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science">Computer Science</SelectItem>
                      <SelectItem value="Electrical Engineering">
                        Electrical Engineering
                      </SelectItem>
                      <SelectItem value="Mechanical Engineering">
                        Mechanical Engineering
                      </SelectItem>
                      <SelectItem value="Civil Engineering">Civil Engineering</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Specialization</Label>
                  <Select
                    value={editingStudent.specialization || ""}
                    onValueChange={(value) =>
                      setEditingStudent({ ...editingStudent, specialization: value })
                    }
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Core">Core</SelectItem>
                      <SelectItem value="AI/ML">AI/ML</SelectItem>
                      <SelectItem value="Cyber Security">Cyber Security</SelectItem>
                      <SelectItem value="Data Science">Data Science</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Semester</Label>
                  <Select
                    value={editingStudent.semester}
                    onValueChange={(value) =>
                      setEditingStudent({ ...editingStudent, semester: value })
                    }
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                        <SelectItem key={sem} value={sem.toString()}>
                          Semester {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Section</Label>
                  <Select
                    value={editingStudent.section}
                    onValueChange={(value) =>
                      setEditingStudent({ ...editingStudent, section: value })
                    }
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Section A</SelectItem>
                      <SelectItem value="B">Section B</SelectItem>
                      <SelectItem value="C">Section C</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Class Roll Number</Label>
                  <Input
                    placeholder="e.g., 101"
                    value={editingStudent.classRollNumber || ""}
                    onChange={(e) =>
                      setEditingStudent({ ...editingStudent, classRollNumber: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">University Roll Number</Label>
                  <Input
                    placeholder="e.g., 2021BTCS001"
                    value={editingStudent.universityRollNumber || ""}
                    onChange={(e) =>
                      setEditingStudent({ ...editingStudent, universityRollNumber: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Status</Label>
                  <Select
                    value={editingStudent.status}
                    onValueChange={(value) =>
                      setEditingStudent({ ...editingStudent, status: value })
                    }
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                      <SelectItem value="Graduated">Graduated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={handleEditStudent}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Update Student
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={deleteStudentId !== null}
        onOpenChange={() => setDeleteStudentId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this student? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteStudent}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
