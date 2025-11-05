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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { BookOpen, Plus, Edit, Trash2, ArrowLeft } from "lucide-react";
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

export default function ManageCourses({ onSectionChange }) {
  // Courses State
  const [courses, setCourses] = useState([
    { id: 1, name: "B.Tech", duration: "4 years", status: "Active" },
    { id: 2, name: "M.Tech", duration: "2 years", status: "Active" },
    { id: 3, name: "BCA", duration: "3 years", status: "Active" },
    { id: 4, name: "MCA", duration: "2 years", status: "Active" },
  ]);

  // Branches/Departments State
  const [branches, setBranches] = useState([
    { id: 1, name: "Computer Science", code: "CSE", course: "B.Tech", status: "Active" },
    { id: 2, name: "Electrical Engineering", code: "EE", course: "B.Tech", status: "Active" },
    { id: 3, name: "Mechanical Engineering", code: "ME", course: "B.Tech", status: "Active" },
    { id: 4, name: "Civil Engineering", code: "CE", course: "B.Tech", status: "Active" },
  ]);

  // Specializations State
  const [specializations, setSpecializations] = useState([
    { id: 1, name: "AI/ML", branch: "Computer Science", course: "B.Tech", status: "Active" },
    { id: 2, name: "Cyber Security", branch: "Computer Science", course: "B.Tech", status: "Active" },
    { id: 3, name: "Data Science", branch: "Computer Science", course: "B.Tech", status: "Active" },
    { id: 4, name: "Core", branch: "Computer Science", course: "B.Tech", status: "Active" },
  ]);

  // Sections State
  const [sections, setSections] = useState([
    { id: 1, name: "A", capacity: 60, status: "Active" },
    { id: 2, name: "B", capacity: 60, status: "Active" },
    { id: 3, name: "C", capacity: 60, status: "Active" },
  ]);

  // Dialog States
  const [isCourseDialogOpen, setIsCourseDialogOpen] = useState(false);
  const [isBranchDialogOpen, setIsBranchDialogOpen] = useState(false);
  const [isSpecializationDialogOpen, setIsSpecializationDialogOpen] = useState(false);
  const [isSectionDialogOpen, setIsSectionDialogOpen] = useState(false);
  
  const [isEditCourseDialogOpen, setIsEditCourseDialogOpen] = useState(false);
  const [isEditBranchDialogOpen, setIsEditBranchDialogOpen] = useState(false);
  const [isEditSpecializationDialogOpen, setIsEditSpecializationDialogOpen] = useState(false);
  const [isEditSectionDialogOpen, setIsEditSectionDialogOpen] = useState(false);

  // Delete States
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [deleteItemType, setDeleteItemType] = useState(null);

  // Form States
  const [newCourse, setNewCourse] = useState({ name: "", duration: "", status: "Active" });
  const [newBranch, setNewBranch] = useState({ name: "", code: "", course: "", status: "Active" });
  const [newSpecialization, setNewSpecialization] = useState({ name: "", branch: "", course: "", status: "Active" });
  const [newSection, setNewSection] = useState({ name: "", capacity: "", status: "Active" });

  const [editingCourse, setEditingCourse] = useState(null);
  const [editingBranch, setEditingBranch] = useState(null);
  const [editingSpecialization, setEditingSpecialization] = useState(null);
  const [editingSection, setEditingSection] = useState(null);

  // Handlers for Courses
  const handleAddCourse = () => {
    if (!newCourse.name || !newCourse.duration) {
      alert("Please fill in all required fields");
      return;
    }
    setCourses([...courses, { ...newCourse, id: courses.length + 1 }]);
    setNewCourse({ name: "", duration: "", status: "Active" });
    setIsCourseDialogOpen(false);
    alert("Course added successfully!");
  };

  const handleEditCourse = () => {
    if (!editingCourse.name || !editingCourse.duration) {
      alert("Please fill in all required fields");
      return;
    }
    setCourses(courses.map((c) => (c.id === editingCourse.id ? editingCourse : c)));
    setIsEditCourseDialogOpen(false);
    setEditingCourse(null);
    alert("Course updated successfully!");
  };

  // Handlers for Branches
  const handleAddBranch = () => {
    if (!newBranch.name || !newBranch.code || !newBranch.course) {
      alert("Please fill in all required fields");
      return;
    }
    setBranches([...branches, { ...newBranch, id: branches.length + 1 }]);
    setNewBranch({ name: "", code: "", course: "", status: "Active" });
    setIsBranchDialogOpen(false);
    alert("Branch added successfully!");
  };

  const handleEditBranch = () => {
    if (!editingBranch.name || !editingBranch.code || !editingBranch.course) {
      alert("Please fill in all required fields");
      return;
    }
    setBranches(branches.map((b) => (b.id === editingBranch.id ? editingBranch : b)));
    setIsEditBranchDialogOpen(false);
    setEditingBranch(null);
    alert("Branch updated successfully!");
  };

  // Handlers for Specializations
  const handleAddSpecialization = () => {
    if (!newSpecialization.name || !newSpecialization.branch || !newSpecialization.course) {
      alert("Please fill in all required fields");
      return;
    }
    setSpecializations([...specializations, { ...newSpecialization, id: specializations.length + 1 }]);
    setNewSpecialization({ name: "", branch: "", course: "", status: "Active" });
    setIsSpecializationDialogOpen(false);
    alert("Specialization added successfully!");
  };

  const handleEditSpecialization = () => {
    if (!editingSpecialization.name || !editingSpecialization.branch || !editingSpecialization.course) {
      alert("Please fill in all required fields");
      return;
    }
    setSpecializations(specializations.map((s) => (s.id === editingSpecialization.id ? editingSpecialization : s)));
    setIsEditSpecializationDialogOpen(false);
    setEditingSpecialization(null);
    alert("Specialization updated successfully!");
  };

  // Handlers for Sections
  const handleAddSection = () => {
    if (!newSection.name || !newSection.capacity) {
      alert("Please fill in all required fields");
      return;
    }
    setSections([...sections, { ...newSection, id: sections.length + 1 }]);
    setNewSection({ name: "", capacity: "", status: "Active" });
    setIsSectionDialogOpen(false);
    alert("Section added successfully!");
  };

  const handleEditSection = () => {
    if (!editingSection.name || !editingSection.capacity) {
      alert("Please fill in all required fields");
      return;
    }
    setSections(sections.map((s) => (s.id === editingSection.id ? editingSection : s)));
    setIsEditSectionDialogOpen(false);
    setEditingSection(null);
    alert("Section updated successfully!");
  };

  // Delete Handler
  const handleDelete = () => {
    if (deleteItemType === "course") {
      setCourses(courses.filter((c) => c.id !== deleteItemId));
    } else if (deleteItemType === "branch") {
      setBranches(branches.filter((b) => b.id !== deleteItemId));
    } else if (deleteItemType === "specialization") {
      setSpecializations(specializations.filter((s) => s.id !== deleteItemId));
    } else if (deleteItemType === "section") {
      setSections(sections.filter((s) => s.id !== deleteItemId));
    }
    setDeleteItemId(null);
    setDeleteItemType(null);
    alert("Deleted successfully!");
  };

  return (
    <div className="space-y-6 w-full overflow-x-hidden">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="px-4 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              {onSectionChange && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onSectionChange("overview")}
                  className="text-slate-400 hover:text-slate-100 hover:bg-slate-700 h-8 w-8 sm:h-10 sm:w-10"
                >
                  <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              )}
              <CardTitle className="flex items-center gap-2 text-blue-400 text-sm sm:text-base">
                <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />
                <span className="hidden sm:inline">Manage Courses & Programs</span>
                <span className="sm:hidden">Courses</span>
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-4 sm:px-6">
          <Tabs defaultValue="courses" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-slate-700/50 p-1 gap-0.5">
              <TabsTrigger value="courses" className="text-slate-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[10px] sm:text-sm whitespace-nowrap px-1 sm:px-3">
                Courses
              </TabsTrigger>
              <TabsTrigger value="branches" className="text-slate-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[10px] sm:text-sm whitespace-nowrap px-1 sm:px-3">
                Branches
              </TabsTrigger>
              <TabsTrigger value="specializations" className="text-slate-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[10px] sm:text-sm whitespace-nowrap px-1 sm:px-3">
                <span className="hidden md:inline">Specializations</span>
                <span className="md:hidden">Specials</span>
              </TabsTrigger>
              <TabsTrigger value="sections" className="text-slate-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white text-[10px] sm:text-sm whitespace-nowrap px-1 sm:px-3">
                Sections
              </TabsTrigger>
            </TabsList>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
                <p className="text-slate-400 text-xs sm:text-sm break-words">Manage degree programs offered by the university</p>
                <Dialog open={isCourseDialogOpen} onOpenChange={setIsCourseDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto whitespace-nowrap shrink-0">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Course
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-slate-100">Add New Course</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-300">Course Name *</Label>
                        <Input
                          placeholder="e.g., B.Tech, M.Tech"
                          value={newCourse.name}
                          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Duration *</Label>
                        <Input
                          placeholder="e.g., 4 years"
                          value={newCourse.duration}
                          onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Status</Label>
                        <Select value={newCourse.status} onValueChange={(value) => setNewCourse({ ...newCourse, status: value })}>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleAddCourse} className="w-full bg-blue-600 hover:bg-blue-700">
                        Add Course
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
                      <TableHead className="text-slate-300">Course Name</TableHead>
                      <TableHead className="text-slate-300">Duration</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {courses.map((course) => (
                      <TableRow key={course.id} className="border-slate-700 hover:bg-slate-700/30">
                        <TableCell className="text-slate-200">{course.name}</TableCell>
                        <TableCell className="text-slate-200">{course.duration}</TableCell>
                        <TableCell>
                          <Badge variant={course.status === "Active" ? "default" : "outline"}>
                            {course.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                              onClick={() => {
                                setEditingCourse({ ...course });
                                setIsEditCourseDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-slate-700"
                              onClick={() => {
                                setDeleteItemId(course.id);
                                setDeleteItemType("course");
                              }}
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
                {courses.map((course) => (
                  <Card key={course.id} className="bg-slate-700/30 border-slate-600">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="text-slate-100">{course.name}</p>
                            <p className="text-slate-400 text-sm">{course.duration}</p>
                          </div>
                          <Badge variant={course.status === "Active" ? "default" : "outline"}>
                            {course.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-blue-600/10 border-blue-600 text-blue-400 hover:bg-blue-600/20"
                            onClick={() => {
                              setEditingCourse({ ...course });
                              setIsEditCourseDialogOpen(true);
                            }}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-red-600/10 border-red-600 text-red-400 hover:bg-red-600/20"
                            onClick={() => {
                              setDeleteItemId(course.id);
                              setDeleteItemType("course");
                            }}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Branches Tab */}
            <TabsContent value="branches" className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
                <p className="text-slate-400 text-xs sm:text-sm break-words">Manage branches/departments for each course</p>
                <Dialog open={isBranchDialogOpen} onOpenChange={setIsBranchDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto whitespace-nowrap shrink-0">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Branch
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-slate-100">Add New Branch</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-300">Course *</Label>
                        <Select value={newBranch.course} onValueChange={(value) => setNewBranch({ ...newBranch, course: value })}>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map((course) => (
                              <SelectItem key={course.id} value={course.name}>
                                {course.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-slate-300">Branch Name *</Label>
                        <Input
                          placeholder="e.g., Computer Science"
                          value={newBranch.name}
                          onChange={(e) => setNewBranch({ ...newBranch, name: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Branch Code *</Label>
                        <Input
                          placeholder="e.g., CSE"
                          value={newBranch.code}
                          onChange={(e) => setNewBranch({ ...newBranch, code: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Status</Label>
                        <Select value={newBranch.status} onValueChange={(value) => setNewBranch({ ...newBranch, status: value })}>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleAddBranch} className="w-full bg-blue-600 hover:bg-blue-700">
                        Add Branch
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
                      <TableHead className="text-slate-300">Course</TableHead>
                      <TableHead className="text-slate-300">Branch Name</TableHead>
                      <TableHead className="text-slate-300">Code</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {branches.map((branch) => (
                      <TableRow key={branch.id} className="border-slate-700 hover:bg-slate-700/30">
                        <TableCell className="text-slate-200">{branch.course}</TableCell>
                        <TableCell className="text-slate-200">{branch.name}</TableCell>
                        <TableCell className="text-slate-200">{branch.code}</TableCell>
                        <TableCell>
                          <Badge variant={branch.status === "Active" ? "default" : "outline"}>
                            {branch.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                              onClick={() => {
                                setEditingBranch({ ...branch });
                                setIsEditBranchDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-slate-700"
                              onClick={() => {
                                setDeleteItemId(branch.id);
                                setDeleteItemType("branch");
                              }}
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
                {branches.map((branch) => (
                  <Card key={branch.id} className="bg-slate-700/30 border-slate-600">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="text-slate-100">{branch.name}</p>
                            <p className="text-slate-400 text-sm">{branch.course} • {branch.code}</p>
                          </div>
                          <Badge variant={branch.status === "Active" ? "default" : "outline"}>
                            {branch.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-blue-600/10 border-blue-600 text-blue-400 hover:bg-blue-600/20"
                            onClick={() => {
                              setEditingBranch({ ...branch });
                              setIsEditBranchDialogOpen(true);
                            }}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-red-600/10 border-red-600 text-red-400 hover:bg-red-600/20"
                            onClick={() => {
                              setDeleteItemId(branch.id);
                              setDeleteItemType("branch");
                            }}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Specializations Tab */}
            <TabsContent value="specializations" className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
                <p className="text-slate-400 text-xs sm:text-sm break-words">Manage specializations within branches (AI/ML, Cyber Security, etc.)</p>
                <Dialog open={isSpecializationDialogOpen} onOpenChange={setIsSpecializationDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto whitespace-nowrap shrink-0">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Specialization
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-slate-100">Add New Specialization</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-300">Course *</Label>
                        <Select value={newSpecialization.course} onValueChange={(value) => setNewSpecialization({ ...newSpecialization, course: value, branch: "" })}>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                            <SelectValue placeholder="Select course" />
                          </SelectTrigger>
                          <SelectContent>
                            {courses.map((course) => (
                              <SelectItem key={course.id} value={course.name}>
                                {course.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-slate-300">Branch *</Label>
                        <Select 
                          value={newSpecialization.branch} 
                          onValueChange={(value) => setNewSpecialization({ ...newSpecialization, branch: value })}
                          disabled={!newSpecialization.course}
                        >
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                            <SelectValue placeholder="Select branch" />
                          </SelectTrigger>
                          <SelectContent>
                            {branches.filter(b => b.course === newSpecialization.course).map((branch) => (
                              <SelectItem key={branch.id} value={branch.name}>
                                {branch.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-slate-300">Specialization Name *</Label>
                        <Input
                          placeholder="e.g., AI/ML, Cyber Security, Core"
                          value={newSpecialization.name}
                          onChange={(e) => setNewSpecialization({ ...newSpecialization, name: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Status</Label>
                        <Select value={newSpecialization.status} onValueChange={(value) => setNewSpecialization({ ...newSpecialization, status: value })}>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleAddSpecialization} className="w-full bg-blue-600 hover:bg-blue-700">
                        Add Specialization
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
                      <TableHead className="text-slate-300">Course</TableHead>
                      <TableHead className="text-slate-300">Branch</TableHead>
                      <TableHead className="text-slate-300">Specialization</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {specializations.map((spec) => (
                      <TableRow key={spec.id} className="border-slate-700 hover:bg-slate-700/30">
                        <TableCell className="text-slate-200">{spec.course}</TableCell>
                        <TableCell className="text-slate-200">{spec.branch}</TableCell>
                        <TableCell className="text-slate-200">{spec.name}</TableCell>
                        <TableCell>
                          <Badge variant={spec.status === "Active" ? "default" : "outline"}>
                            {spec.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                              onClick={() => {
                                setEditingSpecialization({ ...spec });
                                setIsEditSpecializationDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-slate-700"
                              onClick={() => {
                                setDeleteItemId(spec.id);
                                setDeleteItemType("specialization");
                              }}
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
                {specializations.map((spec) => (
                  <Card key={spec.id} className="bg-slate-700/30 border-slate-600">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="text-slate-100">{spec.name}</p>
                            <p className="text-slate-400 text-sm">{spec.course} • {spec.branch}</p>
                          </div>
                          <Badge variant={spec.status === "Active" ? "default" : "outline"}>
                            {spec.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-blue-600/10 border-blue-600 text-blue-400 hover:bg-blue-600/20"
                            onClick={() => {
                              setEditingSpecialization({ ...spec });
                              setIsEditSpecializationDialogOpen(true);
                            }}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-red-600/10 border-red-600 text-red-400 hover:bg-red-600/20"
                            onClick={() => {
                              setDeleteItemId(spec.id);
                              setDeleteItemType("specialization");
                            }}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Sections Tab */}
            <TabsContent value="sections" className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
                <p className="text-slate-400 text-xs sm:text-sm break-words">Manage class sections (A, B, C, etc.)</p>
                <Dialog open={isSectionDialogOpen} onOpenChange={setIsSectionDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto whitespace-nowrap shrink-0">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Section
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-slate-100">Add New Section</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-slate-300">Section Name *</Label>
                        <Input
                          placeholder="e.g., A, B, C"
                          value={newSection.name}
                          onChange={(e) => setNewSection({ ...newSection, name: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Capacity *</Label>
                        <Input
                          type="number"
                          placeholder="e.g., 60"
                          value={newSection.capacity}
                          onChange={(e) => setNewSection({ ...newSection, capacity: e.target.value })}
                          className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300">Status</Label>
                        <Select value={newSection.status} onValueChange={(value) => setNewSection({ ...newSection, status: value })}>
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button onClick={handleAddSection} className="w-full bg-blue-600 hover:bg-blue-700">
                        Add Section
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
                      <TableHead className="text-slate-300">Section Name</TableHead>
                      <TableHead className="text-slate-300">Capacity</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sections.map((section) => (
                      <TableRow key={section.id} className="border-slate-700 hover:bg-slate-700/30">
                        <TableCell className="text-slate-200">{section.name}</TableCell>
                        <TableCell className="text-slate-200">{section.capacity}</TableCell>
                        <TableCell>
                          <Badge variant={section.status === "Active" ? "default" : "outline"}>
                            {section.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                              onClick={() => {
                                setEditingSection({ ...section });
                                setIsEditSectionDialogOpen(true);
                              }}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-slate-700"
                              onClick={() => {
                                setDeleteItemId(section.id);
                                setDeleteItemType("section");
                              }}
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
                {sections.map((section) => (
                  <Card key={section.id} className="bg-slate-700/30 border-slate-600">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1">
                            <p className="text-slate-100">Section {section.name}</p>
                            <p className="text-slate-400 text-sm">Capacity: {section.capacity}</p>
                          </div>
                          <Badge variant={section.status === "Active" ? "default" : "outline"}>
                            {section.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-blue-600/10 border-blue-600 text-blue-400 hover:bg-blue-600/20"
                            onClick={() => {
                              setEditingSection({ ...section });
                              setIsEditSectionDialogOpen(true);
                            }}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 bg-red-600/10 border-red-600 text-red-400 hover:bg-red-600/20"
                            onClick={() => {
                              setDeleteItemId(section.id);
                              setDeleteItemType("section");
                            }}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit Dialogs */}
      {editingCourse && (
        <Dialog open={isEditCourseDialogOpen} onOpenChange={setIsEditCourseDialogOpen}>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-slate-100">Edit Course</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Course Name *</Label>
                <Input
                  value={editingCourse.name}
                  onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                />
              </div>
              <div>
                <Label className="text-slate-300">Duration *</Label>
                <Input
                  value={editingCourse.duration}
                  onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                />
              </div>
              <div>
                <Label className="text-slate-300">Status</Label>
                <Select value={editingCourse.status} onValueChange={(value) => setEditingCourse({ ...editingCourse, status: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleEditCourse} className="w-full bg-blue-600 hover:bg-blue-700">
                Update Course
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {editingBranch && (
        <Dialog open={isEditBranchDialogOpen} onOpenChange={setIsEditBranchDialogOpen}>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-slate-100">Edit Branch</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Course *</Label>
                <Select value={editingBranch.course} onValueChange={(value) => setEditingBranch({ ...editingBranch, course: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.name}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-300">Branch Name *</Label>
                <Input
                  value={editingBranch.name}
                  onChange={(e) => setEditingBranch({ ...editingBranch, name: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                />
              </div>
              <div>
                <Label className="text-slate-300">Branch Code *</Label>
                <Input
                  value={editingBranch.code}
                  onChange={(e) => setEditingBranch({ ...editingBranch, code: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                />
              </div>
              <div>
                <Label className="text-slate-300">Status</Label>
                <Select value={editingBranch.status} onValueChange={(value) => setEditingBranch({ ...editingBranch, status: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleEditBranch} className="w-full bg-blue-600 hover:bg-blue-700">
                Update Branch
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {editingSpecialization && (
        <Dialog open={isEditSpecializationDialogOpen} onOpenChange={setIsEditSpecializationDialogOpen}>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-slate-100">Edit Specialization</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Course *</Label>
                <Select value={editingSpecialization.course} onValueChange={(value) => setEditingSpecialization({ ...editingSpecialization, course: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.name}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-300">Branch *</Label>
                <Select value={editingSpecialization.branch} onValueChange={(value) => setEditingSpecialization({ ...editingSpecialization, branch: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {branches.filter(b => b.course === editingSpecialization.course).map((branch) => (
                      <SelectItem key={branch.id} value={branch.name}>
                        {branch.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-300">Specialization Name *</Label>
                <Input
                  value={editingSpecialization.name}
                  onChange={(e) => setEditingSpecialization({ ...editingSpecialization, name: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                />
              </div>
              <div>
                <Label className="text-slate-300">Status</Label>
                <Select value={editingSpecialization.status} onValueChange={(value) => setEditingSpecialization({ ...editingSpecialization, status: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleEditSpecialization} className="w-full bg-blue-600 hover:bg-blue-700">
                Update Specialization
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {editingSection && (
        <Dialog open={isEditSectionDialogOpen} onOpenChange={setIsEditSectionDialogOpen}>
          <DialogContent className="bg-slate-800 border-slate-700">
            <DialogHeader>
              <DialogTitle className="text-slate-100">Edit Section</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label className="text-slate-300">Section Name *</Label>
                <Input
                  value={editingSection.name}
                  onChange={(e) => setEditingSection({ ...editingSection, name: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                />
              </div>
              <div>
                <Label className="text-slate-300">Capacity *</Label>
                <Input
                  type="number"
                  value={editingSection.capacity}
                  onChange={(e) => setEditingSection({ ...editingSection, capacity: e.target.value })}
                  className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                />
              </div>
              <div>
                <Label className="text-slate-300">Status</Label>
                <Select value={editingSection.status} onValueChange={(value) => setEditingSection({ ...editingSection, status: value })}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleEditSection} className="w-full bg-blue-600 hover:bg-blue-700">
                Update Section
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation */}
      <AlertDialog open={deleteItemId !== null} onOpenChange={() => { setDeleteItemId(null); setDeleteItemType(null); }}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this {deleteItemType}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
