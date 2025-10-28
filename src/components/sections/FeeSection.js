import React from "react";
import { Download, CreditCard } from "lucide-react";
import { Button } from "../ui/button";

const feeMetrics = [
  { label: "Total Paid", value: 250000, color: "text-green-400" },
  { label: "Pending Amount", value: 50000, color: "text-red-400" },
  { label: "Total Course Fee", value: 300000, color: "text-blue-400" },
];

const semesterFees = [
  { tuition: 45000, other: 5000, total: 50000, due: "2024-07-15", status: "Paid" },
  { tuition: 45000, other: 5000, total: 50000, due: "2024-12-15", status: "Paid" },
  { tuition: 45000, other: 5000, total: 50000, due: "2025-07-15", status: "Paid" },
  { tuition: 45000, other: 5000, total: 50000, due: "2025-12-15", status: "Paid" },
  { tuition: 45000, other: 5000, total: 50000, due: "2026-07-15", status: "Paid" },
  { tuition: 45000, other: 5000, total: 50000, due: "2026-12-15", status: "Pending" },
];

function StatusBadge({ status }) {
  return status === "Paid" ? (
    <span className="bg-gradient-to-r from-green-500 to-emerald-600 px-3 py-1 rounded-xl text-white text-xs font-semibold shadow-md">
      Paid
    </span>
  ) : (
    <span className="bg-gradient-to-r from-red-500 to-pink-600 px-3 py-1 rounded-xl text-white text-xs font-semibold shadow-md">
      Pending
    </span>
  );
}

function ActionButton({ status }) {
  return status === "Paid" ? (
    <Button className="flex gap-1 items-center bg-slate-700 hover:bg-slate-600 px-3 py-2 rounded-lg text-white text-xs font-medium transition-all shadow-md">
      <Download size={14} />
      Receipt
    </Button>
  ) : (
    <Button className="flex gap-1 items-center bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-3 py-2 rounded-lg text-white text-xs font-semibold transition-all shadow-lg shadow-blue-500/50">
      <CreditCard size={14} />
      Pay Now
    </Button>
  );
}

export default function FeeSection() {
  return (
    <div
      className="w-full min-h-screen"
      style={{ backgroundColor: "rgb(15 23 42 / var(--tw-bg-opacity, 1))" }}
    >
      {/* Desktop View */}
      <section className="hidden lg:block w-full max-w-5xl mx-auto px-4 pb-10">
        <h1 className="text-4xl font-extrabold text-white mb-2 mt-8 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Fee Management
        </h1>
        <p className="text-blue-300 mb-8 text-center">Welcome back, Arjun Sharma</p>

        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 border border-emerald-700/30 rounded-2xl shadow-xl p-6 text-center backdrop-blur-sm hover:scale-105 transition-transform">
            <div className="text-sm font-medium text-emerald-200 mb-2">Total Paid</div>
            <div className="text-4xl font-black text-emerald-300">₹{feeMetrics[0].value.toLocaleString()}</div>
          </div>
          <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 border border-red-700/30 rounded-2xl shadow-xl p-6 text-center backdrop-blur-sm hover:scale-105 transition-transform">
            <div className="text-sm font-medium text-red-200 mb-2">Pending Amount</div>
            <div className="text-4xl font-black text-red-300">₹{feeMetrics[1].value.toLocaleString()}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-700/30 rounded-2xl shadow-xl p-6 text-center backdrop-blur-sm hover:scale-105 transition-transform">
            <div className="text-sm font-medium text-blue-200 mb-2">Total Course Fee</div>
            <div className="text-4xl font-black text-blue-300">₹{feeMetrics[2].value.toLocaleString()}</div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl p-8">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <div className="text-xl font-semibold text-white">Fee Structure & Payment History</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-separate border-spacing-y-3">
              <thead>
                <tr className="text-blue-300 text-left">
                  <th className="pb-4 px-4">Semester</th>
                  <th className="pb-4 px-4">Tuition Fee</th>
                  <th className="pb-4 px-4">Other Fees</th>
                  <th className="pb-4 px-4">Total Amount</th>
                  <th className="pb-4 px-4">Due Date</th>
                  <th className="pb-4 px-4">Status</th>
                  <th className="pb-4 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {semesterFees.map((fee, idx) => (
                  <tr
                    key={idx}
                    className="bg-slate-700/40 hover:bg-slate-600/60 text-gray-100 transition-all hover:shadow-lg"
                  >
                    <td className="py-4 px-4 font-medium rounded-l-xl">
                      <span className="bg-purple-900/40 text-purple-200 px-3 py-1 rounded-lg">Sem {idx + 1}</span>
                    </td>
                    <td className="py-4 px-4">₹{fee.tuition.toLocaleString()}</td>
                    <td className="py-4 px-4">₹{fee.other.toLocaleString()}</td>
                    <td className="py-4 px-4 font-semibold">₹{fee.total.toLocaleString()}</td>
                    <td className="py-4 px-4 text-gray-300">{fee.due}</td>
                    <td className="py-4 px-4">
                      <StatusBadge status={fee.status} />
                    </td>
                    <td className="py-4 px-4 rounded-r-xl">
                      <ActionButton status={fee.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Mobile View */}
      <section className="block lg:hidden w-full px-4 pb-10">
        <h1 className="text-3xl font-extrabold text-white mb-2 mt-6 text-center bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Fee Management
        </h1>
        <p className="text-blue-300 mb-6 text-center">Welcome back, Arjun Sharma</p>

        <div className="flex flex-col gap-4 mb-6">
          <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 border border-emerald-700/30 rounded-2xl shadow-xl p-5 text-center backdrop-blur-sm">
            <div className="font-medium text-emerald-200 mb-1">Total Paid</div>
            <div className="text-3xl font-black text-emerald-300">₹{feeMetrics[0].value.toLocaleString()}</div>
          </div>
          <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 border border-red-700/30 rounded-2xl shadow-xl p-5 text-center backdrop-blur-sm">
            <div className="font-medium text-red-200 mb-1">Pending Amount</div>
            <div className="text-3xl font-black text-red-300">₹{feeMetrics[1].value.toLocaleString()}</div>
          </div>
          <div className="bg-gradient-to-br from-blue-900/40 to-blue-800/20 border border-blue-700/30 rounded-2xl shadow-xl p-5 text-center backdrop-blur-sm">
            <div className="font-medium text-blue-200 mb-1">Total Course Fee</div>
            <div className="text-3xl font-black text-blue-300">₹{feeMetrics[2].value.toLocaleString()}</div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl shadow-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            <div className="font-semibold text-white">Payment History</div>
          </div>

          {/* Fee Cards */}
          <div className="flex flex-col gap-3">
            {semesterFees.map((fee, idx) => (
              <div
                key={idx}
                className="bg-slate-700/40 hover:bg-slate-600/60 rounded-lg p-4 border border-slate-600/30 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <span className="bg-purple-900/40 text-purple-200 px-3 py-1 rounded-lg font-semibold">
                      Sem {idx + 1}
                    </span>
                    <StatusBadge status={fee.status} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                  <div>
                    <div className="text-gray-400 text-xs">Tuition Fee</div>
                    <div className="text-blue-200">₹{fee.tuition.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Other Fees</div>
                    <div className="text-blue-200">₹{fee.other.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Total Amount</div>
                    <div className="text-white font-semibold">₹{fee.total.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-gray-400 text-xs">Due Date</div>
                    <div className="text-blue-200">{fee.due}</div>
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-600/30">
                  <ActionButton status={fee.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
