import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MessageSquare, CheckCircle, Clock, ArrowLeft } from "lucide-react";

export default function ManageGrievances({ onSectionChange }) {
  const [grievances, setGrievances] = useState([
    {
      id: "G001",
      title: "Hostel mess food quality complaint",
      student: "STU2021045",
      category: "Hostel",
      priority: "High",
      status: "Pending",
      date: "2025-11-01",
      description: "The quality of food served in the mess has deteriorated significantly.",
    },
    {
      id: "G002",
      title: "Library book fine dispute",
      student: "STU2021089",
      category: "Library",
      priority: "Medium",
      status: "In Progress",
      date: "2025-10-30",
      description: "I was charged a fine for a book that was returned on time.",
    },
    {
      id: "G003",
      title: "Exam results clarification needed",
      student: "STU2021123",
      category: "Academic",
      priority: "Medium",
      status: "Pending",
      date: "2025-10-29",
      description: "Need clarification on marks obtained in Database Management exam.",
    },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setGrievances(
      grievances.map((g) => (g.id === id ? { ...g, status: newStatus } : g))
    );
    alert(`Grievance ${id} status updated to ${newStatus}`);
  };

  const getPriorityBadge = (priority) => {
    return priority === "High" ? "destructive" : priority === "Medium" ? "default" : "secondary";
  };

  const getStatusBadge = (status) => {
    return status === "Resolved" ? "default" : status === "In Progress" ? "secondary" : "outline";
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
                <MessageSquare className="h-6 w-6" />
                Grievance Management
              </CardTitle>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-orange-400" />
                <span className="text-slate-300">Pending</span>
              </div>
              <p className="text-2xl text-slate-100">
                {grievances.filter((g) => g.status === "Pending").length}
              </p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-5 w-5 text-blue-400" />
                <span className="text-slate-300">In Progress</span>
              </div>
              <p className="text-2xl text-slate-100">
                {grievances.filter((g) => g.status === "In Progress").length}
              </p>
            </div>
            <div className="bg-slate-700 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span className="text-slate-300">Resolved</span>
              </div>
              <p className="text-2xl text-slate-100">
                {grievances.filter((g) => g.status === "Resolved").length}
              </p>
            </div>
          </div>

          {grievances.map((grievance) => (
            <div
              key={grievance.id}
              className="p-4 bg-slate-700 rounded-lg border border-slate-600"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-slate-600 text-slate-300">
                      {grievance.id}
                    </Badge>
                    <Badge variant={getPriorityBadge(grievance.priority)}>
                      {grievance.priority}
                    </Badge>
                    <Badge className="bg-purple-600">{grievance.category}</Badge>
                  </div>
                  <h3 className="text-slate-100 mb-2">
                    {grievance.title}
                  </h3>
                  <p className="text-sm text-slate-300 mb-3">
                    {grievance.description}
                  </p>
                  <div className="flex flex-wrap gap-3 text-xs text-slate-400">
                    <span>Student: {grievance.student}</span>
                    <span>📅 {grievance.date}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2 min-w-[180px]">
                  <Badge variant={getStatusBadge(grievance.status)} className="justify-center">
                    {grievance.status}
                  </Badge>
                  <Select
                    value={grievance.status}
                    onValueChange={(value) => handleStatusChange(grievance.id, value)}
                  >
                    <SelectTrigger className="bg-slate-600 border-slate-500 text-slate-100 h-9">
                      <SelectValue placeholder="Change Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
          {grievances.length === 0 && (
            <div className="text-center text-slate-400 py-8">
              No grievances to display
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
