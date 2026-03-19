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

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("unassigned");
  const [selectedIds, setSelectedIds] = useState([]);
  const [viewingLead, setViewingLead] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({ phone: "", city: "", status: "" });
  // const [isAssignDrawerOpen, setIsAssignDrawerOpen] = useState(false);
  const leadsPerPage = 20;

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    const res = await getAllLeads();
    setLeads(res); // Assuming direct array or res.data
    setLoading(false);
  };

  // Logic: Separate and Filter
  const filteredLeads = leads.filter((lead) => {
    const isTabMatch =
      activeTab === "assigned" ? lead.assignedTo : !lead.assignedTo;
    const isPhoneMatch = lead.phone.includes(filters.phone);
    const isCityMatch = lead.city
      ?.toLowerCase()
      .includes(filters.city.toLowerCase());
    const isStatusMatch = filters.status
      ? lead.status === filters.status
      : true;
    return isTabMatch && isPhoneMatch && isCityMatch && isStatusMatch;
  });

  // const handleAssignSuccess = (msg) => {
  //   alert(msg); // Yahan aap toast notification bhi laga sakte hain
  //   setSelectedIds([]); // Selection clear karein
  //   fetchLeads(); // Table refresh karein taaki assigned leads 'Assigned' tab mein chali jayein
  // };

  // Pagination Logic
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );

  return (
    <div className="md:p-6 bg-gray-50 min-h-screen font-sans">
      <div className="flex justify-between items-center mb-8">
        {/* <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
          Leads Management
        </h1> */}

        {/* {selectedIds.length > 0 && (
          <div className="flex space-x-3">
            <button className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
              <Trash2 size={18} className="mr-2" /> Delete {selectedIds.length}
            </button>
            <button
              onClick={() => setIsAssignDrawerOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              <UserCheck size={18} className="mr-2" /> Assign{" "}
              {selectedIds.length}
            </button>
          </div>
        )} */}

        {/* <AssignLeadsDrawer
          isOpen={isAssignDrawerOpen}
          onClose={() => setIsAssignDrawerOpen(false)}
          selectedLeadIds={selectedIds}
          onSuccess={handleAssignSuccess}
        /> */}
      </div>

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

      <LeadFilters filters={filters} setFilters={setFilters} />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse ">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">
                <input type="checkbox" className="rounded text-blue-600" />
              </th>
              <th className="px-6 py-4">Lead Name</th>
              <th className="px-6 py-4 hidden md:table-cell">Contact</th>
              <th className="px-6 py-4">City</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {currentLeads.map((lead) => (
              <tr key={lead._id} className="hover:bg-blue-50/50 transition">
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(lead._id)}
                    onChange={() => toggleSelect(lead._id)}
                    className="rounded text-blue-600 focus:ring-blue-500"
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
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => setViewingLead(lead)}
                    className="text-blue-600 hover:text-blue-800 text-sm font-semibold"
                  >
                    View Details
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
