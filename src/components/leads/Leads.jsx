import React, { useState, useEffect, Suspense, lazy } from "react";
import { getAllLeads } from "../../api/routes.js";
import {
  Trash2,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  Loader2,
} from "lucide-react";
import LeadTabs from "./LeadTabs";
import LeadFilters from "./LeadFilters";
// import AssignLeadsDrawer from "./AssignLeadsDrawer";
// Lazy loading the modal for performance
const LeadDetailModal = lazy(() => import("./LeadDetailModal"));
import { Eye } from "lucide-react";
const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("unassigned");
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewingLead, setViewingLead] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    phone: "",
    city: "",
    status: "",
    date: null,
  });
  const [totalLeads, setTotalLeads] = useState(0);
  // const [isAssignDrawerOpen, setIsAssignDrawerOpen] = useState(false);
  const leadsPerPage = 20;

  useEffect(() => {
    fetchLeads();
  }, [currentPage, filters]);

  const fetchLeads = async () => {
    setLoading(true);
    const res = await getAllLeads();
    console.log(res);

    setLeads(res); // Assuming direct array or res.data
    setLoading(false);
  };

  // Logic: Separate and Filter

  const filteredLeads = leads.filter((lead) => {
    // 1. Tab Match (Assigned vs Unassigned)
    const isTabMatch =
      activeTab === "assigned" ? lead.assignedTo : !lead.assignedTo;

    // 2. Phone Match
    const isPhoneMatch = lead.phone.includes(filters.phone);

    // 3. City Match
    const isCityMatch = lead.city
      ?.toLowerCase()
      .includes(filters.city.toLowerCase());

    // 4. Status Match
    const isStatusMatch = filters.status
      ? lead.status === filters.status
      : true;

    // 5. Date Match (The Fix)
    let matchesDate = true;
    if (filters.date) {
      const d = new Date(lead.createdAt);
      const s = new Date(filters.date);

      // Sirf Year, Month aur Date compare kar rahe hain (Time ignore karke)
      const leadDateLocal = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
      const selectedDateLocal = `${s.getFullYear()}-${s.getMonth()}-${s.getDate()}`;

      matchesDate = leadDateLocal === selectedDateLocal;
    }

    return (
      isTabMatch && isPhoneMatch && isCityMatch && isStatusMatch && matchesDate
    );
  });

  // Pagination Logic
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const isAllSelected =
    currentLeads.length > 0 &&
    currentLeads.every((lead) => selectedIds.includes(lead._id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      // Agar sab selected hain, toh current page wali IDs ko filter karke hata dein
      const currentPageIds = currentLeads.map((l) => l._id);
      setSelectedIds((prev) =>
        prev.filter((id) => !currentPageIds.includes(id)),
      );
    } else {
      // Agar sab selected nahi hain, toh current page wali saari IDs add kar dein (duplicate avoid karke)
      const newSelected = [...selectedIds];
      currentLeads.forEach((lead) => {
        if (!newSelected.includes(lead._id)) {
          newSelected.push(lead._id);
        }
      });
      setSelectedIds(newSelected);
    }
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );

  return (
    <div className="md:p-6 bg-gray-50 min-h-screen font-sans">
      <LeadTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedIds={selectedIds}
        setSelectedIds={setSelectedIds}
        counts={{
          unassigned: leads.filter((l) => !l.assignedTo).length,
          assigned: leads.filter((l) => l.assignedTo).length,
        }}
      />

      <LeadFilters filters={filters} setFilters={setFilters} leads={leads} activeTab={activeTab} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse ">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">
                <input
                  type="checkbox"
                  className="rounded text-blue-600 cursor-pointer w-4 h-4 focus:ring-blue-500"
                  checked={
                    currentLeads.length > 0 &&
                    currentLeads.every((lead) => selectedIds.includes(lead._id))
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th className="px-6 py-4">Lead Name</th>
              <th className="px-6 py-4 hidden md:table-cell">Contact</th>
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Staff</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentLeads.map((lead) => (
              <tr
                key={lead._id}
                className={`hover:bg-blue-50/50 transition ${selectedIds.includes(lead._id) ? "bg-blue-50/30" : ""}`}
              >
                <td className="px-6 py-4 ">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(lead._id)}
                    onChange={() => toggleSelect(lead._id)}
                    className="rounded text-blue-600 focus:ring-blue-500 cursor-pointer w-4 h-4"
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="font-semibold text-gray-800">{lead.name}</div>
                  <div className="text-xs text-gray-400 md:hidden">
                    {lead.phone}
                  </div>
                </td>
                <td className="px-6 py-4 hidden md:table-cell text-sm text-gray-600">
                  {lead.phone}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{lead.city}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lead.status === "Closed"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {lead.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm font-medium">
                  {lead.assignedTo ? (
                    <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-bold uppercase border border-blue-100">
                      @{lead.assignedTo.name}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic text-xs">
                      Not Assigned
                    </span>
                  )}
                </td>

                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setViewingLead(lead)}
                    title="View Details"
                    className="inline-flex cursor-pointer items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-semibold transition-colors"
                  >
                    <Eye size={26} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-between mt-6">
        <p className="text-sm text-gray-500">
          Showing {indexOfFirstLead + 1} to{" "}
          {Math.min(indexOfLastLead, filteredLeads.length)} of{" "}
          {filteredLeads.length} leads
        </p>
        <div className="flex space-x-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-2 border rounded-lg hover:bg-white disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            disabled={indexOfLastLead >= filteredLeads.length}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-2 border rounded-lg hover:bg-white disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <Suspense fallback={<Loader2 className="animate-spin" />}>
        {viewingLead && (
          <LeadDetailModal
            lead={viewingLead}
            onClose={() => setViewingLead(null)}
          />
        )}
      </Suspense>
    </div>
  );
};

export default Leads;
