import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { MessageSquare, Star, TrendingUp, TrendingDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function FacultyFeedbackSection() {
  const overallRatings = {
    average: 4.3,
    total: 142,
    breakdown: {
      5: 68,
      4: 45,
      3: 20,
      2: 6,
      1: 3,
    },
  };

  const feedbackByCategory = [
    { category: "Teaching Quality", rating: 4.5, change: 0.3 },
    { category: "Course Content", rating: 4.2, change: -0.1 },
    { category: "Clarity", rating: 4.4, change: 0.2 },
    { category: "Accessibility", rating: 4.1, change: 0.4 },
    { category: "Responsiveness", rating: 4.3, change: 0.1 },
  ];

  const recentFeedback = [
    {
      id: 1,
      student: "Anonymous",
      courseCode: "CS101",
      section: "Section A",
      rating: 5,
      comment:
        "Excellent teaching style and very clear explanations. The examples used in class are really helpful.",
      date: "2025-10-27",
    },
    {
      id: 2,
      student: "Anonymous",
      courseCode: "CS201",
      section: "Section B",
      rating: 4,
      comment:
        "Good course content, but would appreciate more practical examples.",
      date: "2025-10-26",
    },
    {
      id: 3,
      student: "Anonymous",
      courseCode: "CS301",
      section: "Section A",
      rating: 5,
      comment:
        "Very knowledgeable professor. Assignments are challenging but fair.",
      date: "2025-10-25",
    },
    {
      id: 4,
      student: "Anonymous",
      courseCode: "CS101",
      section: "Section B",
      rating: 3,
      comment:
        "The pace is sometimes too fast. More time for questions would be helpful.",
      date: "2025-10-24",
    },
    {
      id: 5,
      student: "Anonymous",
      courseCode: "CS201",
      section: "Section A",
      rating: 5,
      comment:
        "Love the interactive teaching methods. Lab sessions are very practical and useful.",
      date: "2025-10-23",
    },
    {
      id: 6,
      student: "Anonymous",
      courseCode: "CS101",
      section: "Section C",
      rating: 4,
      comment:
        "Great professor! Office hours are very helpful for clearing doubts.",
      date: "2025-10-22",
    },
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-slate-500"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Star className="h-6 w-6" />
              Overall Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-6">
              <div className="text-5xl mb-2 text-slate-100">
                {overallRatings.average}
              </div>
              <div className="flex items-center justify-center mb-1">
                {renderStars(Math.round(overallRatings.average))}
              </div>
              <p className="text-sm text-slate-400">
                Based on {overallRatings.total} reviews
              </p>
            </div>
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center gap-3">
                  <span className="text-sm text-slate-400 w-12">
                    {stars} star
                  </span>
                  <Progress
                    value={
                      (overallRatings.breakdown[stars] /
                        overallRatings.total) *
                      100
                    }
                    className="flex-1"
                  />
                  <span className="text-sm text-slate-400 w-8">
                    {overallRatings.breakdown[stars]}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <TrendingUp className="h-6 w-6" />
              Performance by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {feedbackByCategory.map((item) => (
                <div key={item.category}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-300">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-100">
                        {item.rating}
                      </span>
                      {item.change >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                      <span
                        className={`text-xs ${
                          item.change >= 0 ? "text-green-400" : "text-red-400"
                        }`}
                      >
                        {item.change > 0 ? "+" : ""}
                        {item.change}
                      </span>
                    </div>
                  </div>
                  <Progress value={(item.rating / 5) * 100} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <MessageSquare className="h-6 w-6" />
            Recent Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="flex flex-wrap h-auto bg-slate-700">
              <TabsTrigger value="all" className="data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100">All</TabsTrigger>
              <TabsTrigger value="CS101" className="data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100">CS101</TabsTrigger>
              <TabsTrigger value="CS201" className="data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100">CS201</TabsTrigger>
              <TabsTrigger value="CS301" className="data-[state=active]:bg-slate-600 data-[state=active]:text-slate-100">CS301</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-3 mt-4">
              {recentFeedback.map((feedback) => (
                <div
                  key={feedback.id}
                  className="p-4 bg-slate-700 rounded-lg border border-slate-600"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline" className="border-slate-600 text-slate-300">{feedback.courseCode}</Badge>
                      <Badge variant="secondary" className="bg-slate-600 text-slate-100">{feedback.section}</Badge>
                      {renderStars(feedback.rating)}
                    </div>
                    <span className="text-xs text-slate-400">
                      {feedback.date}
                    </span>
                  </div>
                  <p className="text-sm text-slate-300 mb-2">
                    {feedback.comment}
                  </p>
                  <p className="text-xs text-slate-400">
                    - {feedback.student}
                  </p>
                </div>
              ))}
            </TabsContent>
            {["CS101", "CS201", "CS301"].map((courseCode) => (
              <TabsContent key={courseCode} value={courseCode} className="mt-4">
                <div className="space-y-3">
                  {recentFeedback
                    .filter((f) => f.courseCode === courseCode)
                    .map((feedback) => (
                      <div
                        key={feedback.id}
                        className="p-4 bg-slate-700 rounded-lg border border-slate-600"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <Badge variant="secondary" className="bg-slate-600 text-slate-100">{feedback.section}</Badge>
                            {renderStars(feedback.rating)}
                          </div>
                          <span className="text-xs text-slate-400">
                            {feedback.date}
                          </span>
                        </div>
                        <p className="text-sm text-slate-300 mb-2">
                          {feedback.comment}
                        </p>
                        <p className="text-xs text-slate-400">
                          - {feedback.student}
                        </p>
                      </div>
                    ))}
                  {recentFeedback.filter((f) => f.courseCode === courseCode).length === 0 && (
                    <div className="text-center text-slate-400 py-8">
                      No feedback available for {courseCode}
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
