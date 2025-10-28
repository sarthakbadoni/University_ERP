import React from "react";

export default function FacultyHeader({ facultyName, onLogout, onMenuClick }) {
  return (
    <header className="w-full bg-gradient-to-r from-blue-800 to-indigo-700 px-3 py-3 flex items-center justify-between shadow-md z-20">
      <div className="flex items-center gap-2 min-w-0">
        <button className="md:hidden bg-indigo-600 hover:bg-indigo-500 p-2 rounded text-white mr-1 flex-shrink-0"
          onClick={onMenuClick}
          aria-label="Open navigation">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
        </button>
        <span className="font-bold text-base md:text-lg text-white leading-tight truncate">Faculty Portal</span>
      </div>
      <div>
        <span className="font-semibold text-white text-xs md:text-sm truncate">{facultyName}</span>
        <button onClick={onLogout}
          className="ml-1 md:ml-2 bg-white text-blue-700 py-1 px-3 md:px-4 rounded font-semibold hover:bg-blue-50 transition text-xs md:text-sm whitespace-nowrap min-w-max">
          Logout
        </button>
      </div>
    </header>
  );
}
