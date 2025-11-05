import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Badge } from "../ui/badge";
import { CalendarIcon, Save, Users, UserX, XCircle, ClipboardCheck } from "lucide-react";
import { format } from "date-fns";
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

export default function FacultyAttendanceSection() {
  const [selectedCourse, setSelectedCourse] = React.useState("");
  const [selectedSemester, setSelectedSemester] = React.useState("");
  const [selectedSection, setSelectedSection] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  // Attendance state now stores data keyed by "course-semester-section-date"
  const [attendanceData, setAttendanceData] = React.useState({});
  const [showCancelDialog, setShowCancelDialog] = React.useState(false);
  const [showMassBunkDialog, setShowMassBunkDialog] = React.useState(false);

  const courses = [
    { 
      code: "CS101", 
      name: "Introduction to Programming",
      semesters: [
        { id: "1", name: "Semester 1", sections: ["Section A", "Section B", "Section C"] },
        { id: "2", name: "Semester 2", sections: ["Section A", "Section B"] }
      ]
    },
    { 
      code: "CS201", 
      name: "Data Structures",
      semesters: [
        { id: "3", name: "Semester 3", sections: ["Section A", "Section B"] },
        { id: "4", name: "Semester 4", sections: ["Section A"] }
      ]
    },
    { 
      code: "CS301", 
      name: "Algorithms",
      semesters: [
        { id: "5", name: "Semester 5", sections: ["Section A"] },
        { id: "6", name: "Semester 6", sections: ["Section A", "Section B"] }
      ]
    },
  ];

  const students = [
    { id: 1, name: "Alice Johnson", rollNo: "CS2021001" },
    { id: 2, name: "Bob Smith", rollNo: "CS2021002" },
    { id: 3, name: "Charlie Brown", rollNo: "CS2021003" },
    { id: 4, name: "Diana Prince", rollNo: "CS2021004" },
    { id: 5, name: "Ethan Hunt", rollNo: "CS2021005" },
    { id: 6, name: "Fiona Green", rollNo: "CS2021006" },
    { id: 7, name: "George Miller", rollNo: "CS2021007" },
    { id: 8, name: "Hannah Lee", rollNo: "CS2021008" },
  ];

  const selectedCourseData = courses.find(c => c.code === selectedCourse);
  const selectedSemesterData = selectedCourseData?.semesters.find(s => s.id === selectedSemester);

  // Create a unique key for the current selection
  const attendanceKey = `${selectedCourse}-${selectedSemester}-${selectedSection}-${format(selectedDate, "yyyy-MM-dd")}`;
  
  // Get attendance for current selection
  const attendance = attendanceData[attendanceKey] || {};

  const toggleAttendance = (studentId) => {
    setAttendanceData((prev) => ({
      ...prev,
      [attendanceKey]: {
        ...(prev[attendanceKey] || {}),
        [studentId]: !(prev[attendanceKey]?.[studentId]),
      },
    }));
  };

  const markAllPresent = () => {
    const allPresent = students.reduce(
      (acc, student) => ({ ...acc, [student.id]: true }),
      {}
    );
    setAttendanceData((prev) => ({
      ...prev,
      [attendanceKey]: allPresent,
    }));
  };

  const markMassBunk = () => {
    const allAbsent = students.reduce(
      (acc, student) => ({ ...acc, [student.id]: false }),
      {}
    );
    setAttendanceData((prev) => ({
      ...prev,
      [attendanceKey]: allAbsent,
    }));
    setShowMassBunkDialog(false);
    alert("Mass bunk marked - All students marked absent!");
  };

  const cancelClass = () => {
    // Clear attendance for current selection
    setAttendanceData((prev) => {
      const newData = { ...prev };
      delete newData[attendanceKey];
      return newData;
    });
    setShowCancelDialog(false);
    alert(`Class cancelled for ${selectedCourseData?.name} - ${selectedSemesterData?.name} - ${selectedSection} on ${format(selectedDate, "PPP")}`);
  };

  const resetForm = () => {
    setSelectedCourse("");
    setSelectedSemester("");
    setSelectedSection("");
    setSelectedDate(new Date());
  };

  const saveAttendance = () => {
    const presentCount = Object.values(attendance).filter(Boolean).length;
    alert(
      `Attendance saved successfully!\n\nCourse: ${selectedCourseData?.name}\n${selectedSemesterData?.name} - ${selectedSection}\nDate: ${format(selectedDate, "PPP")}\nPresent: ${presentCount}/${students.length}\nAbsent: ${students.length - presentCount}/${students.length}`
    );
    // Reset form after saving
    resetForm();
  };

  const presentCount = Object.values(attendance).filter(Boolean).length;
  const attendancePercentage = students.length
    ? Math.round((presentCount / students.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <ClipboardCheck className="h-6 w-6" />
            Mark Attendance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Select Course
              </label>
              <Select value={selectedCourse} onValueChange={(value) => {
                setSelectedCourse(value);
                setSelectedSemester("");
                setSelectedSection("");
              }}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                  <SelectValue placeholder="Choose a course" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  {courses.map((course) => (
                    <SelectItem key={course.code} value={course.code}>
                      {course.code} - {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Select Semester
              </label>
              <Select 
                value={selectedSemester} 
                onValueChange={(value) => {
                  setSelectedSemester(value);
                  setSelectedSection("");
                }}
                disabled={!selectedCourse}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                  <SelectValue placeholder="Choose a semester" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  {selectedCourseData?.semesters.map((semester) => (
                    <SelectItem key={semester.id} value={semester.id}>
                      {semester.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Select Section
              </label>
              <Select 
                value={selectedSection} 
                onValueChange={setSelectedSection}
                disabled={!selectedSemester}
              >
                <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                  <SelectValue placeholder="Choose a section" />
                </SelectTrigger>
                <SelectContent className="z-50">
                  {selectedSemesterData?.sections.map((section) => (
                    <SelectItem key={section} value={section}>
                      {section}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm mb-2 text-slate-300">
                Select Date
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none z-10" />
                <input
                  type="date"
                  value={selectedDate ? format(selectedDate, "yyyy-MM-dd") : ""}
                  onChange={(e) => {
                    if (e.target.value) {
                      setSelectedDate(new Date(e.target.value));
                    }
                  }}
                  className="w-full bg-slate-700 border border-slate-600 text-slate-100 rounded-md px-3 py-2 pl-10 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors cursor-pointer [color-scheme:dark]"
                  style={{
                    colorScheme: 'dark'
                  }}
                />
              </div>
            </div>
          </div>

          {selectedCourse && selectedSemester && selectedSection && (
            <>
              <div className="bg-slate-700 p-4 rounded-lg border border-slate-600">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-slate-100 mb-1">
                      {selectedCourseData?.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-blue-600 hover:bg-blue-700">{selectedCourse}</Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">{selectedSemesterData?.name}</Badge>
                      <Badge variant="outline" className="border-slate-600 text-slate-300">{selectedSection}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="h-5 w-5 text-blue-400" />
                      <span className="text-2xl text-slate-100">
                        {presentCount}/{students.length}
                      </span>
                    </div>
                    <Badge
                      variant={attendancePercentage >= 75 ? "default" : "destructive"}
                      className="text-xs"
                    >
                      {attendancePercentage}% Present
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-2 mb-4">
                  <Button
                    size="sm"
                    onClick={markAllPresent}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Mark All Present
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => setShowMassBunkDialog(true)}
                  >
                    <UserX className="h-4 w-4 mr-2" />
                    Mass Bunk
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowCancelDialog(true)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-600"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Cancel Class
                  </Button>
                </div>

                <div className="space-y-2">
                  {students.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-3 bg-slate-800 rounded-lg hover:bg-slate-750 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={attendance[student.id] || false}
                          onCheckedChange={() => toggleAttendance(student.id)}
                          className="border-slate-500 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                        />
                        <div>
                          <p className="text-slate-100">{student.name}</p>
                          <p className="text-sm text-slate-400">
                            Roll No: {student.rollNo}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={attendance[student.id] ? "default" : "outline"}
                        className={
                          attendance[student.id]
                            ? "bg-green-600 hover:bg-green-700"
                            : "border-slate-600 text-slate-400"
                        }
                      >
                        {attendance[student.id] ? "Present" : "Absent"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={saveAttendance} className="bg-blue-600 hover:bg-blue-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Attendance
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Cancel Class Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-100">Cancel Class?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              Are you sure you want to cancel this class? All attendance data for this session will be cleared.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-slate-100 hover:bg-slate-600 border-slate-600">
              No, Keep Class
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={cancelClass}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Cancel Class
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Mass Bunk Dialog */}
      <AlertDialog open={showMassBunkDialog} onOpenChange={setShowMassBunkDialog}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-100">Mark Mass Bunk?</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400">
              This will mark all students as absent. Are you sure you want to proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-slate-100 hover:bg-slate-600 border-slate-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={markMassBunk}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Yes, Mark All Absent
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
