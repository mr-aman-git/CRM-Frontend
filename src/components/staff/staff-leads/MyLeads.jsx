import React, { useState, useEffect } from "react";
import { getStaffLeads } from "../../../api/routes.js";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import LeadCard from "./LeadCard";
import UpdateLeadModal from "./UpdateLeadModal";
import LeadFilters from "./LeadFilters"; // Naya import

const MyLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  // States for Filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [selectedLead, setSelectedLead] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 10;

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await getStaffLeads();
      setLeads(res);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filter Logic (Search by Name/Phone AND Status)
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.phone.includes(searchTerm);
    const matchesStatus = statusFilter === "" || l.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const lastIndex = currentPage * leadsPerPage;
  const firstIndex = lastIndex - leadsPerPage;
  const currentLeads = filteredLeads.slice(firstIndex, lastIndex);

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Separated Filter Component */}
      <LeadFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {/* Leads List */}
      <div className="p-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <Loader2 className="animate-spin text-blue-600 mb-2" size={32} />
            <p className="text-gray-400 text-sm font-medium">
              Loading Leads...
            </p>
          </div>
        ) : currentLeads.length > 0 ? (
          currentLeads.map((lead) => (
            <LeadCard
              key={lead._id}
              lead={lead}
              onEdit={(l) => setSelectedLead(l)}
            />
          ))
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200 m-4">
            <p className="text-gray-400 font-medium italic">
              No leads match your filters.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Pagination */}
      {filteredLeads.length > leadsPerPage && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md p-4 flex items-center justify-between border-t border-gray-100 shadow-2xl z-40">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="p-3 bg-white shadow-sm border rounded-2xl disabled:opacity-20 active:scale-95 transition-transform"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="text-center">
            <span className="text-[10px] text-gray-400 uppercase font-bold block">
              Page
            </span>
            <span className="text-sm font-black text-blue-600">
              {currentPage} of {Math.ceil(filteredLeads.length / leadsPerPage)}
            </span>
          </div>

          <button
            disabled={lastIndex >= filteredLeads.length}
            onClick={() => setCurrentPage((p) => p + 1)}
            className="p-3 bg-white shadow-sm border rounded-2xl disabled:opacity-20 active:scale-95 transition-transform"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Update Modal */}
      {selectedLead && (
        <UpdateLeadModal
          isOpen={!!selectedLead}
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onRefresh={fetchLeads}
        />
      )}
    </div>
  );
};

export default MyLeads;
