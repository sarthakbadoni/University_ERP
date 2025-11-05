import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
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
import {
  FileText,
  Plus,
  Edit,
  Trash2,
  Download,
  Calendar,
  Upload,
  ArrowLeft,
} from "lucide-react";
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

export default function ManageExams({ onSectionChange }) {
  const [activeTab, setActiveTab] = useState("schedules");
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const [deleteExamId, setDeleteExamId] = useState(null);
  const [editingExam, setEditingExam] = useState(null);

  const [examSchedules, setExamSchedules] = useState([
    {
      id: 1,
      examType: "Mid-Semester",
      course: "B.Tech",
      semester: "6",
      subject: "Database Management Systems",
      subjectCode: "CS301",
      date: "2025-11-15",
      time: "09:00 AM - 12:00 PM",
      duration: "3 hours",
      room: "Hall A-101",
      totalMarks: 50,
      passingMarks: 20,
      status: "Scheduled",
    },
    {
      id: 2,
      examType: "Mid-Semester",
      course: "B.Tech",
      semester: "6",
      subject: "Software Engineering",
      subjectCode: "CS302",
      date: "2025-11-17",
      time: "02:00 PM - 05:00 PM",
      duration: "3 hours",
      room: "Hall B-205",
      totalMarks: 50,
      passingMarks: 20,
      status: "Scheduled",
    },
    {
      id: 3,
      examType: "End-Semester",
      course: "B.Tech",
      semester: "5",
      subject: "Operating Systems",
      subjectCode: "CS304",
      date: "2025-10-20",
      time: "09:00 AM - 12:00 PM",
      duration: "3 hours",
      room: "Hall C-301",
      totalMarks: 100,
      passingMarks: 40,
      status: "Completed",
    },
  ]);

  const [examResults, setExamResults] = useState([
    {
      id: 1,
      studentId: "STU2021001",
      studentName: "Arjun Sharma",
      course: "B.Tech",
      semester: "5",
      subject: "Operating Systems",
      subjectCode: "CS304",
      marksObtained: 85,
      totalMarks: 100,
      grade: "A",
      status: "Pass",
      examType: "End-Semester",
    },
    {
      id: 2,
      studentId: "STU2021002",
      studentName: "Priya Patel",
      course: "B.Tech",
      semester: "5",
      subject: "Operating Systems",
      subjectCode: "CS304",
      marksObtained: 72,
      totalMarks: 100,
      grade: "B+",
      status: "Pass",
      examType: "End-Semester",
    },
    {
      id: 3,
      studentId: "STU2021003",
      studentName: "Rahul Kumar",
      course: "B.Tech",
      semester: "5",
      subject: "Operating Systems",
      subjectCode: "CS304",
      marksObtained: 35,
      totalMarks: 100,
      grade: "F",
      status: "Fail",
      examType: "End-Semester",
    },
  ]);

  const [newSchedule, setNewSchedule] = useState({
    examType: "",
    course: "",
    branch: "",
    specialization: "",
    semester: "",
    subject: "",
    subjectCode: "",
    date: "",
    time: "",
    duration: "",
    room: "",
    totalMarks: "",
    passingMarks: "",
  });

  const [newResult, setNewResult] = useState({
    studentId: "",
    studentName: "",
    course: "",
    semester: "",
    subject: "",
    subjectCode: "",
    marksObtained: "",
    totalMarks: "",
    examType: "",
  });

  const calculateGrade = (marks, total) => {
    const percentage = (marks / total) * 100;
    if (percentage >= 90) return "A+";
    if (percentage >= 80) return "A";
    if (percentage >= 70) return "B+";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";
    return "F";
  };

  const handleAddSchedule = () => {
    if (
      !newSchedule.examType ||
      !newSchedule.course ||
      !newSchedule.semester ||
      !newSchedule.subject ||
      !newSchedule.date
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingExam) {
      setExamSchedules(
        examSchedules.map((exam) =>
          exam.id === editingExam.id
            ? {
                ...newSchedule,
                id: editingExam.id,
                status: editingExam.status,
              }
            : exam
        )
      );
      alert("Exam schedule updated successfully!");
    } else {
      setExamSchedules([
        ...examSchedules,
        {
          ...newSchedule,
          id: examSchedules.length + 1,
          status: "Scheduled",
        },
      ]);
      alert("Exam schedule created successfully!");
    }

    resetScheduleForm();
    setIsScheduleDialogOpen(false);
  };

  const handleAddResult = () => {
    if (
      !newResult.studentId ||
      !newResult.subject ||
      !newResult.marksObtained ||
      !newResult.totalMarks
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const marks = parseInt(newResult.marksObtained);
    const total = parseInt(newResult.totalMarks);
    const grade = calculateGrade(marks, total);
    const status = marks >= total * 0.4 ? "Pass" : "Fail";

    setExamResults([
      ...examResults,
      {
        ...newResult,
        id: examResults.length + 1,
        marksObtained: marks,
        totalMarks: total,
        grade,
        status,
      },
    ]);

    setNewResult({
      studentId: "",
      studentName: "",
      course: "",
      semester: "",
      subject: "",
      subjectCode: "",
      marksObtained: "",
      totalMarks: "",
      examType: "",
    });
    setIsResultDialogOpen(false);
    alert("Result added successfully!");
  };

  const handleDeleteSchedule = () => {
    setExamSchedules(examSchedules.filter((exam) => exam.id !== deleteExamId));
    setDeleteExamId(null);
    alert("Exam schedule deleted successfully!");
  };

  const openEditDialog = (exam) => {
    setEditingExam(exam);
    setNewSchedule({
      examType: exam.examType,
      course: exam.course,
      branch: exam.branch || "",
      specialization: exam.specialization || "",
      semester: exam.semester,
      subject: exam.subject,
      subjectCode: exam.subjectCode,
      date: exam.date,
      time: exam.time,
      duration: exam.duration,
      room: exam.room,
      totalMarks: exam.totalMarks.toString(),
      passingMarks: exam.passingMarks.toString(),
    });
    setIsScheduleDialogOpen(true);
  };

  const resetScheduleForm = () => {
    setNewSchedule({
      examType: "",
      course: "",
      branch: "",
      specialization: "",
      semester: "",
      subject: "",
      subjectCode: "",
      date: "",
      time: "",
      duration: "",
      room: "",
      totalMarks: "",
      passingMarks: "",
    });
    setEditingExam(null);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Scheduled":
        return <Badge className="bg-blue-600">Scheduled</Badge>;
      case "Completed":
        return <Badge className="bg-green-600">Completed</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-600">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getResultBadge = (status) => {
    return status === "Pass" ? (
      <Badge className="bg-green-600">Pass</Badge>
    ) : (
      <Badge className="bg-red-600">Fail</Badge>
    );
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
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
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <FileText className="h-6 w-6" />
                Examination Management
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 bg-slate-700">
              <TabsTrigger
                value="schedules"
                className="data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100"
              >
                Exam Schedules
              </TabsTrigger>
              <TabsTrigger
                value="results"
                className="data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100"
              >
                Results
              </TabsTrigger>
            </TabsList>

            {/* Exam Schedules Tab */}
            <TabsContent value="schedules" className="space-y-4 mt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <p className="text-sm text-slate-400">
                  {examSchedules.length} exam schedules found
                </p>
                <Dialog
                  open={isScheduleDialogOpen}
                  onOpenChange={(open) => {
                    setIsScheduleDialogOpen(open);
                    if (!open) resetScheduleForm();
                  }}
                >
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Exam Schedule
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-slate-100">
                        {editingExam ? "Edit Exam Schedule" : "Create Exam Schedule"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-slate-300">Exam Type *</Label>
                          <Select
                            value={newSchedule.examType}
                            onValueChange={(value) =>
                              setNewSchedule({ ...newSchedule, examType: value })
                            }
                          >
                            <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Mid-Semester">Mid-Semester</SelectItem>
                              <SelectItem value="End-Semester">End-Semester</SelectItem>
                              <SelectItem value="Sessional">Sessional</SelectItem>
                              <SelectItem value="Practical">Practical</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-slate-300">Course *</Label>
                          <Select
                            value={newSchedule.course}
                            onValueChange={(value) =>
                              setNewSchedule({ ...newSchedule, course: value })
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
                            value={newSchedule.branch}
                            onValueChange={(value) =>
                              setNewSchedule({ ...newSchedule, branch: value })
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
                            value={newSchedule.specialization}
                            onValueChange={(value) =>
                              setNewSchedule({ ...newSchedule, specialization: value })
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
                          <Label className="text-slate-300">Semester *</Label>
                          <Select
                            value={newSchedule.semester}
                            onValueChange={(value) =>
                              setNewSchedule({ ...newSchedule, semester: value })
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
                          <Label className="text-slate-300">Subject Code *</Label>
                          <Input
                            placeholder="e.g., CS301"
                            value={newSchedule.subjectCode}
                            onChange={(e) =>
                              setNewSchedule({
                                ...newSchedule,
                                subjectCode: e.target.value,
                              })
                            }
                            className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label className="text-slate-300">Subject Name *</Label>
                          <Input
                            placeholder="e.g., Database Management Systems"
                            value={newSchedule.subject}
                            onChange={(e) =>
                              setNewSchedule({
                                ...newSchedule,
                                subject: e.target.value,
                              })
                            }
                            className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-300">Date *</Label>
                          <Input
                            type="date"
                            value={newSchedule.date}
                            onChange={(e) =>
                              setNewSchedule({ ...newSchedule, date: e.target.value })
                            }
                            className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-300">Time *</Label>
                          <Input
                            placeholder="09:00 AM - 12:00 PM"
                            value={newSchedule.time}
                            onChange={(e) =>
                              setNewSchedule({ ...newSchedule, time: e.target.value })
                            }
                            className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-300">Duration</Label>
                          <Input
                            placeholder="3 hours"
                            value={newSchedule.duration}
                            onChange={(e) =>
                              setNewSchedule({
                                ...newSchedule,
                                duration: e.target.value,
                              })
                            }
                            className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-300">Room/Hall</Label>
                          <Input
                            placeholder="Hall A-101"
                            value={newSchedule.room}
                            onChange={(e) =>
                              setNewSchedule({ ...newSchedule, room: e.target.value })
                            }
                            className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-300">Total Marks</Label>
                          <Input
                            type="number"
                            placeholder="100"
                            value={newSchedule.totalMarks}
                            onChange={(e) =>
                              setNewSchedule({
                                ...newSchedule,
                                totalMarks: e.target.value,
                              })
                            }
                            className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                          />
                        </div>
                        <div>
                          <Label className="text-slate-300">Passing Marks</Label>
                          <Input
                            type="number"
                            placeholder="40"
                            value={newSchedule.passingMarks}
                            onChange={(e) =>
                              setNewSchedule({
                                ...newSchedule,
                                passingMarks: e.target.value,
                              })
                            }
                            className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                          />
                        </div>
                      </div>
                      <Button
                        onClick={handleAddSchedule}
                        className="w-full bg-blue-600 hover:bg-blue-700"
                      >
                        {editingExam ? "Update Schedule" : "Create Schedule"}
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block rounded-lg border border-slate-700 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-700/50 border-slate-600 hover:bg-slate-700/50">
                      <TableHead className="text-slate-300">Exam Type</TableHead>
                      <TableHead className="text-slate-300">Subject</TableHead>
                      <TableHead className="text-slate-300">Course</TableHead>
                      <TableHead className="text-slate-300">Semester</TableHead>
                      <TableHead className="text-slate-300">Date</TableHead>
                      <TableHead className="text-slate-300">Time</TableHead>
                      <TableHead className="text-slate-300">Room</TableHead>
                      <TableHead className="text-slate-300">Marks</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examSchedules.map((exam) => (
                      <TableRow
                        key={exam.id}
                        className="border-slate-700 hover:bg-slate-700/30"
                      >
                        <TableCell>
                          <Badge variant="outline" className="border-slate-600 text-slate-300">
                            {exam.examType}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-200">
                          <div>
                            <p>{exam.subject}</p>
                            <p className="text-xs text-slate-400">{exam.subjectCode}</p>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-200">{exam.course}</TableCell>
                        <TableCell className="text-slate-200">{exam.semester}</TableCell>
                        <TableCell className="text-slate-200">{exam.date}</TableCell>
                        <TableCell className="text-slate-200">{exam.time}</TableCell>
                        <TableCell className="text-slate-200">{exam.room}</TableCell>
                        <TableCell className="text-slate-200">
                          {exam.totalMarks}/{exam.passingMarks}
                        </TableCell>
                        <TableCell>{getStatusBadge(exam.status)}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                              onClick={() => openEditDialog(exam)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-slate-700"
                              onClick={() => setDeleteExamId(exam.id)}
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
                {examSchedules.map((exam) => (
                  <div
                    key={exam.id}
                    className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <Badge variant="outline" className="border-slate-600 text-slate-300">
                        {exam.examType}
                      </Badge>
                      {getStatusBadge(exam.status)}
                    </div>
                    <div className="mb-3">
                      <div className="text-slate-100 font-medium mb-1">{exam.subject}</div>
                      <div className="text-slate-400 text-sm">{exam.subjectCode}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                      <div>
                        <div className="text-slate-300 mb-1">Course</div>
                        <div className="text-slate-100">{exam.course}</div>
                      </div>
                      <div>
                        <div className="text-slate-300 mb-1">Semester</div>
                        <div className="text-slate-100">{exam.semester}</div>
                      </div>
                      <div>
                        <div className="text-slate-300 mb-1">Date</div>
                        <div className="text-slate-100">{exam.date}</div>
                      </div>
                      <div>
                        <div className="text-slate-300 mb-1">Time</div>
                        <div className="text-slate-100 text-xs">{exam.time}</div>
                      </div>
                      <div>
                        <div className="text-slate-300 mb-1">Room</div>
                        <div className="text-slate-100">{exam.room}</div>
                      </div>
                      <div>
                        <div className="text-slate-300 mb-1">Marks</div>
                        <div className="text-slate-100">{exam.totalMarks}/{exam.passingMarks}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 pt-3 border-t border-slate-600">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-1 text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                        onClick={() => openEditDialog(exam)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="flex-1 text-red-400 hover:text-red-300 hover:bg-slate-700"
                        onClick={() => setDeleteExamId(exam.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Results Tab */}
            <TabsContent value="results" className="space-y-4 mt-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <p className="text-sm text-slate-400">
                  {examResults.length} results found
                </p>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                  <Dialog
                    open={isResultDialogOpen}
                    onOpenChange={setIsResultDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Result
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="text-slate-100">Add Exam Result</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-slate-300">Student ID *</Label>
                            <Input
                              placeholder="STU2021001"
                              value={newResult.studentId}
                              onChange={(e) =>
                                setNewResult({
                                  ...newResult,
                                  studentId: e.target.value,
                                })
                              }
                              className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Student Name *</Label>
                            <Input
                              placeholder="Student name"
                              value={newResult.studentName}
                              onChange={(e) =>
                                setNewResult({
                                  ...newResult,
                                  studentName: e.target.value,
                                })
                              }
                              className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Course *</Label>
                            <Select
                              value={newResult.course}
                              onValueChange={(value) =>
                                setNewResult({ ...newResult, course: value })
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
                            <Label className="text-slate-300">Semester *</Label>
                            <Select
                              value={newResult.semester}
                              onValueChange={(value) =>
                                setNewResult({ ...newResult, semester: value })
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
                            <Label className="text-slate-300">Subject Code *</Label>
                            <Input
                              placeholder="CS304"
                              value={newResult.subjectCode}
                              onChange={(e) =>
                                setNewResult({
                                  ...newResult,
                                  subjectCode: e.target.value,
                                })
                              }
                              className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Subject Name *</Label>
                            <Input
                              placeholder="Operating Systems"
                              value={newResult.subject}
                              onChange={(e) =>
                                setNewResult({
                                  ...newResult,
                                  subject: e.target.value,
                                })
                              }
                              className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Exam Type *</Label>
                            <Select
                              value={newResult.examType}
                              onValueChange={(value) =>
                                setNewResult({ ...newResult, examType: value })
                              }
                            >
                              <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Mid-Semester">Mid-Semester</SelectItem>
                                <SelectItem value="End-Semester">End-Semester</SelectItem>
                                <SelectItem value="Sessional">Sessional</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-slate-300">Total Marks *</Label>
                            <Input
                              type="number"
                              placeholder="100"
                              value={newResult.totalMarks}
                              onChange={(e) =>
                                setNewResult({
                                  ...newResult,
                                  totalMarks: e.target.value,
                                })
                              }
                              className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-slate-300">Marks Obtained *</Label>
                            <Input
                              type="number"
                              placeholder="85"
                              value={newResult.marksObtained}
                              onChange={(e) =>
                                setNewResult({
                                  ...newResult,
                                  marksObtained: e.target.value,
                                })
                              }
                              className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                            />
                          </div>
                        </div>
                        <Button
                          onClick={handleAddResult}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Add Result
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    className="hidden sm:flex bg-slate-700 border-slate-600 text-slate-100 hover:bg-slate-600"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Bulk Upload
                  </Button>
                  <Button
                    variant="outline"
                    className="hidden sm:flex bg-slate-700 border-slate-600 text-slate-100 hover:bg-slate-600"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>

              {/* Desktop Table View */}
              <div className="hidden md:block rounded-lg border border-slate-700 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-700/50 border-slate-600 hover:bg-slate-700/50">
                      <TableHead className="text-slate-300">Student ID</TableHead>
                      <TableHead className="text-slate-300">Name</TableHead>
                      <TableHead className="text-slate-300">Subject</TableHead>
                      <TableHead className="text-slate-300">Course</TableHead>
                      <TableHead className="text-slate-300">Semester</TableHead>
                      <TableHead className="text-slate-300">Exam Type</TableHead>
                      <TableHead className="text-slate-300">Marks</TableHead>
                      <TableHead className="text-slate-300">Grade</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {examResults.map((result) => (
                      <TableRow
                        key={result.id}
                        className="border-slate-700 hover:bg-slate-700/30"
                      >
                        <TableCell className="text-slate-200">
                          {result.studentId}
                        </TableCell>
                        <TableCell className="text-slate-200">
                          {result.studentName}
                        </TableCell>
                        <TableCell className="text-slate-200">
                          <div>
                            <p>{result.subject}</p>
                            <p className="text-xs text-slate-400">
                              {result.subjectCode}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-200">
                          {result.course}
                        </TableCell>
                        <TableCell className="text-slate-200">
                          {result.semester}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline" className="border-slate-600 text-slate-300">
                            {result.examType}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-200">
                          {result.marksObtained}/{result.totalMarks}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-purple-600">{result.grade}</Badge>
                        </TableCell>
                        <TableCell>{getResultBadge(result.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-3">
                {examResults.map((result) => (
                  <div
                    key={result.id}
                    className="bg-slate-700/50 rounded-lg p-4 border border-slate-600"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="text-slate-300 text-sm mb-1">Student ID</div>
                        <div className="text-slate-100 font-medium">{result.studentId}</div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className="bg-purple-600">{result.grade}</Badge>
                        {getResultBadge(result.status)}
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="text-slate-300 text-sm mb-1">Name</div>
                      <div className="text-slate-100">{result.studentName}</div>
                    </div>
                    <div className="mb-3">
                      <div className="text-slate-300 text-sm mb-1">Subject</div>
                      <div className="text-slate-100">{result.subject}</div>
                      <div className="text-slate-400 text-xs">{result.subjectCode}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
                      <div>
                        <div className="text-slate-300 mb-1">Course</div>
                        <div className="text-slate-100">{result.course}</div>
                      </div>
                      <div>
                        <div className="text-slate-300 mb-1">Semester</div>
                        <div className="text-slate-100">{result.semester}</div>
                      </div>
                      <div>
                        <div className="text-slate-300 mb-1">Exam Type</div>
                        <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
                          {result.examType}
                        </Badge>
                      </div>
                      <div>
                        <div className="text-slate-300 mb-1">Marks</div>
                        <div className="text-slate-100">{result.marksObtained}/{result.totalMarks}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-slate-700 border-slate-600">
                  <CardContent className="p-6">
                    <p className="text-slate-300 mb-2">Pass Percentage</p>
                    <p className="text-3xl text-green-400">
                      {Math.round(
                        (examResults.filter((r) => r.status === "Pass").length /
                          examResults.length) *
                          100
                      )}
                      %
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-700 border-slate-600">
                  <CardContent className="p-6">
                    <p className="text-slate-300 mb-2">Average Marks</p>
                    <p className="text-3xl text-blue-400">
                      {Math.round(
                        examResults.reduce((sum, r) => sum + r.marksObtained, 0) /
                          examResults.length
                      )}
                      /100
                    </p>
                  </CardContent>
                </Card>
                <Card className="bg-slate-700 border-slate-600">
                  <CardContent className="p-6">
                    <p className="text-slate-300 mb-2">Total Students</p>
                    <p className="text-3xl text-purple-400">
                      {examResults.length}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-slate-700 border-slate-600">
                <CardContent className="p-6">
                  <p className="text-center text-slate-400 py-12">
                    Detailed analytics and charts coming soon
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Delete Confirmation */}
      <AlertDialog
        open={deleteExamId !== null}
        onOpenChange={() => setDeleteExamId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this exam schedule? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteSchedule}
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