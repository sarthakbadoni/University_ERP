import React, { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Textarea } from "../ui/textarea";
import { Star, Send, CheckCircle } from "lucide-react";

const facultyList = [
  { id: "FAC001", name: "Dr. R. S. Sharma", subject: "Database Management Systems", course: "CS301" },
  { id: "FAC002", name: "Ms. Priya Singh", subject: "Software Engineering", course: "CS302" },
  { id: "FAC003", name: "Mr. Aman Gupta", subject: "Computer Networks", course: "CS303" },
  { id: "FAC004", name: "Dr. K. R. Mehta", subject: "Operating Systems", course: "CS304" },
  { id: "FAC005", name: "Mrs. Neha Verma", subject: "Web Technologies", course: "CS305" },
];

const categories = [
  "Teaching Quality",
  "Course Content",
  "Communication",
  "Availability"
];

const mySubmittedFeedback = [
  {
    id: 1,
    faculty: "Dr. R. S. Sharma",
    course: "CS301",
    subject: "Database Management Systems",
    rating: 5,
    comment: "Excellent teaching methods and very clear explanations.",
    date: "2024-09-15",
    status: "Submitted"
  },
  {
    id: 2,
    faculty: "Ms. Priya Singh",
    course: "CS302",
    subject: "Software Engineering",
    rating: 4,
    comment: "Great course content, but could provide more examples.",
    date: "2024-09-10",
    status: "Submitted"
  }
];

export default function FeedbackSection() {
  const [showForm, setShowForm] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [ratings, setRatings] = useState({
    "Teaching Quality": 0,
    "Course Content": 0,
    "Communication": 0,
    "Availability": 0
  });
  const [comment, setComment] = useState("");
  const [submittedFeedback, setSubmittedFeedback] = useState(mySubmittedFeedback);

  const handleSubmit = (e) => {
    e.preventDefault();
    const faculty = facultyList.find(f => f.id === selectedFaculty);
    const avgRating = Object.values(ratings).reduce((a, b) => a + b, 0) / categories.length;
    
    const newFeedback = {
      id: submittedFeedback.length + 1,
      faculty: faculty.name,
      course: faculty.course,
      subject: faculty.subject,
      rating: Math.round(avgRating),
      comment: comment,
      date: new Date().toISOString().split('T')[0],
      status: "Submitted"
    };
    
    setSubmittedFeedback([newFeedback, ...submittedFeedback]);
    setShowForm(false);
    setSelectedFaculty("");
    setRatings({
      "Teaching Quality": 0,
      "Course Content": 0,
      "Communication": 0,
      "Availability": 0
    });
    setComment("");
    alert("Feedback submitted successfully!");
  };

  const renderStars = (category, interactive = false) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${interactive ? 'cursor-pointer' : ''} ${
              star <= (interactive ? ratings[category] : category)
                ? "fill-yellow-400 text-yellow-400"
                : "text-slate-500"
            }`}
            onClick={() => {
              if (interactive) {
                setRatings({ ...ratings, [category]: star });
              }
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pt-8 pb-10">
      <h1 className="text-3xl font-bold text-white mb-2 text-center">Faculty Feedback</h1>
      <div className="text-blue-200 mb-6 text-center">Welcome back, Arjun Sharma</div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800 rounded-2xl p-5 text-center">
          <div className="text-gray-300 mb-2">Total Feedbacks</div>
          <div className="text-3xl font-bold text-purple-400">{submittedFeedback.length}</div>
        </div>
        <div className="bg-slate-800 rounded-2xl p-5 text-center">
          <div className="text-gray-300 mb-2">This Semester</div>
          <div className="text-3xl font-bold text-blue-400">{submittedFeedback.length}</div>
        </div>
        <div className="bg-slate-800 rounded-2xl p-5 text-center">
          <div className="text-gray-300 mb-2">Pending</div>
          <div className="text-3xl font-bold text-orange-400">{facultyList.length - submittedFeedback.length}</div>
        </div>
      </div>

      {/* Submit Feedback Button */}
      <div className="mb-6">
        <Button
          className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
          onClick={() => setShowForm(true)}
        >
          <Send className="h-4 w-4 mr-2" />
          Submit New Feedback
        </Button>
      </div>

      {/* Feedback Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
          <div className="bg-slate-800 rounded-2xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-white mb-6">Submit Faculty Feedback</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Faculty Selection */}
              <div>
                <label className="block text-white mb-2">Select Faculty</label>
                <select
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600"
                  value={selectedFaculty}
                  onChange={(e) => setSelectedFaculty(e.target.value)}
                  required
                >
                  <option value="">Choose a faculty member</option>
                  {facultyList.map((faculty) => (
                    <option key={faculty.id} value={faculty.id}>
                      {faculty.name} - {faculty.subject} ({faculty.course})
                    </option>
                  ))}
                </select>
              </div>

              {/* Rating Categories */}
              <div>
                <label className="block text-white mb-3">Rate the following aspects</label>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <div key={category} className="bg-slate-700 rounded-lg p-4">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span className="text-white">{category}</span>
                        {renderStars(category, true)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div>
                <label className="block text-white mb-2">Additional Comments (Optional)</label>
                <Textarea
                  className="w-full bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 min-h-[120px]"
                  placeholder="Share your thoughts about the faculty's teaching methods, course delivery, etc."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 flex-1"
                  disabled={!selectedFaculty || Object.values(ratings).every(r => r === 0)}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Feedback
                </Button>
                <Button
                  type="button"
                  className="bg-slate-700 hover:bg-slate-600 flex-1"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Submitted Feedbacks */}
      <div className="bg-slate-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-5">My Submitted Feedbacks</h2>
        
        {submittedFeedback.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            No feedback submitted yet. Start by submitting feedback for your faculty!
          </div>
        ) : (
          <div className="space-y-4">
            {submittedFeedback.map((feedback) => (
              <div key={feedback.id} className="bg-slate-700 rounded-xl p-5 border border-slate-600">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-3">
                  <div>
                    <h3 className="text-white font-semibold mb-1">{feedback.faculty}</h3>
                    <p className="text-blue-200 text-sm">{feedback.subject} ({feedback.course})</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-green-400 text-sm">{feedback.status}</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gray-300 text-sm">Rating:</span>
                  {renderStars(feedback.rating)}
                  <span className="text-yellow-400 font-semibold">{feedback.rating}/5</span>
                </div>
                
                {feedback.comment && (
                  <p className="text-gray-300 text-sm mb-3 italic">"{feedback.comment}"</p>
                )}
                
                <div className="text-xs text-gray-400">
                  Submitted on {feedback.date}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pending Feedbacks */}
      <div className="bg-slate-800 rounded-2xl p-6 mt-6">
        <h2 className="text-xl font-bold text-white mb-5">Pending Feedbacks</h2>
        <div className="space-y-3">
          {facultyList
            .filter(faculty => !submittedFeedback.some(fb => fb.course === faculty.course))
            .map((faculty) => (
              <div key={faculty.id} className="bg-slate-700 rounded-lg p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h3 className="text-white font-semibold">{faculty.name}</h3>
                  <p className="text-blue-200 text-sm">{faculty.subject} ({faculty.course})</p>
                </div>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                  size="sm"
                  onClick={() => {
                    setSelectedFaculty(faculty.id);
                    setShowForm(true);
                  }}
                >
                  Give Feedback
                </Button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
