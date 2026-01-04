"use client";

import Link from "next/link";
import { AlertCircle } from "lucide-react";
import { GroupLabel } from "@/components/shared/group-label";

// Mock report data
const reports = [
  {
    id: 1,
    name: "Ali Abu bin Aniq",
    dateOfReport: "1 January 2025",
    typeOfReport: "Misinformation",
    status: "Resolved",
    actionTaken: "The story has been taken down.",
  },
  {
    id: 2,
    name: "Aminah binti Salman",
    dateOfReport: "1 January 2025",
    typeOfReport: "Inappropriate Content",
    status: "Resolved",
    actionTaken: "Report is rejected.",
  },
  {
    id: 3,
    name: "Nurul Azizah binti Abdullah",
    dateOfReport: "2 January 2025",
    typeOfReport: "Fraud or Scam",
    status: "Pending",
    actionTaken: "Pending review",
  },
  {
    id: 4,
    name: "Amirul Hafiz bin Ismail",
    dateOfReport: "2 January 2025",
    typeOfReport: "Hate Speech or Harrasment",
    status: "Pending",
    actionTaken: "Pending review",
  },
  {
    id: 5,
    name: "Siti Aminah binti Mohamad",
    dateOfReport: "3 January 2025",
    typeOfReport: "Irrelevant Content",
    status: "Pending",
    actionTaken: "Pending review",
  },
];

export default function AdminDashboardPage() {
  const totalReports = reports.length;
  const pendingReports = reports.filter((r) => r.status === "Pending").length;

  return (
    <div className="min-h-screen bg-[#F0F0F0]">
      <GroupLabel group={4} />
      {/* Top Header Bar */}
      <header className="fixed top-0 left-0 right-0 h-[100px] bg-white border-b border-[#D9D9D9] z-10">
        <div className="flex items-center justify-between h-full px-6">
          {/* Logo in sidebar area */}
          <div className="w-[260px] flex justify-center">
            <span className="text-[23px] font-semibold text-black">Jalan²</span>
          </div>
          {/* Right side - Avatar */}
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-sm font-semibold text-slate-600">
            AD
          </div>
        </div>
      </header>

      {/* Left Sidebar */}
      <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-white border-r border-[#D9D9D9] pt-[100px]">
        <div className="flex flex-col items-center gap-4 px-8 pt-6">
          {/* Menu Label */}
          <span className="self-start text-xs font-bold tracking-[0.19em] text-[#232323]">
            MENU
          </span>

          {/* Menu Items */}
          <div className="flex flex-col items-center gap-2 w-full">
            <Link
              href="/admin"
              className="w-full flex items-center gap-3 px-8 py-4 bg-emerald-50 border-l-[5px] border-emerald-700"
            >
              <AlertCircle className="w-6 h-6 text-emerald-700" />
              <span className="text-base font-bold text-emerald-700">Report</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-[260px] pt-[100px]">
        <div className="p-6">
          <div className="flex flex-col gap-5">
            {/* Page Title */}
            <h1 className="text-[30px] font-semibold tracking-tight text-slate-700">
              Report
            </h1>

            {/* Summary Cards Row */}
            <div className="flex gap-4">
              {/* Total Reports Card */}
              <div className="flex-1 bg-white rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#232323]">
                    Total of Community Story Report
                  </span>
                </div>
                <div className="flex justify-end mt-4">
                  <span className="text-2xl font-bold text-[#232323]">
                    {totalReports}
                  </span>
                </div>
              </div>

              {/* Pending Reports Card */}
              <div className="flex-1 bg-white rounded-xl p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[#232323]">
                    Pending Report
                  </span>
                </div>
                <div className="flex justify-end mt-4">
                  <span className="text-2xl font-bold text-[#232323]">
                    {pendingReports}
                  </span>
                </div>
              </div>
            </div>

            {/* Reports Table Card */}
            <div className="bg-white rounded-xl p-5">
              {/* Table Header */}
              <h2 className="text-xl font-bold text-[#232323] mb-4">
                Community Story Report
              </h2>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#F9F9F9]">
                      <th className="px-4 py-4 text-left text-xs font-bold text-[#575757]">
                        Bil
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-bold text-[#575757]">
                        Name
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-bold text-[#575757]">
                        Date of Report
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-bold text-[#575757]">
                        Type of Report
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-bold text-[#575757]">
                        Status
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-bold text-[#575757]">
                        Action
                      </th>
                      <th className="px-4 py-4 text-left text-xs font-bold text-[#575757]">
                        Action Taken
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report) => (
                      <tr key={report.id} className="border-b border-[#D9D9D9]">
                        <td className="px-4 py-4 text-xs font-medium text-[#232323]">
                          {report.id}
                        </td>
                        <td className="px-4 py-4 text-xs font-medium text-[#232323]">
                          {report.name}
                        </td>
                        <td className="px-4 py-4 text-xs font-medium text-[#232323]">
                          {report.dateOfReport}
                        </td>
                        <td className="px-4 py-4 text-xs font-medium text-[#232323]">
                          {report.typeOfReport}
                        </td>
                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center px-4 py-1 rounded-md text-[10px] font-bold ${
                              report.status === "Resolved"
                                ? "bg-[#EFFCEC] text-[#54C93C]"
                                : "bg-[#FCECEC] text-[#C9443C]"
                            }`}
                          >
                            {report.status}
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <Link
                            href={`/admin/reports/${report.id}`}
                            className="inline-flex items-center px-4 py-1 rounded-md text-[10px] font-bold bg-emerald-700 text-white"
                          >
                            View More
                          </Link>
                        </td>
                        <td className="px-4 py-4 text-xs font-medium text-[#232323]">
                          {report.actionTaken}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex justify-end items-center gap-2 mt-4">
                <button className="w-8 h-8 flex items-center justify-center rounded-md bg-emerald-700 text-white text-xs font-semibold">
                  1
                </button>
                <button className="px-4 h-8 flex items-center justify-center rounded-md bg-white border border-[#D9D9D9] text-emerald-700 text-xs font-semibold">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

