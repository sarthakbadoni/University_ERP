import React from "react";
import { Button } from "../ui/button";

const placementStats = {
  eligible: 145,
  placementPercentage: 61.4,
  averagePackage: "6.5 LPA",
  highestPackage: "18.5 LPA",
};

const placementDrives = [
  {
    company: "Tata Consultancy Services (TCS)",
    status: "Open",
    position: "Software Engineer",
    package: "3.5 LPA",
    locations: "Multiple Locations",
    driveDate: "2024-09-28",
    branches: "All Branches",
    deadline: "2024-09-20",
  },
  {
    company: "Infosys Limited",
    status: "Open",
    position: "System Engineer",
    package: "4.0 LPA",
    locations: "Bangalore, Pune",
    driveDate: "2024-10-05",
    branches: "CSE, IT, ECE",
    deadline: "2024-09-25",
  },
  {
    company: "Wipro Technologies",
    status: "Upcoming",
    position: "Project Engineer",
    package: "4.2 LPA",
    locations: "Hyderabad, Chennai",
    driveDate: "2024-10-12",
    branches: "All Branches",
    deadline: "2024-10-01",
  },
];

const myApplications = [
  {
    company: "Microsoft India",
    position: "Software Development Engineer",
    appliedDate: "2024-08-15",
    status: "Interview Scheduled",
    nextRound: "Technical Round 2",
    date: "2024-09-22",
  },
  {
    company: "Amazon",
    position: "SDE Intern",
    appliedDate: "2024-08-10",
    status: "Under Review",
    nextRound: "Pending",
    date: "-",
  },
  {
    company: "Google India",
    position: "Software Engineer",
    appliedDate: "2024-07-25",
    status: "Rejected",
    nextRound: "-",
    date: "-",
  },
];

function StatusBadge({ status }) {
  let color = "bg-slate-700 text-white";
  if (status === "Interview Scheduled") color = "bg-white text-gray-900";
  if (status === "Open") color = "bg-white text-gray-900";
  if (status === "Upcoming") color = "bg-yellow-900 text-yellow-100";
  if (status === "Closed") color = "bg-red-700 text-white";
  if (status === "Under Review") color = "bg-yellow-900 text-yellow-100";
  if (status === "Rejected") color = "bg-red-700 text-white";
  return (
    <span
      className={`px-3 py-1 text-xs font-semibold rounded-full ${color} whitespace-nowrap inline-block`}
    >
      {status}
    </span>
  );
}

const statClasses = [
  "text-2xl md:text-3xl font-bold text-white truncate",
  "text-2xl md:text-3xl font-bold text-blue-400 truncate",
  "text-2xl md:text-3xl font-bold text-purple-400 truncate",
  "text-2xl md:text-3xl font-bold text-orange-400 truncate",
];

const PlacementSection = () => (
  <div className="min-h-screen w-full bg-slate-900">
    {/* Desktop VIEW (lg and up) */}
    <div className="hidden lg:block w-full px-4 py-6">
      <h1 className="text-3xl font-bold text-white mb-2 text-center">Placement Cell</h1>
      <div className="text-blue-200 mb-6 text-lg text-center">Welcome back, Arjun Sharma</div>
      <div className="mx-auto max-w-4xl">
        {/* Centered stats card */}
        <div className="bg-slate-800 rounded-2xl p-6 mb-8 w-full">
          <div className="grid grid-cols-4 gap-6">
            <div className="flex flex-col items-center justify-center">
              <div className="text-md font-medium text-gray-300 mb-2 text-center truncate">Eligible</div>
              <div className={statClasses[0]}>{placementStats.eligible}</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-md font-medium text-gray-300 mb-2 text-center truncate">Placement %</div>
              <div className={statClasses[1]}>{placementStats.placementPercentage}%</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-md font-medium text-gray-300 mb-2 text-center truncate">Avg Package</div>
              <div className={statClasses[2]}>{placementStats.averagePackage}</div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <div className="text-md font-medium text-gray-300 mb-2 text-center truncate">Highest Package</div>
              <div className={statClasses[3]}>{placementStats.highestPackage}</div>
            </div>
          </div>
        </div>
        {/* Upcoming Placement Drives */}
        <div className="bg-slate-800 rounded-2xl shadow-lg p-6 w-full mb-8">
          <h2 className="text-xl font-semibold text-white mb-5">Upcoming Placement Drives</h2>
          {placementDrives.map((drive, idx) => (
            <div key={idx} className="bg-slate-900 rounded-xl p-5 shadow border border-slate-700 flex flex-col md:flex-row md:justify-between md:items-center gap-4 w-full box-border mb-4">
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-1 items-center">
                  <span className="text-lg font-bold text-blue-200 break-words">{drive.company}</span>
                  <StatusBadge status={drive.status} />
                </div>
                <div className="font-medium text-gray-300">{drive.position}</div>
                <div className="flex flex-wrap gap-6 mt-2 text-sm">
                  <span className="text-gray-400 font-medium">₹ {drive.package}</span>
                  <span className="text-gray-400"><span className="font-medium">📍</span> {drive.locations}</span>
                  <span className="text-gray-400"><span className="font-medium">🗓️</span> Drive: {drive.driveDate}</span>
                  <span className="text-gray-400"><span className="font-medium">👥</span> {drive.branches}</span>
                </div>
              </div>
              <div className="flex flex-col items-end w-full md:w-auto mt-2 md:mt-0 box-border">
                <Button className="bg-white px-8 py-2 rounded-lg text-gray-900 font-semibold border border-slate-200 hover:bg-slate-200 mb-2 w-full md:w-auto">
                  {drive.status === "Open" ? "Apply Now" : "View Details"}
                </Button>
                <span className="text-sm text-gray-400">Deadline: {drive.deadline}</span>
              </div>
            </div>
          ))}
        </div>
        {/* Applications Table */}
        <div className="bg-slate-800 rounded-2xl shadow-lg p-6 w-full mb-8">
          <div className="text-xl font-semibold text-white mb-5">My Applications</div>
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[800px] border-separate border-spacing-y-2">
              <thead>
                <tr className="text-blue-200 text-left text-base">
                  <th className="py-3 px-2">Company</th>
                  <th className="py-3 px-2">Position</th>
                  <th className="py-3 px-2">Applied Date</th>
                  <th className="py-3 px-2">Status</th>
                  <th className="py-3 px-2">Next Round</th>
                  <th className="py-3 px-2">Date</th>
                </tr>
              </thead>
              <tbody>
                {myApplications.map((app, i) => (
                  <tr key={i} className="bg-slate-700/60 hover:bg-slate-700 text-gray-100 text-base">
                    <td className="py-3 px-2 font-medium">{app.company}</td>
                    <td className="py-3 px-2">{app.position}</td>
                    <td className="py-3 px-2">{app.appliedDate}</td>
                    <td className="py-3 px-2 min-w-0">
                      <StatusBadge status={app.status} />
                    </td>
                    <td className="py-3 px-2">{app.nextRound}</td>
                    <td className="py-3 px-2">{app.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    {/* MOBILE VIEW */}
    <div className="block lg:hidden w-full px-4 py-6">
      <div className="mx-auto max-w-md">
        <h1 className="text-2xl font-bold text-white mb-2 text-center">Placement Cell</h1>
        <div className="text-blue-200 mb-6 text-center">Welcome back, Arjun Sharma</div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-800 rounded-xl p-4 flex flex-col">
            <div className="font-medium text-gray-300 mb-2">Eligible</div>
            <div className="text-2xl font-bold text-white">{placementStats.eligible}</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 flex flex-col">
            <div className="font-medium text-gray-300 mb-2">Placement %</div>
            <div className="text-2xl font-bold text-blue-400">{placementStats.placementPercentage}%</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 flex flex-col">
            <div className="font-medium text-gray-300 mb-2">Avg Package</div>
            <div className="text-2xl font-bold text-purple-400">{placementStats.averagePackage}</div>
          </div>
          <div className="bg-slate-800 rounded-xl p-4 flex flex-col">
            <div className="font-medium text-gray-300 mb-2">Highest Package</div>
            <div className="text-2xl font-bold text-orange-400">{placementStats.highestPackage}</div>
          </div>
        </div>
        
        {/* Placement Drives */}
        <div className="bg-slate-800 rounded-2xl p-4 mb-6">
          <h2 className="font-bold text-white mb-4">Upcoming Placement Drives</h2>
          <div className="flex flex-col gap-4">
            {placementDrives.map((drive, idx) => (
              <div key={idx} className="bg-slate-900 rounded-xl p-4 border border-slate-700">
                <div className="flex flex-wrap gap-2 mb-2 items-center">
                  <span className="font-bold text-blue-200">{drive.company}</span>
                  <StatusBadge status={drive.status} />
                </div>
                <div className="font-medium text-gray-300 mb-3">{drive.position}</div>
                <div className="flex flex-col gap-2 text-sm mb-3">
                  <span className="text-gray-400 font-medium">₹ {drive.package}</span>
                  <span className="text-gray-400">📍 {drive.locations}</span>
                  <span className="text-gray-400">🗓️ Drive: {drive.driveDate}</span>
                  <span className="text-gray-400">👥 {drive.branches}</span>
                </div>
                <Button className="bg-white px-6 py-2 rounded-lg text-gray-900 font-semibold border border-slate-200 hover:bg-slate-200 w-full mb-2">
                  {drive.status === "Open" ? "Apply Now" : "View Details"}
                </Button>
                <div className="text-sm text-gray-400 text-center">Deadline: {drive.deadline}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* My Applications - Card Layout */}
        <div className="bg-slate-800 rounded-2xl p-4 mb-6">
          <div className="font-bold text-white mb-4">My Applications</div>
          <div className="flex flex-col gap-3">
            {myApplications.map((app, i) => (
              <div key={i} className="bg-slate-700/60 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-white">{app.company}</div>
                  <StatusBadge status={app.status} />
                </div>
                <div className="text-gray-300 mb-3">{app.position}</div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-gray-400">Applied Date</div>
                    <div className="text-blue-200">{app.appliedDate}</div>
                  </div>
                  <div>
                    <div className="text-gray-400">Next Round</div>
                    <div className="text-blue-200">{app.nextRound}</div>
                  </div>
                  {app.date !== "-" && (
                    <div>
                      <div className="text-gray-400">Date</div>
                      <div className="text-blue-200">{app.date}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default PlacementSection;
