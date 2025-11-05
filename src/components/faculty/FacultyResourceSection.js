import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  BookOpen,
  Upload,
  FileText,
  Download,
  Trash2,
  Plus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Textarea } from "../ui/textarea";

export default function FacultyResourceSection() {
  const [resources, setResources] = React.useState([
    {
      id: 1,
      title: "Introduction to Algorithms - Chapter 1",
      description: "Basic concepts and notations",
      type: "PDF",
      class: "CS301",
      uploadDate: "2025-10-20",
      size: "2.5 MB",
    },
    {
      id: 2,
      title: "Data Structures Lecture Notes",
      description: "Arrays, Linked Lists, and Trees",
      type: "PDF",
      class: "CS201",
      uploadDate: "2025-10-22",
      size: "1.8 MB",
    },
    {
      id: 3,
      title: "Programming Assignment 3",
      description: "Recursion and Dynamic Programming",
      type: "Document",
      class: "CS101",
      uploadDate: "2025-10-25",
      size: "500 KB",
    },
    {
      id: 4,
      title: "Sample Code - Sorting Algorithms",
      description: "Implementation examples in Python",
      type: "Code",
      class: "CS201",
      uploadDate: "2025-10-26",
      size: "150 KB",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [newResource, setNewResource] = React.useState({
    title: "",
    description: "",
    type: "",
    class: "",
  });

  const handleUploadResource = () => {
    if (
      !newResource.title ||
      !newResource.type ||
      !newResource.class
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const resource = {
      id: resources.length + 1,
      ...newResource,
      uploadDate: new Date().toISOString().split("T")[0],
      size: "1.2 MB",
    };

    setResources([resource, ...resources]);
    setNewResource({ title: "", description: "", type: "", class: "" });
    setIsDialogOpen(false);
  };

  const handleDeleteResource = (id) => {
    setResources(resources.filter((r) => r.id !== id));
  };

  const getTypeIcon = (type) => {
    if (type === "PDF") return <FileText className="h-4 w-4" />;
    if (type === "Code") return <FileText className="h-4 w-4" />;
    return <FileText className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <BookOpen className="h-6 w-6" />
              Course Resources
            </CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Upload Resource
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-slate-100">Upload New Resource</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Title</Label>
                    <Input
                      placeholder="Enter resource title"
                      value={newResource.title}
                      onChange={(e) =>
                        setNewResource({ ...newResource, title: e.target.value })
                      }
                      className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Description</Label>
                    <Textarea
                      placeholder="Enter description"
                      rows={3}
                      value={newResource.description}
                      onChange={(e) =>
                        setNewResource({
                          ...newResource,
                          description: e.target.value,
                        })
                      }
                      className="bg-slate-700 border-slate-600 text-slate-100 mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300">Type</Label>
                    <Select
                      value={newResource.type}
                      onValueChange={(value) =>
                        setNewResource({ ...newResource, type: value })
                      }
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                        <SelectValue placeholder="Select resource type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PDF">PDF Document</SelectItem>
                        <SelectItem value="Document">Document</SelectItem>
                        <SelectItem value="Code">Code File</SelectItem>
                        <SelectItem value="Video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300">Class</Label>
                    <Select
                      value={newResource.class}
                      onValueChange={(value) =>
                        setNewResource({ ...newResource, class: value })
                      }
                    >
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-slate-100 mt-1">
                        <SelectValue placeholder="Select class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CS101">CS101</SelectItem>
                        <SelectItem value="CS201">CS201</SelectItem>
                        <SelectItem value="CS301">CS301</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300">File</Label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer mt-1">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                      <p className="text-sm text-slate-400">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        PDF, DOC, ZIP (max 10MB)
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleUploadResource} className="w-full bg-blue-600 hover:bg-blue-700">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Resource
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="p-4 bg-slate-700 rounded-lg border border-slate-600 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3 flex-1">
                  <div className="p-2 bg-blue-900/30 rounded-lg border border-blue-800/30">
                    {getTypeIcon(resource.type)}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-slate-100 mb-1">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-slate-300 mb-2">
                      {resource.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                      <Badge variant="outline" className="border-slate-600 text-slate-300">{resource.class}</Badge>
                      <Badge variant="secondary" className="bg-slate-600 text-slate-100">{resource.type}</Badge>
                      <span>{resource.size}</span>
                      <span>•</span>
                      <span>{resource.uploadDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-slate-200 hover:bg-slate-600">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-red-400 hover:text-red-300 hover:bg-slate-600"
                    onClick={() => handleDeleteResource(resource.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
