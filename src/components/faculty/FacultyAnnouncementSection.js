import React, { useState } from "react";

const demoAnnouncements = [
  { id: 1, title: "Class Canceled", content: "DBMS class at 11 AM is canceled.", date: "2025-10-28" },
  { id: 2, title: "Submission Reminder", content: "Submit project report by tomorrow!", date: "2025-10-29" }
];

export default function FacultyAnnouncementSection() {
  const [announcements, setAnnouncements] = useState(demoAnnouncements);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addAnnouncement = e => {
    e.preventDefault();
    setAnnouncements([{ id: Date.now(), title, content, date: new Date().toISOString().slice(0,10) }, ...announcements]);
    setTitle("");
    setContent("");
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
      <h2 className="font-bold text-xl mb-4 text-blue-700">Circulars / Announcements</h2>
      <form onSubmit={addAnnouncement} className="mb-6">
        <input
          className="p-2 rounded mb-2 w-full"
          placeholder="Announcement title"
          value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea
          className="p-2 rounded mb-2 w-full"
          placeholder="Announcement content"
          value={content} onChange={e => setContent(e.target.value)} required />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded" type="submit">
          Send Announcement
        </button>
      </form>
      <ul>
        {announcements.map(a => (
          <li key={a.id} className="mb-3">
            <div className="font-semibold text-indigo-700">{a.title} <span className="text-xs text-slate-500">({a.date})</span></div>
            <div className="text-slate-700 dark:text-slate-200">{a.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
