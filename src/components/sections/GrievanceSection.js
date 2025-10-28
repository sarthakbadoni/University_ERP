import React, { useState } from 'react';
import { Button } from '../ui/button';

const categories = ['Exam', 'Library', 'Hostel', 'Academic', 'Fee', 'Other'];
const priorities = ['High', 'Medium', 'Low'];

const initialGrievances = [
  {
    id: 'G001',
    title: 'Unfair grading in Computer Networks exam',
    description: 'I believe there was an error in my exam evaluation...',
    status: 'Under Review',
    priority: 'High',
    assignedTo: 'Dr. Sharma (HOD CSE)',
    submitted: '2024-09-08',
    updated: '2024-09-10'
  },
  {
    id: 'G002',
    title: 'Library book fine dispute',
    description: 'I was charged a fine for a book that was returned on time...',
    status: 'Resolved',
    priority: 'Medium',
    assignedTo: 'Library Administrator',
    submitted: '2024-08-25',
    updated: '2024-09-01'
  },
  {
    id: 'G003',
    title: 'Hostel mess food quality complaint',
    description: 'The quality of food served in the mess has deteriorated...',
    status: 'In Progress',
    priority: 'Medium',
    assignedTo: 'Hostel Warden',
    submitted: '2024-08-20',
    updated: '2024-08-28'
  }
];

function badgeStyle(type, value) {
  if (type === "priority") {
    if (value === "High") return "bg-red-800 text-white";
    if (value === "Medium") return "bg-gray-700 text-white";
    return "bg-gray-600 text-gray-100";
  }
  if (value === "Under Review") return "bg-black text-white border border-slate-300";
  if (value === "Resolved") return "bg-white text-gray-900";
  if (value === "In Progress") return "bg-gray-700 text-white";
  return "bg-gray-600 text-gray-100";
}

export default function GrievanceSection() {
  const [grievances, setGrievances] = useState(initialGrievances);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '', description: '', category: '', priority: 'Medium'
  });

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    const dt = new Date();
    setGrievances([
      {
        id: 'G' + (grievances.length + 1).toString().padStart(3, '0'),
        title: form.title,
        description: form.description,
        category: form.category,
        priority: form.priority,
        status: 'Under Review',
        assignedTo: 'To Be Assigned',
        submitted: dt.toISOString().split('T')[0],
        updated: dt.toISOString().split('T')[0]
      },
      ...grievances,
    ]);
    setShowForm(false);
    setForm({ title: '', description: '', category: '', priority: 'Medium' });
  }

  // Stats Calculation Logic
  const totalStats = grievances.length;
  const resolvedStats = grievances.filter(g => g.status === "Resolved").length;
  const pendingStats = grievances.filter(g => g.status !== "Resolved").length;
  const avgResolution = "7 days"; // Placeholder

  return (
    <div className="max-w-6xl mx-auto px-4 pt-8">
      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
        <div className="bg-[#11141b] rounded-2xl shadow p-6 flex flex-col">
          <span className="text-gray-400 text-base mb-1">Total Grievances</span>
          <span className="text-3xl font-bold text-white">{totalStats}</span>
        </div>
        <div className="bg-[#11141b] rounded-2xl shadow p-6 flex flex-col">
          <span className="text-gray-400 text-base mb-1">Pending</span>
          <span className="text-3xl font-bold text-orange-400">{pendingStats}</span>
        </div>
        <div className="bg-[#11141b] rounded-2xl shadow p-6 flex flex-col">
          <span className="text-gray-400 text-base mb-1">Resolved</span>
          <span className="text-3xl font-bold text-green-400">{resolvedStats}</span>
        </div>
        <div className="bg-[#11141b] rounded-2xl shadow p-6 flex flex-col">
          <span className="text-gray-400 text-base mb-1">Avg Resolution Time</span>
          <span className="text-3xl font-bold text-blue-500">{avgResolution}</span>
        </div>
      </div>
      {/* Heading + Button */}
      <div className="flex justify-between items-center mb-6 mt-2">
        <span className="flex items-center gap-2 text-lg font-semibold text-white">
          <span>📝</span> My Grievances
        </span>
        <Button
          className="bg-white px-6 py-2 rounded-md text-gray-900 font-semibold border border-slate-200 hover:bg-slate-200"
          onClick={() => setShowForm(true)}
        >
          + Submit New Grievance
        </Button>
      </div>
      {/* New Grievance Modal Form */}
      {showForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/70 z-50 flex justify-center items-center">
          <div className="bg-[#161820] rounded-2xl p-7 shadow-lg min-w-[330px] max-w-lg w-full flex flex-col">
            <h2 className="text-xl font-bold mb-4 text-white">Submit New Grievance</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-gray-200 font-medium mb-1" htmlFor="title">Title</label>
                <input className="w-full rounded px-4 py-2 bg-slate-800 text-white" type="text" required name="title" id="title" value={form.title} onChange={handleInput} placeholder="Enter grievance title" />
              </div>
              <div>
                <label className="block text-gray-200 font-medium mb-1" htmlFor="category">Category</label>
                <select className="w-full rounded px-4 py-2 bg-slate-800 text-white" required name="category" id="category" value={form.category} onChange={handleInput}>
                  <option value="">Select category</option>
                  {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-200 font-medium mb-1" htmlFor="priority">Priority</label>
                <select className="w-full rounded px-4 py-2 bg-slate-800 text-white" required name="priority" id="priority" value={form.priority} onChange={handleInput}>
                  {priorities.map((pri) => <option key={pri} value={pri}>{pri}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-gray-200 font-medium mb-1" htmlFor="description">Description</label>
                <textarea className="w-full rounded px-4 py-2 bg-slate-800 text-white" rows={4} required name="description" id="description" value={form.description} onChange={handleInput} placeholder="Describe your grievance..." />
              </div>
              <div className="flex gap-3 mt-1">
                <Button type="submit" className="bg-blue-700 text-white px-5 py-2 rounded font-semibold hover:bg-blue-900">Submit</Button>
                <Button
                  type="button"
                  className="bg-gray-700 text-white px-5 py-2 rounded font-semibold hover:bg-gray-900"
                  onClick={() => setShowForm(false)}
                >Cancel</Button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Grievance Cards */}
      <div className="space-y-7">
        {grievances.map((g) => (
          <div key={g.id} className="rounded-2xl bg-[#12131a] border border-slate-800 px-6 py-6 flex flex-col gap-2 hover:bg-slate-900/40 transition">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-lg font-bold text-white">{g.title}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeStyle("priority", g.priority)}`}>{g.priority}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${badgeStyle("status", g.status)}`}>{g.status}</span>
              </div>
              <Button variant="secondary" className="bg-[#181d2a] px-5 py-2 rounded-lg text-white border border-slate-700 hover:bg-[#23283a] font-semibold shadow-none ml-auto">
                View Details
              </Button>
            </div>
            <div className="text-gray-400 text-sm mt-2">{g.description}</div>
            <div className="flex flex-wrap gap-x-8 gap-y-1 mt-2 text-gray-400 text-xs items-center">
              <div className="flex gap-1 items-center">
                <span>📅</span>
                <span>Submitted: {g.submitted}</span>
              </div>
              <div className="flex gap-1 items-center">
                <span>📅</span>
                <span>Updated: {g.updated}</span>
              </div>
              <div className="flex gap-1 items-center">
                <span>👤</span>
                <span>Assigned: {g.assignedTo}</span>
              </div>
              <div className="flex gap-1 items-center">
                <span>ID: <span className="text-white">{g.id}</span></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
