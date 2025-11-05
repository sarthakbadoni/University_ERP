import React, { useState } from "react";
import { Button } from "../ui/button";
import { Download, FileText, File, Image, Search, Filter } from "lucide-react";

const resourceData = [
  {
    id: 1,
    title: "Database Normalization Notes",
    subject: "Database Management Systems",
    course: "CS301",
    faculty: "Dr. R. S. Sharma",
    type: "PDF",
    size: "2.5 MB",
    uploadDate: "2024-09-15",
    description: "Complete notes on database normalization including 1NF, 2NF, 3NF, and BCNF with examples"
  },
  {
    id: 2,
    title: "SDLC Models Presentation",
    subject: "Software Engineering",
    course: "CS302",
    faculty: "Ms. Priya Singh",
    type: "PPT",
    size: "5.8 MB",
    uploadDate: "2024-09-14",
    description: "Detailed presentation covering Waterfall, Agile, Spiral and other SDLC models"
  },
  {
    id: 3,
    title: "Network Protocols Handbook",
    subject: "Computer Networks",
    course: "CS303",
    faculty: "Mr. Aman Gupta",
    type: "PDF",
    size: "3.2 MB",
    uploadDate: "2024-09-13",
    description: "Comprehensive guide to TCP/IP, HTTP, FTP, and other networking protocols"
  },
  {
    id: 4,
    title: "Process Scheduling Algorithms",
    subject: "Operating Systems",
    course: "CS304",
    faculty: "Dr. K. R. Mehta",
    type: "PDF",
    size: "1.8 MB",
    uploadDate: "2024-09-12",
    description: "Detailed explanation of FCFS, SJF, Round Robin, and Priority scheduling"
  },
  {
    id: 5,
    title: "JavaScript ES6 Features",
    subject: "Web Technologies",
    course: "CS305",
    faculty: "Mrs. Neha Verma",
    type: "PDF",
    size: "2.1 MB",
    uploadDate: "2024-09-11",
    description: "Modern JavaScript features including Arrow Functions, Promises, and Async/Await"
  },
  {
    id: 6,
    title: "SQL Query Examples",
    subject: "Database Management Systems",
    course: "CS301",
    faculty: "Dr. R. S. Sharma",
    type: "DOC",
    size: "856 KB",
    uploadDate: "2024-09-10",
    description: "Practice SQL queries with solutions for joins, subqueries, and aggregations"
  },
  {
    id: 7,
    title: "UML Diagrams Tutorial",
    subject: "Software Engineering",
    course: "CS302",
    faculty: "Ms. Priya Singh",
    type: "PDF",
    size: "4.2 MB",
    uploadDate: "2024-09-09",
    description: "Complete guide to UML class diagrams, sequence diagrams, and use case diagrams"
  },
  {
    id: 8,
    title: "OSI Model Illustration",
    subject: "Computer Networks",
    course: "CS303",
    faculty: "Mr. Aman Gupta",
    type: "IMAGE",
    size: "512 KB",
    uploadDate: "2024-09-08",
    description: "Visual representation of all 7 layers of the OSI model with functions"
  }
];

const courses = ["All Courses", ...new Set(resourceData.map(r => r.course))];
const types = ["All Types", "PDF", "PPT", "DOC", "IMAGE"];

function getFileIcon(type) {
  switch(type) {
    case "PDF":
      return <FileText className="h-5 w-5 text-red-400" />;
    case "PPT":
      return <FileText className="h-5 w-5 text-orange-400" />;
    case "DOC":
      return <FileText className="h-5 w-5 text-blue-400" />;
    case "IMAGE":
      return <Image className="h-5 w-5 text-green-400" />;
    default:
      return <File className="h-5 w-5 text-gray-400" />;
  }
}

function getTypeColor(type) {
  switch(type) {
    case "PDF":
      return "bg-red-900 text-red-200";
    case "PPT":
      return "bg-orange-900 text-orange-200";
    case "DOC":
      return "bg-blue-900 text-blue-200";
    case "IMAGE":
      return "bg-green-900 text-green-200";
    default:
      return "bg-gray-900 text-gray-200";
  }
}

export default function ResourceSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [selectedType, setSelectedType] = useState("All Types");
  const [showFilters, setShowFilters] = useState(false);

  const filteredResources = resourceData.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = selectedCourse === "All Courses" || resource.course === selectedCourse;
    const matchesType = selectedType === "All Types" || resource.type === selectedType;
    
    return matchesSearch && matchesCourse && matchesType;
  });

  const handleDownload = (resource) => {
    alert(`Downloading: ${resource.title}`);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-8 pb-10">
      <h1 className="text-3xl font-bold text-white mb-2 text-center">Study Resources</h1>
      <div className="text-blue-200 mb-6 text-center">Welcome back, Arjun Sharma</div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <div className="bg-slate-800 rounded-2xl p-5 text-center">
          <div className="text-gray-300 mb-2">Total Resources</div>
          <div className="text-3xl font-bold text-purple-400">{resourceData.length}</div>
        </div>
        <div className="bg-slate-800 rounded-2xl p-5 text-center">
          <div className="text-gray-300 mb-2">PDF Files</div>
          <div className="text-3xl font-bold text-red-400">{resourceData.filter(r => r.type === "PDF").length}</div>
        </div>
        <div className="bg-slate-800 rounded-2xl p-5 text-center">
          <div className="text-gray-300 mb-2">Presentations</div>
          <div className="text-3xl font-bold text-orange-400">{resourceData.filter(r => r.type === "PPT").length}</div>
        </div>
        <div className="bg-slate-800 rounded-2xl p-5 text-center">
          <div className="text-gray-300 mb-2">This Week</div>
          <div className="text-3xl font-bold text-blue-400">5</div>
        </div>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-slate-800 rounded-2xl p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search resources..."
              className="w-full bg-slate-700 text-white rounded-lg pl-10 pr-4 py-2 border border-slate-600 focus:outline-none focus:border-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filter Button (Mobile) */}
          <Button
            className="sm:hidden bg-slate-700 hover:bg-slate-600"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Filters */}
        <div className={`${showFilters ? 'flex' : 'hidden sm:flex'} flex-col sm:flex-row gap-3 mt-3`}>
          <select
            className="bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 flex-1"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          
          <select
            className="bg-slate-700 text-white rounded-lg px-4 py-2 border border-slate-600 flex-1"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Resources List */}
      <div className="bg-slate-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white">
            Available Resources ({filteredResources.length})
          </h2>
        </div>

        {filteredResources.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            <FileText className="h-16 w-16 mx-auto mb-4 text-gray-600" />
            <p className="text-lg">No resources found</p>
            <p className="text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="bg-slate-700 rounded-xl p-5 border border-slate-600 hover:border-slate-500 transition-colors">
                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="mt-1">
                        {getFileIcon(resource.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-semibold text-lg mb-1 break-words">{resource.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getTypeColor(resource.type)}`}>
                            {resource.type}
                          </span>
                          <span className="bg-blue-900 text-blue-200 px-3 py-1 rounded-full text-xs font-semibold">
                            {resource.course}
                          </span>
                          <span className="text-gray-400 text-xs">
                            {resource.size}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-blue-200 text-sm mb-2">{resource.subject}</p>
                    <p className="text-gray-300 text-sm mb-3">{resource.description}</p>
                    
                    <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
                      <span>📚 {resource.faculty}</span>
                      <span>📅 {resource.uploadDate}</span>
                    </div>
                  </div>
                  
                  <div className="flex lg:flex-col gap-2">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 flex-1 lg:flex-none"
                      onClick={() => handleDownload(resource)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Resource Guidelines */}
      <div className="bg-slate-800 rounded-2xl p-6 mt-6">
        <h3 className="text-lg font-bold text-white mb-4">📖 Resource Guidelines</h3>
        <ul className="space-y-2 text-gray-300 text-sm">
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>All resources are uploaded and verified by respective faculty members</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>Please download resources for personal study purposes only</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>Do not redistribute or share downloaded materials without permission</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-400 mt-1">•</span>
            <span>For any issues or queries about resources, contact your faculty directly</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
