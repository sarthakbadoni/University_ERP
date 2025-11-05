import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Search, Plus, Edit, Trash2, Download, ArrowLeft } from "lucide-react";
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

export default function ManageFaculty({ onSectionChange }) {
  const [faculty, setFaculty] = useState([
    {
      id: 1,
      name: "Dr. John Smith",
      facultyId: "FAC001",
      email: "john.smith@university.edu",
      phone: "+1 234-567-8901",
      department: "Computer Science",
      designation: "Professor",
      qualification: "Ph.D.",
      status: "Active",
    },
    {
      id: 2,
      name: "Dr. Sarah Williams",
      facultyId: "FAC002",
      email: "sarah.williams@university.edu",
      phone: "+1 234-567-8902",
      department: "Electrical Engineering",
      designation: "Associate Professor",
      qualification: "Ph.D.",
      status: "Active",
    },
    {
      id: 3,
      name: "Prof. Michael Brown",
      facultyId: "FAC003",
      email: "michael.brown@university.edu",
      phone: "+1 234-567-8903",
      department: "Mechanical Engineering",
      designation: "Assistant Professor",
      qualification: "M.Tech",
      status: "Active",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [deleteFacultyId, setDeleteFacultyId] = useState(null);
  const [editingFaculty, setEditingFaculty] = useState(null);
  const [newFaculty, setNewFaculty] = useState({
    name: "",
    facultyId: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    qualification: "",
    status: "Active",
  });

  const filteredFaculty = faculty.filter((fac) => {
    const matchesSearch =
      fac.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fac.facultyId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDepartment =
      filterDepartment === "all" || fac.department === filterDepartment;
    return matchesSearch && matchesDepartment;
  });

  const handleAddFaculty = () => {
    if (!newFaculty.name || !newFaculty.facultyId || !newFaculty.email) {
      alert("Please fill in all required fields");
      return;
    }
    setFaculty([...faculty, { ...newFaculty, id: faculty.length + 1 }]);
    setNewFaculty({
      name: "",
      facultyId: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      qualification: "",
      status: "Active",
    });
    setIsAddDialogOpen(false);
    alert("Faculty added successfully!");
  };

  const handleEditFaculty = () => {
    if (!editingFaculty.name || !editingFaculty.facultyId || !editingFaculty.email) {
      alert("Please fill in all required fields");
      return;
    }
    setFaculty(faculty.map((f) => (f.id === editingFaculty.id ? editingFaculty : f)));
    setIsEditDialogOpen(false);
    setEditingFaculty(null);
    alert("Faculty updated successfully!");
  };

  const handleDeleteFaculty = () => {
    setFaculty(faculty.filter((f) => f.id !== deleteFacultyId));
    setDeleteFacultyId(null);
    alert("Faculty deleted successfully!");
  };

  const openEditDialog = (fac) => {
    setEditingFaculty({ ...fac });
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
              <CardTitle className="text-blue-400">Manage Faculty</CardTitle>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Faculty
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-slate-100">Add New Faculty</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Full Name *</Label>
                      <Input
                        placeholder="Enter faculty name"
                        value={newFaculty.name}
                        onChange={(e) =>
                          setNewFaculty({ ...newFaculty, name: e.target.value })
                        }
                        className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Faculty ID *</Label>
                      <Input
                        placeholder="FACXXX"
                        value={newFaculty.facultyId}
                        onChange={(e) =>
                          setNewFaculty({ ...newFaculty, facultyId: e.target.value })
                        }
                        className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Email *</Label>
                      <Input
                        type="email"
                        placeholder="faculty@university.edu"
                        value={newFaculty.email}
                        onChange={(e) =>
                          setNewFaculty({ ...newFaculty, email: e.target.value })
                        }
                        className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Phone</Label>
                      <Input
                        placeholder="+1 234-567-8900"
                        value={newFaculty.phone}
                        onChange={(e) =>
                          setNewFaculty({ ...newFaculty, phone: e.target.value })
                        }
                        className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-slate-300">Department</Label>
                      <Select
                        value={newFaculty.department}
                        onValueChange={(value) =>
                          setNewFaculty({ ...newFaculty, department: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                          <SelectValue placeholder="Select department" />
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
                      <Label className="text-slate-300">Designation</Label>
                      <Select
                        value={newFaculty.designation}
                        onValueChange={(value) =>
                          setNewFaculty({ ...newFaculty, designation: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                          <SelectValue placeholder="Select designation" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Professor">Professor</SelectItem>
                          <SelectItem value="Associate Professor">
                            Associate Professor
                          </SelectItem>
                          <SelectItem value="Assistant Professor">
                            Assistant Professor
                          </SelectItem>
                          <SelectItem value="Lecturer">Lecturer</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300">Qualification</Label>
                      <Select
                        value={newFaculty.qualification}
                        onValueChange={(value) =>
                          setNewFaculty({ ...newFaculty, qualification: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                          <SelectValue placeholder="Select qualification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Ph.D.">Ph.D.</SelectItem>
                          <SelectItem value="M.Tech">M.Tech</SelectItem>
                          <SelectItem value="M.E.">M.E.</SelectItem>
                          <SelectItem value="M.Sc">M.Sc</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300">Status</Label>
                      <Select
                        value={newFaculty.status}
                        onValueChange={(value) =>
                          setNewFaculty({ ...newFaculty, status: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Active">Active</SelectItem>
                          <SelectItem value="On Leave">On Leave</SelectItem>
                          <SelectItem value="Inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    onClick={handleAddFaculty}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Add Faculty
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
            <Select value={filterDepartment} onValueChange={setFilterDepartment}>
              <SelectTrigger className="w-full md:w-60 bg-slate-700 border-slate-600 text-slate-100">
                <SelectValue placeholder="Filter by department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
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
            <Button
              variant="outline"
              className="bg-slate-700 border-slate-600 text-slate-100 hover:bg-slate-600"
            >
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>

          {/* Table */}
          <div className="rounded-lg border border-slate-700 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-700/50 border-slate-600 hover:bg-slate-700/50">
                  <TableHead className="text-slate-300">Faculty ID</TableHead>
                  <TableHead className="text-slate-300">Name</TableHead>
                  <TableHead className="text-slate-300">Email</TableHead>
                  <TableHead className="text-slate-300">Phone</TableHead>
                  <TableHead className="text-slate-300">Department</TableHead>
                  <TableHead className="text-slate-300">Designation</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFaculty.map((fac) => (
                  <TableRow
                    key={fac.id}
                    className="border-slate-700 hover:bg-slate-700/30"
                  >
                    <TableCell className="text-slate-200">{fac.facultyId}</TableCell>
                    <TableCell className="text-slate-200">{fac.name}</TableCell>
                    <TableCell className="text-slate-400">{fac.email}</TableCell>
                    <TableCell className="text-slate-400">{fac.phone}</TableCell>
                    <TableCell className="text-slate-200">{fac.department}</TableCell>
                    <TableCell className="text-slate-200">{fac.designation}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          fac.status === "Active"
                            ? "default"
                            : fac.status === "On Leave"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {fac.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-blue-400 hover:text-blue-300 hover:bg-slate-700"
                          onClick={() => openEditDialog(fac)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-slate-700"
                          onClick={() => setDeleteFacultyId(fac.id)}
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

          <div className="text-sm text-slate-400">
            Showing {filteredFaculty.length} of {faculty.length} faculty members
          </div>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      {editingFaculty && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-slate-100">Edit Faculty</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Full Name *</Label>
                  <Input
                    value={editingFaculty.name}
                    onChange={(e) =>
                      setEditingFaculty({ ...editingFaculty, name: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Faculty ID *</Label>
                  <Input
                    value={editingFaculty.facultyId}
                    onChange={(e) =>
                      setEditingFaculty({
                        ...editingFaculty,
                        facultyId: e.target.value,
                      })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Email *</Label>
                  <Input
                    type="email"
                    value={editingFaculty.email}
                    onChange={(e) =>
                      setEditingFaculty({ ...editingFaculty, email: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Phone</Label>
                  <Input
                    value={editingFaculty.phone}
                    onChange={(e) =>
                      setEditingFaculty({ ...editingFaculty, phone: e.target.value })
                    }
                    className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Department</Label>
                  <Select
                    value={editingFaculty.department}
                    onValueChange={(value) =>
                      setEditingFaculty({ ...editingFaculty, department: value })
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
                  <Label className="text-slate-300">Designation</Label>
                  <Select
                    value={editingFaculty.designation}
                    onValueChange={(value) =>
                      setEditingFaculty({ ...editingFaculty, designation: value })
                    }
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Professor">Professor</SelectItem>
                      <SelectItem value="Associate Professor">
                        Associate Professor
                      </SelectItem>
                      <SelectItem value="Assistant Professor">
                        Assistant Professor
                      </SelectItem>
                      <SelectItem value="Lecturer">Lecturer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Qualification</Label>
                  <Select
                    value={editingFaculty.qualification}
                    onValueChange={(value) =>
                      setEditingFaculty({ ...editingFaculty, qualification: value })
                    }
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ph.D.">Ph.D.</SelectItem>
                      <SelectItem value="M.Tech">M.Tech</SelectItem>
                      <SelectItem value="M.E.">M.E.</SelectItem>
                      <SelectItem value="M.Sc">M.Sc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Status</Label>
                  <Select
                    value={editingFaculty.status}
                    onValueChange={(value) =>
                      setEditingFaculty({ ...editingFaculty, status: value })
                    }
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="On Leave">On Leave</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={handleEditFaculty}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Update Faculty
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation */}
      <AlertDialog
        open={deleteFacultyId !== null}
        onOpenChange={() => setDeleteFacultyId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this faculty member? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteFaculty}
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
