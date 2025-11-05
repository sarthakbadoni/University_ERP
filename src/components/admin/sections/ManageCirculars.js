import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { Megaphone, Plus, Edit, Trash2, Send, ArrowLeft, Upload, FileImage } from "lucide-react";
import { Switch } from "../ui/switch";

export default function ManageCirculars({ onSectionChange }) {
  const [circulars, setCirculars] = useState(() => {
    // Load circulars from localStorage
    const stored = localStorage.getItem("circulars");
    if (stored) {
      return JSON.parse(stored);
    }
    return [
      {
        id: 1,
        title: "Mid-Semester Examination Schedule",
        content: "Mid-semester exams will be conducted from Nov 15-20, 2025.",
        target: "All Students",
        priority: "High",
        date: "2025-11-02",
        status: "Published",
        isPopup: false,
      },
      {
        id: 2,
        title: "Library Timings Update",
        content: "Library will remain open till 10 PM on weekdays from Nov 15.",
        target: "All",
        priority: "Medium",
        date: "2025-11-01",
        status: "Published",
        isPopup: false,
      },
    ];
  });

  // Save circulars to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem("circulars", JSON.stringify(circulars));
  }, [circulars]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [circularToDelete, setCircularToDelete] = useState(null);
  const [newCircular, setNewCircular] = useState({
    title: "",
    content: "",
    target: "",
    priority: "Medium",
    isPopup: false,
    attachmentName: "",
    attachmentUrl: "",
  });

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a preview URL for the file
      const fileUrl = URL.createObjectURL(file);
      setNewCircular({
        ...newCircular,
        attachmentName: file.name,
        attachmentUrl: fileUrl,
      });
    }
  };

  const handlePublish = () => {
    if (!newCircular.title || !newCircular.content || !newCircular.target) {
      alert("Please fill in all required fields");
      return;
    }
    setCirculars([
      {
        ...newCircular,
        id: circulars.length + 1,
        date: new Date().toISOString().split("T")[0],
        status: "Published",
      },
      ...circulars,
    ]);
    setNewCircular({ 
      title: "", 
      content: "", 
      target: "", 
      priority: "Medium",
      isPopup: false,
      attachmentName: "",
      attachmentUrl: "",
    });
    setIsDialogOpen(false);
    alert("Circular published successfully!");
  };

  const handleDeleteClick = (id) => {
    setCircularToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (circularToDelete) {
      setCirculars(circulars.filter((c) => c.id !== circularToDelete));
      setIsDeleteDialogOpen(false);
      setCircularToDelete(null);
      alert("Circular deleted successfully!");
    }
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
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Megaphone className="h-6 w-6" />
                Manage Circulars & Notices
              </CardTitle>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Post Circular
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="text-slate-100">Post New Circular</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Title *</Label>
                    <Input
                      placeholder="Enter circular title"
                      value={newCircular.title}
                      onChange={(e) =>
                        setNewCircular({ ...newCircular, title: e.target.value })
                      }
                      className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Content *</Label>
                    <Textarea
                      placeholder="Enter circular content"
                      rows={6}
                      value={newCircular.content}
                      onChange={(e) =>
                        setNewCircular({ ...newCircular, content: e.target.value })
                      }
                      className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-slate-300">Target Audience *</Label>
                      <Select
                        value={newCircular.target}
                        onValueChange={(value) =>
                          setNewCircular({ ...newCircular, target: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                          <SelectValue placeholder="Select target" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="All">All</SelectItem>
                          <SelectItem value="All Students">All Students</SelectItem>
                          <SelectItem value="All Faculty">All Faculty</SelectItem>
                          <SelectItem value="B.Tech">B.Tech Students</SelectItem>
                          <SelectItem value="M.Tech">M.Tech Students</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-slate-300">Priority</Label>
                      <Select
                        value={newCircular.priority}
                        onValueChange={(value) =>
                          setNewCircular({ ...newCircular, priority: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="High">High</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Low">Low</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg border border-slate-600">
                    <div className="flex items-center gap-3">
                      <Megaphone className="h-5 w-5 text-blue-400" />
                      <div>
                        <Label className="text-slate-300">Show as Pop-up on Login</Label>
                        <p className="text-xs text-slate-400 mt-1">
                          Ensures everyone sees this important circular
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={newCircular.isPopup}
                      onCheckedChange={(checked) =>
                        setNewCircular({ ...newCircular, isPopup: checked })
                      }
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Attach File (PDF/Image)</Label>
                    <div className="mt-2">
                      <label
                        htmlFor="file-upload"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg cursor-pointer hover:bg-slate-600 transition-colors"
                      >
                        <Upload className="h-4 w-4 text-slate-400" />
                        <span className="text-sm text-slate-300">
                          {newCircular.attachmentName || "Choose file to upload"}
                        </span>
                      </label>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      {newCircular.attachmentName && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-green-400">
                          <FileImage className="h-4 w-4" />
                          <span>{newCircular.attachmentName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={handlePublish}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Publish Circular
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {circulars.map((circular) => (
            <div
              key={circular.id}
              className="p-4 bg-slate-700 rounded-lg border border-slate-600"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-slate-100">{circular.title}</h3>
                    <Badge
                      variant={
                        circular.priority === "High"
                          ? "destructive"
                          : circular.priority === "Medium"
                            ? "default"
                            : "secondary"
                      }
                    >
                      {circular.priority}
                    </Badge>
                    {circular.isPopup && (
                      <Badge className="bg-purple-600">
                        <Megaphone className="h-3 w-3 mr-1" />
                        Pop-up
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-slate-300 mb-3">{circular.content}</p>
                  {circular.attachmentName && (
                    <div className="flex items-center gap-2 text-sm text-blue-400 mb-3">
                      <FileImage className="h-4 w-4" />
                      <span>{circular.attachmentName}</span>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {circular.target}
                    </Badge>
                    <span>📅 {circular.date}</span>
                    <Badge className="bg-green-600">{circular.status}</Badge>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-slate-600 ml-4"
                  onClick={() => handleDeleteClick(circular.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          {circulars.length === 0 && (
            <div className="text-center text-slate-400 py-8">
              No circulars posted yet. Click "Post Circular" to create one.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="bg-slate-800 border-slate-700">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-slate-100">Delete Circular</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-300">
              Are you sure you want to delete this circular? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-slate-700 text-slate-100 hover:bg-slate-600 border-slate-600">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
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
