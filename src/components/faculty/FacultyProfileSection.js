import React, { useState } from "react";

export default function FacultyProfileSection({ facultyData }) {
  const [profile, setProfile] = useState({
    name: facultyData?.name || "",
    email: facultyData?.email || "",
    department: facultyData?.department || "CSE",
    photo: facultyData?.photo || ""
  });

  const handleChange = e => setProfile({ ...profile, [e.target.name]: e.target.value });

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6">
      <h2 className="font-bold text-xl mb-2 text-blue-700">Profile</h2>
      <form className="mb-4">
        <label className="block mb-1">Full Name</label>
        <input type="text" name="name" value={profile.name} onChange={handleChange} className="p-2 rounded w-full mb-2" />
        <label className="block mb-1">Email</label>
        <input type="email" name="email" value={profile.email} onChange={handleChange} className="p-2 rounded w-full mb-2" />
        <label className="block mb-1">Department</label>
        <input type="text" name="department" value={profile.department} onChange={handleChange} className="p-2 rounded w-full mb-2" />
        <label className="block mb-1">Profile Photo URL</label>
        <input type="text" name="photo" value={profile.photo} onChange={handleChange} className="p-2 rounded w-full mb-2" />
      </form>
      <img
        src={profile.photo || "https://ui-avatars.com/api/?name=Faculty"}
        alt="Profile"
        className="w-24 h-24 rounded-full border-2 border-blue-300"
      />
    </div>
  );
}
