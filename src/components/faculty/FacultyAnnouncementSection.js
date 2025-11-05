import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Badge } from "../ui/badge";
import { Bell, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export default function FacultyAnnouncementSection() {
  const [announcements, setAnnouncements] = React.useState([
    {
      id: 1,
      title: "Midterm Exam Schedule",
      content: "The midterm exams will be held from Nov 10-15. Please prepare accordingly.",
      priority: "high",
      date: "2025-10-25",
      course: "CS101",
    },
    {
      id: 2,
      title: "Assignment Deadline Extended",
      content: "Assignment 3 deadline has been extended to Nov 5.",
      priority: "medium",
      date: "2025-10-26",
      course: "CS201",
    },
  ]);

  const [isOpen, setIsOpen] = React.useState(false);
  const [newAnnouncement, setNewAnnouncement] = React.useState({
    title: "",
    content: "",
    priority: "medium",
    course: "",
  });

  const courses = [
    { id: "CS101", name: "Introduction to Programming" },
    { id: "CS201", name: "Data Structures" },
    { id: "CS301", name: "Algorithms" },
  ];

  const handleAddAnnouncement = () => {
    if (!newAnnouncement.title || !newAnnouncement.content || !newAnnouncement.course) {
      alert("Please fill all fields");
      return;
    }

    const announcement = {
      id: Date.now(),
      ...newAnnouncement,
      date: new Date().toISOString().split('T')[0],
    };

    setAnnouncements([announcement, ...announcements]);
    setNewAnnouncement({ title: "", content: "", priority: "medium", course: "" });
    setIsOpen(false);
  };

  const handleDeleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-xl text-slate-100">Announcements</h2>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  New Announcement
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700 text-slate-100 max-w-[95vw] sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-slate-100">Create Announcement</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Title</label>
                    <Input
                      placeholder="Announcement title"
                      value={newAnnouncement.title}
                      onChange={(e) =>
                        setNewAnnouncement({ ...newAnnouncement, title: e.target.value })
                      }
                      className="bg-slate-700 border-slate-600 text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-slate-300 mb-2 block">Content</label>
                    <Textarea
                      placeholder="Announcement content"
                      value={newAnnouncement.content}
                      onChange={(e) =>
                        setNewAnnouncement({ ...newAnnouncement, content: e.target.value })
                      }
                      className="bg-slate-700 border-slate-600 text-slate-100"
                      rows={4}
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-slate-300 mb-2 block">Course</label>
                      <Select
                        value={newAnnouncement.course}
                        onValueChange={(value) =>
                          setNewAnnouncement({ ...newAnnouncement, course: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                          <SelectValue placeholder="Select course" />
                        </SelectTrigger>
                        <SelectContent>
                          {courses.map((course) => (
                            <SelectItem key={course.id} value={course.id}>
                              {course.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm text-slate-300 mb-2 block">Priority</label>
                      <Select
                        value={newAnnouncement.priority}
                        onValueChange={(value) =>
                          setNewAnnouncement({ ...newAnnouncement, priority: value })
                        }
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <Button
                    onClick={handleAddAnnouncement}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    Create Announcement
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id} className="bg-slate-700 border-slate-600">
              <CardContent className="p-4">
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Bell className="h-4 w-4 text-blue-400 shrink-0" />
                        <h3 className="text-slate-100 break-words">{announcement.title}</h3>
                      </div>
                      <p className="text-sm text-slate-300 mb-3 break-words">{announcement.content}</p>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs text-slate-400">
                        <span>Course: {announcement.course}</span>
                        <span>Date: {announcement.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <Badge
                        variant={
                          announcement.priority === "high"
                            ? "destructive"
                            : announcement.priority === "medium"
                            ? "default"
                            : "secondary"
                        }
                        className="shrink-0"
                      >
                        {announcement.priority}
                      </Badge>
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleDeleteAnnouncement(announcement.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-slate-600 shrink-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {announcements.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              No announcements yet. Create your first announcement!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
