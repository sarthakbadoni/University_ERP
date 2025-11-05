import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Users,
  GraduationCap,
  Calendar,
  TrendingUp,
  AlertCircle,
  Building,
  DollarSign,
  FileText,
} from "lucide-react";

export default function AdminOverview({ onSectionChange }) {
  const stats = [
    {
      title: "Total Students",
      value: "2,845",
      icon: GraduationCap,
      color: "bg-blue-600",
      change: "+125 this month",
      trend: "up",
    },
    {
      title: "Total Faculty",
      value: "186",
      icon: Users,
      color: "bg-green-600",
      change: "+8 this month",
      trend: "up",
    },
    {
      title: "Active Courses",
      value: "92",
      icon: FileText,
      color: "bg-purple-600",
      change: "12 courses this sem",
      trend: "neutral",
    },
    {
      title: "Pending Grievances",
      value: "23",
      icon: AlertCircle,
      color: "bg-orange-600",
      change: "-5 from last week",
      trend: "down",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New student admission",
      details: "John Doe (CS2025001) admitted to B.Tech CSE",
      time: "2 hours ago",
      type: "success",
    },
    {
      id: 2,
      action: "Faculty leave approved",
      details: "Dr. Smith's leave request for 15-20 Nov approved",
      time: "5 hours ago",
      type: "info",
    },
    {
      id: 3,
      action: "Fee payment received",
      details: "₹45,000 received from STU2021045",
      time: "1 day ago",
      type: "success",
    },
    {
      id: 4,
      action: "Grievance resolved",
      details: "Hostel complaint #GR234 marked as resolved",
      time: "1 day ago",
      type: "info",
    },
    {
      id: 5,
      action: "Exam schedule published",
      details: "Mid-term exam schedule for Semester 6 released",
      time: "2 days ago",
      type: "warning",
    },
  ];

  const quickActions = [
    { id: "students", label: "Add Student", icon: GraduationCap, color: "blue" },
    { id: "faculty", label: "Add Faculty", icon: Users, color: "green" },
    { id: "timetables", label: "Manage Timetables", icon: Calendar, color: "purple" },
    { id: "circulars", label: "Post Circular", icon: FileText, color: "orange" },
  ];

  const pendingTasks = [
    { task: "Approve 8 new faculty applications", priority: "high", section: "faculty" },
    { task: "Review 15 student admission requests", priority: "high", section: "students" },
    { task: "Process 12 pending fee refunds", priority: "medium", section: "fees" },
    { task: "Resolve 23 pending grievances", priority: "medium", section: "grievances" },
    { task: "Update semester 7 timetable", priority: "low", section: "timetables" },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white border-0">
        <CardContent className="p-6">
          <h2 className="text-2xl mb-2">
            Welcome to Admin Dashboard
          </h2>
          <p className="text-red-100">
            System overview and management controls
          </p>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="bg-slate-800 border-slate-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <p className="text-2xl text-slate-100 mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-400 mb-1">
                  {stat.title}
                </p>
                <p className="text-xs text-slate-500">{stat.change}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="text-slate-100">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              const colorClasses = {
                blue: "bg-blue-900/20 border-blue-800/30 hover:bg-blue-900/30",
                green: "bg-green-900/20 border-green-800/30 hover:bg-green-900/30",
                purple: "bg-purple-900/20 border-purple-800/30 hover:bg-purple-900/30",
                orange: "bg-orange-900/20 border-orange-800/30 hover:bg-orange-900/30",
              };
              const iconColors = {
                blue: "text-blue-400",
                green: "text-green-400",
                purple: "text-purple-400",
                orange: "text-orange-400",
              };
              return (
                <button
                  key={action.id}
                  onClick={() => onSectionChange(action.id)}
                  className={`p-4 rounded-lg transition-colors text-center border ${colorClasses[action.color]}`}
                >
                  <Icon className={`h-6 w-6 ${iconColors[action.color]} mx-auto mb-2`} />
                  <p className="text-sm text-slate-300">
                    {action.label}
                  </p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pending Tasks */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <AlertCircle className="h-5 w-5 text-orange-400" />
              Pending Tasks
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pendingTasks.map((item, index) => (
              <div
                key={index}
                className="p-3 bg-slate-700 rounded-lg border border-slate-600 cursor-pointer hover:bg-slate-600 transition-colors"
                onClick={() => onSectionChange(item.section)}
              >
                <div className="flex items-start justify-between">
                  <p className="text-sm text-slate-100 flex-1">
                    {item.task}
                  </p>
                  <Badge
                    variant={
                      item.priority === "high"
                        ? "destructive"
                        : item.priority === "medium"
                          ? "default"
                          : "secondary"
                    }
                    className="ml-2"
                  >
                    {item.priority}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-100">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="p-3 bg-slate-700 rounded-lg border border-slate-600"
              >
                <p className="text-slate-100 mb-1">
                  {activity.action}
                </p>
                <p className="text-xs text-slate-400 mb-2">
                  {activity.details}
                </p>
                <p className="text-xs text-slate-500">{activity.time}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
