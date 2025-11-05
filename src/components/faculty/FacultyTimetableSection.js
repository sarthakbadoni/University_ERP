import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Calendar, Clock, MapPin } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function FacultyTimetableSection() {
  const timetable = {
    Monday: [
      {
        time: "09:00 - 10:30",
        courseCode: "CS101",
        section: "Section A",
        subject: "Introduction to Programming",
        room: "Room 301",
        type: "Lecture",
      },
      {
        time: "11:00 - 12:30",
        courseCode: "CS201",
        section: "Section B",
        subject: "Data Structures",
        room: "Room 205",
        type: "Lecture",
      },
      {
        time: "14:00 - 15:30",
        courseCode: "CS101",
        section: "Section A",
        subject: "Programming Lab",
        room: "Lab 1",
        type: "Practical",
      },
    ],
    Tuesday: [
      {
        time: "10:00 - 11:30",
        courseCode: "CS201",
        section: "Section A",
        subject: "Data Structures Lab",
        room: "Lab 2",
        type: "Practical",
      },
      {
        time: "13:00 - 14:30",
        courseCode: "CS301",
        section: "Section A",
        subject: "Algorithms",
        room: "Room 401",
        type: "Lecture",
      },
    ],
    Wednesday: [
      {
        time: "09:00 - 10:30",
        courseCode: "CS101",
        section: "Section B",
        subject: "Introduction to Programming",
        room: "Room 301",
        type: "Lecture",
      },
      {
        time: "11:00 - 12:30",
        courseCode: "CS301",
        section: "Section A",
        subject: "Algorithms",
        room: "Room 401",
        type: "Lecture",
      },
      {
        time: "15:00 - 16:30",
        courseCode: "Office Hours",
        section: "",
        subject: "Student Consultation",
        room: "Office 12B",
        type: "Office",
      },
    ],
    Thursday: [
      {
        time: "10:00 - 11:30",
        courseCode: "CS201",
        section: "Section B",
        subject: "Data Structures",
        room: "Room 205",
        type: "Lecture",
      },
      {
        time: "14:00 - 15:30",
        courseCode: "CS301",
        section: "Section A",
        subject: "Algorithms Lab",
        room: "Lab 3",
        type: "Practical",
      },
    ],
    Friday: [
      {
        time: "09:00 - 10:30",
        courseCode: "CS101",
        section: "Section C",
        subject: "Introduction to Programming",
        room: "Room 301",
        type: "Lecture",
      },
      {
        time: "11:00 - 12:30",
        courseCode: "Faculty Meeting",
        section: "",
        subject: "Department Meeting",
        room: "Conference Room",
        type: "Meeting",
      },
    ],
    Saturday: [
      {
        time: "09:00 - 10:30",
        courseCode: "CS201",
        section: "Section A",
        subject: "Data Structures - Extra Class",
        room: "Room 205",
        type: "Lecture",
      },
      {
        time: "11:00 - 12:30",
        courseCode: "CS101",
        section: "Section B",
        subject: "Programming Lab",
        room: "Lab 1",
        type: "Practical",
      },
    ],
  };

  const getTypeBadge = (type) => {
    const colors = {
      Lecture: "default",
      Practical: "secondary",
      Office: "outline",
      Meeting: "destructive",
    };
    return colors[type] || "default";
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date()
    .toLocaleDateString("en-US", { weekday: "long" })
    .split(",")[0];

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Calendar className="h-6 w-6" />
            Weekly Timetable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue={days.includes(today) ? today : "Monday"}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-6 bg-slate-700">
              {days.map((day) => (
                <TabsTrigger key={day} value={day} className="text-xs sm:text-sm data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100">
                  {day.slice(0, 3)}
                </TabsTrigger>
              ))}
            </TabsList>
            {days.map((day) => (
              <TabsContent key={day} value={day} className="space-y-3 mt-4">
                {timetable[day].map((slot, index) => (
                  <div
                    key={index}
                    className="p-4 bg-slate-700 rounded-lg border border-slate-600 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="border-slate-600 text-slate-300">{slot.courseCode}</Badge>
                          {slot.section && <Badge variant="secondary" className="bg-slate-600 text-slate-100">{slot.section}</Badge>}
                          <Badge variant={getTypeBadge(slot.type)}>
                            {slot.type}
                          </Badge>
                        </div>
                        <h3 className="text-slate-100 mb-2">
                          {slot.subject}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-slate-400">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {slot.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {slot.room}
                      </div>
                    </div>
                  </div>
                ))}
                {timetable[day].length === 0 && (
                  <div className="text-center text-slate-400 py-8">
                    No classes scheduled for {day}
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
