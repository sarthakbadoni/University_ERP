import React from "react";

export default function Header({ studentName, studentPhoto, onLogout, onMenuClick }) {
  return (
    <header className="w-full bg-gradient-to-r from-blue-800 to-indigo-700 px-3 py-3 flex items-center justify-between shadow-md z-20">
      {/* Left: Hamburger and Logo/Title */}
      <div className="flex items-center gap-2 min-w-0">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden bg-indigo-600 hover:bg-indigo-500 p-2 rounded text-white mr-1 flex-shrink-0"
          onClick={onMenuClick}
          aria-label="Open navigation"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/54/GEHU_logo.png"
          alt="Graphic Era Logo"
          className="h-9 w-9 rounded-full bg-white object-contain flex-shrink-0"
        />
        <div className="flex flex-col justify-center min-w-0 ml-1">
          <span className="font-bold text-base md:text-lg text-white leading-tight truncate">Graphic Era</span>
          <span className="text-xs text-white/80 truncate">Hill University</span>
        </div>
      </div>
      <div className="hidden md:block flex-1 mx-8 max-w-[400px]">
        <input
          type="text"
          placeholder="Search Modules..."
          className="w-full px-4 py-2 rounded-full outline-none bg-blue-900 text-white placeholder-blue-200"
        />
      </div>
      <div className="flex items-center gap-2 md:gap-6 min-w-0">
        <button className="text-white/90 hover:text-white text-lg flex-shrink-0"><span role="img" aria-label="notifications">🔔</span></button>
        <button className="text-white/90 hover:text-white text-lg flex-shrink-0"><span role="img" aria-label="settings">⚙️</span></button>
        <div className="flex items-center gap-1 md:gap-3 min-w-0">
          <img
            src={studentPhoto}
            alt={studentName}
            className="h-8 w-8 md:h-9 md:w-9 rounded-full object-cover border-2 border-white flex-shrink-0"
          />
          <span className="font-semibold text-white text-xs md:text-sm truncate max-w-[80px]">{studentName}</span>
        </div>
        <button
          onClick={onLogout}
          className="ml-1 md:ml-2 bg-white text-blue-700 py-1 px-3 md:px-4 rounded font-semibold hover:bg-blue-50 transition text-xs md:text-sm whitespace-nowrap min-w-max"
        >
          Logout
        </button>
      </div>
    </header>
  );
}
