import React, { useState } from "react";

export default function FacultyResourceSection() {
  const [resources, setResources] = useState([]);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);

  const uploadResource = e => {
    e.preventDefault();
    if (!title || !file) return;
    setResources([{ id: Date.now(), title, filename: file.name }, ...resources]);
    setTitle("");
    setFile(null);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
      <h2 className="font-bold text-xl mb-2 text-blue-700">Resource Uploads</h2>
      <form onSubmit={uploadResource} className="mb-6">
        <input className="p-2 rounded mb-2 w-full" placeholder="Resource Title"
          value={title} onChange={e => setTitle(e.target.value)} required />
        <input className="p-2 mb-2 w-full" type="file" onChange={e => setFile(e.target.files[0])} required />
        <button className="bg-indigo-600 text-white px-4 py-2 rounded" type="submit">Upload Resource</button>
      </form>
      <ul>
        {resources.map(r => (
          <li key={r.id} className="mb-2 flex items-center">
            <span className="font-medium">{r.title}</span>
            <span className="ml-3 text-slate-500 text-xs">{r.filename}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
