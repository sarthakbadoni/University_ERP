import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar, Plus, X, Save, ArrowLeft } from "lucide-react";

export default function ManageTimetables({ onSectionChange }) {
  const [activeTab, setActiveTab] = useState("student");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedFacultyId, setSelectedFacultyId] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [classData, setClassData] = useState({
    subjectCode: "",
    subjectName: "",
    roomNumber: "",
    duration: "1",
    facultyName: "",
  });

  // Timetable storage - in real app, this would be from a database
  const [studentTimetables, setStudentTimetables] = useState({});
  const [facultyTimetables, setFacultyTimetables] = useState({});

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const timeSlots = [
    "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  const facultyList = [
    { id: "FAC001", name: "Dr. Rajesh Kumar" },
    { id: "FAC002", name: "Prof. Anjali Sharma" },
    { id: "FAC003", name: "Dr. Vikram Singh" },
    { id: "FAC004", name: "Prof. Priya Gupta" },
  ];

  const formatTime = (time) => {
    const [hours] = time.split(":").map(Number);
    if (hours === 12) return "12 PM";
    if (hours === 0) return "12 AM";
    if (hours > 12) return `${hours - 12} PM`;
    return `${hours} AM`;
  };

  const getTimetableKey = () => {
    if (activeTab === "student") {
      if (!selectedCourse || !selectedSemester || !selectedSection) return null;
      return `${selectedCourse}-${selectedSemester}-${selectedSection}`;
    } else {
      if (!selectedFacultyId) return null;
      return selectedFacultyId;
    }
  };

  const getCurrentTimetable = () => {
    const key = getTimetableKey();
    if (!key) return {};
    const timetables = activeTab === "student" ? studentTimetables : facultyTimetables;
    return timetables[key] || {};
  };

  const getClassAtSlot = (day, time) => {
    const currentTimetable = getCurrentTimetable();
    const slotKey = `${day}-${time}`;
    return currentTimetable[slotKey];
  };

  const isSlotOccupied = (day, time) => {
    const currentTimetable = getCurrentTimetable();
    for (let i = 0; i < 4; i++) {
      const checkTime = getTimeFromOffset(time, -i);
      const slotKey = `${day}-${checkTime}`;
      const existingClass = currentTimetable[slotKey];
      if (existingClass && parseInt(existingClass.duration) > i) {
        return true;
      }
    }
    return false;
  };

  const getTimeFromOffset = (time, offset) => {
    const [hours] = time.split(":").map(Number);
    const newHours = hours + offset;
    return `${String(newHours).padStart(2, "0")}:00`;
  };

  const handleSlotClick = (day, time) => {
    if (isSlotOccupied(day, time)) {
      const existingClass = findClassAtSlot(day, time);
      if (existingClass) {
        setClassData(existingClass.data);
        setSelectedSlot(existingClass.slot);
        setIsDialogOpen(true);
      }
    } else {
      setClassData({
        subjectCode: "",
        subjectName: "",
        roomNumber: "",
        duration: "1",
        facultyName: "",
      });
      setSelectedSlot({ day, time });
      setIsDialogOpen(true);
    }
  };

  const findClassAtSlot = (day, time) => {
    const currentTimetable = getCurrentTimetable();
    for (let i = 0; i < 4; i++) {
      const checkTime = getTimeFromOffset(time, -i);
      const slotKey = `${day}-${checkTime}`;
      const existingClass = currentTimetable[slotKey];
      if (existingClass && parseInt(existingClass.duration) > i) {
        return { slot: { day, time: checkTime }, data: existingClass };
      }
    }
    return null;
  };

  const handleSaveClass = () => {
    if (!classData.subjectCode || !classData.roomNumber) {
      alert("Please fill in all required fields");
      return;
    }

    const key = getTimetableKey();
    if (!key) return;

    const slotKey = `${selectedSlot.day}-${selectedSlot.time}`;
    const updatedTimetable = { ...getCurrentTimetable() };
    updatedTimetable[slotKey] = { ...classData };

    if (activeTab === "student") {
      setStudentTimetables({
        ...studentTimetables,
        [key]: updatedTimetable,
      });
    } else {
      setFacultyTimetables({
        ...facultyTimetables,
        [key]: updatedTimetable,
      });
    }

    setIsDialogOpen(false);
    setSelectedSlot(null);
    alert("Class saved successfully!");
  };

  const handleDeleteClass = () => {
    if (!selectedSlot) return;

    const key = getTimetableKey();
    if (!key) return;

    const slotKey = `${selectedSlot.day}-${selectedSlot.time}`;
    const updatedTimetable = { ...getCurrentTimetable() };
    delete updatedTimetable[slotKey];

    if (activeTab === "student") {
      setStudentTimetables({
        ...studentTimetables,
        [key]: updatedTimetable,
      });
    } else {
      setFacultyTimetables({
        ...facultyTimetables,
        [key]: updatedTimetable,
      });
    }

    setIsDialogOpen(false);
    setIsDeleteDialogOpen(false);
    setSelectedSlot(null);
    alert("Class deleted successfully!");
  };

  const renderTimeSlot = (day, time) => {
    const classInfo = getClassAtSlot(day, time);
    
    if (!classInfo) {
      const occupied = isSlotOccupied(day, time);
      if (occupied) {
        return (
          <td
            key={`${day}-${time}`}
            className="border border-slate-600 bg-slate-700/30 cursor-not-allowed"
          />
        );
      }
      
      return (
        <td
          key={`${day}-${time}`}
          className="border border-slate-600 p-1 cursor-pointer hover:bg-slate-700/50 transition-colors"
          onClick={() => handleSlotClick(day, time)}
        >
          <div className="min-h-[50px] flex items-center justify-center">
            <Plus className="h-4 w-4 text-slate-500" />
          </div>
        </td>
      );
    }

    const duration = parseInt(classInfo.duration) || 1;
    
    return (
      <td
        key={`${day}-${time}`}
        colSpan={duration}
        className="border border-slate-600 p-1 bg-blue-900/40 cursor-pointer hover:bg-blue-900/60 transition-colors"
        onClick={() => handleSlotClick(day, time)}
      >
        <div className="min-h-[50px] text-xs">
          <div className="flex items-start justify-between mb-1">
            <Badge className="bg-blue-600 text-xs py-0 px-1">{classInfo.subjectCode}</Badge>
            <span className="text-xs text-slate-400">{duration}h</span>
          </div>
          <p className="text-xs text-slate-200 mb-1 truncate">{classInfo.subjectName}</p>
          <div className="flex items-center gap-1 text-xs text-slate-400">
            <span className="truncate">📍 {classInfo.roomNumber}</span>
          </div>
          {classInfo.facultyName && (
            <p className="text-xs text-slate-400 mt-1 truncate">👤 {classInfo.facultyName}</p>
          )}
        </div>
      </td>
    );
  };

  const renderDayRow = (day) => {
    const cells = [
      <td
        key={`${day}-label`}
        className="border border-slate-600 p-2 bg-slate-700 text-slate-100 sticky left-0 z-10 w-20 text-xs"
      >
        {day.substring(0, 3)}
      </td>
    ];

    let skipNext = 0;
    timeSlots.forEach((time) => {
      if (skipNext > 0) {
        skipNext--;
        return;
      }

      const classInfo = getClassAtSlot(day, time);
      if (classInfo) {
        const duration = parseInt(classInfo.duration) || 1;
        skipNext = duration - 1;
      }

      cells.push(renderTimeSlot(day, time));
    });

    return cells;
  };

  const resetSelections = () => {
    setSelectedCourse("");
    setSelectedSemester("");
    setSelectedSection("");
    setSelectedFacultyId("");
  };

  const isStudentTimetableSelected = selectedCourse && selectedSemester && selectedSection;
  const isFacultyTimetableSelected = selectedFacultyId;
  const showTimetable = (activeTab === "student" && isStudentTimetableSelected) || 
                        (activeTab === "faculty" && isFacultyTimetableSelected);

  return (
    <div className="space-y-6 w-full">
      <Card className="bg-slate-800 border-slate-700 w-full overflow-hidden">
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
                <Calendar className="h-6 w-6" />
                Manage Timetables
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 w-full overflow-hidden">
          <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); resetSelections(); }}>
            <TabsList className="grid w-full grid-cols-2 bg-slate-700">
              <TabsTrigger
                value="student"
                className="data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100"
              >
                Student Timetables
              </TabsTrigger>
              <TabsTrigger
                value="faculty"
                className="data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100"
              >
                Faculty Timetables
              </TabsTrigger>
            </TabsList>

            {/* Student Timetable Tab */}
            <TabsContent value="student" className="space-y-4 mt-4">
              {!isStudentTimetableSelected ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-slate-700 rounded-lg">
                    <div>
                      <Label className="text-slate-300">Course *</Label>
                      <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                        <SelectTrigger className="bg-slate-600 border-slate-500 text-slate-100 mt-1">
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
                        value={selectedSemester}
                        onValueChange={setSelectedSemester}
                        disabled={!selectedCourse}
                      >
                        <SelectTrigger className="bg-slate-600 border-slate-500 text-slate-100 mt-1">
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
                      <Label className="text-slate-300">Section *</Label>
                      <Select
                        value={selectedSection}
                        onValueChange={setSelectedSection}
                        disabled={!selectedSemester}
                      >
                        <SelectTrigger className="bg-slate-600 border-slate-500 text-slate-100 mt-1">
                          <SelectValue placeholder="Select section" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="A">Section A</SelectItem>
                          <SelectItem value="B">Section B</SelectItem>
                          <SelectItem value="C">Section C</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="text-center text-slate-400 py-12 bg-slate-700 rounded-lg">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-slate-500" />
                    <p>Please select course, semester, and section to view/edit timetable</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 w-full">
                  <div className="bg-slate-700 p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <h3 className="text-slate-100">
                        {selectedCourse} - Semester {selectedSemester} - Section {selectedSection}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Click on time slots to add/edit classes. Scroll horizontally if needed.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetSelections}
                      className="bg-slate-600 border-slate-500 text-slate-100 hover:bg-slate-500"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Change
                    </Button>
                  </div>
                  <div className="w-full border border-slate-600 rounded-lg overflow-hidden bg-slate-800">
                    <div className="w-full overflow-x-auto">
                      <table className="border-collapse table-auto">
                        <thead>
                          <tr>
                            <th className="border border-slate-600 p-2 bg-slate-700 text-slate-100 sticky left-0 z-20 w-20 text-xs">
                              Day
                            </th>
                            {timeSlots.map((time) => (
                              <th
                                key={time}
                                className="border border-slate-600 p-1 bg-slate-700 text-slate-100 w-24 text-xs whitespace-nowrap"
                              >
                                {formatTime(time)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {days.map((day) => (
                            <tr key={day}>{renderDayRow(day)}</tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Faculty Timetable Tab */}
            <TabsContent value="faculty" className="space-y-4 mt-4">
              {!isFacultyTimetableSelected ? (
                <div className="space-y-4">
                  <div className="p-4 bg-slate-700 rounded-lg">
                    <Label className="text-slate-300">Select Faculty *</Label>
                    <Select value={selectedFacultyId} onValueChange={setSelectedFacultyId}>
                      <SelectTrigger className="bg-slate-600 border-slate-500 text-slate-100 mt-1">
                        <SelectValue placeholder="Select faculty member" />
                      </SelectTrigger>
                      <SelectContent>
                        {facultyList.map((faculty) => (
                          <SelectItem key={faculty.id} value={faculty.id}>
                            {faculty.name} ({faculty.id})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="text-center text-slate-400 py-12 bg-slate-700 rounded-lg">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-slate-500" />
                    <p>Please select a faculty member to view/edit their timetable</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 w-full">
                  <div className="bg-slate-700 p-3 rounded-lg flex items-center justify-between">
                    <div>
                      <h3 className="text-slate-100">
                        {facultyList.find(f => f.id === selectedFacultyId)?.name} - {selectedFacultyId}
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        Click on time slots to add/edit classes. Scroll horizontally if needed.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={resetSelections}
                      className="bg-slate-600 border-slate-500 text-slate-100 hover:bg-slate-500"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Change
                    </Button>
                  </div>
                  <div className="w-full border border-slate-600 rounded-lg overflow-hidden bg-slate-800">
                    <div className="w-full overflow-x-auto">
                      <table className="border-collapse table-auto">
                        <thead>
                          <tr>
                            <th className="border border-slate-600 p-2 bg-slate-700 text-slate-100 sticky left-0 z-20 w-20 text-xs">
                              Day
                            </th>
                            {timeSlots.map((time) => (
                              <th
                                key={time}
                                className="border border-slate-600 p-1 bg-slate-700 text-slate-100 w-24 text-xs whitespace-nowrap"
                              >
                                {formatTime(time)}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {days.map((day) => (
                            <tr key={day}>{renderDayRow(day)}</tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add/Edit Class Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-slate-100">
              {getClassAtSlot(selectedSlot?.day, selectedSlot?.time)
                ? "Edit Class"
                : "Add New Class"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedSlot && (
              <div className="p-3 bg-slate-700 rounded-lg">
                <p className="text-sm text-slate-300">
                  <strong>Day:</strong> {selectedSlot.day}
                </p>
                <p className="text-sm text-slate-300">
                  <strong>Time:</strong> {formatTime(selectedSlot.time)}
                </p>
              </div>
            )}

            <div>
              <Label className="text-slate-300">Subject Code *</Label>
              <Input
                placeholder="e.g., CS301"
                value={classData.subjectCode}
                onChange={(e) =>
                  setClassData({ ...classData, subjectCode: e.target.value })
                }
                className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
              />
            </div>

            <div>
              <Label className="text-slate-300">Subject Name</Label>
              <Input
                placeholder="e.g., Database Management Systems"
                value={classData.subjectName}
                onChange={(e) =>
                  setClassData({ ...classData, subjectName: e.target.value })
                }
                className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
              />
            </div>

            <div>
              <Label className="text-slate-300">Room Number *</Label>
              <Input
                placeholder="e.g., Room 301"
                value={classData.roomNumber}
                onChange={(e) =>
                  setClassData({ ...classData, roomNumber: e.target.value })
                }
                className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
              />
            </div>

            <div>
              <Label className="text-slate-300">Faculty Name</Label>
              <Input
                placeholder="e.g., Dr. John Smith"
                value={classData.facultyName}
                onChange={(e) =>
                  setClassData({ ...classData, facultyName: e.target.value })
                }
                className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
              />
            </div>

            <div>
              <Label className="text-slate-300">Duration (Hours) *</Label>
              <Select
                value={classData.duration}
                onValueChange={(value) =>
                  setClassData({ ...classData, duration: value })
                }
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Hour</SelectItem>
                  <SelectItem value="2">2 Hours</SelectItem>
                  <SelectItem value="3">3 Hours</SelectItem>
                  <SelectItem value="4">4 Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleSaveClass}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Class
              </Button>
              {getClassAtSlot(selectedSlot?.day, selectedSlot?.time) && (
                <Button
                  onClick={() => setIsDeleteDialogOpen(true)}
                  variant="outline"
                  className="bg-red-900/20 border-red-600 text-red-400 hover:bg-red-900/40"
                >
                  <X className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-100">Delete Class</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              Are you sure you want to delete this class? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-slate-100 hover:bg-slate-600 border-slate-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteClass}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
