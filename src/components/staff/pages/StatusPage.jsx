import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  History,
  Edit3,
  MapPin,
  User,
  ChevronRight,
  LayoutGrid,
} from "lucide-react";
import { getLeadsByStatus } from "../../../api/routes.js";
import LeadHistoryModal from "../staff-leads/LeadHistoryModal.jsx";
import UpdateLeadModal from "../staff-leads/UpdateLeadModal.jsx";

const StatusPage = () => {
  const { status } = useParams(); // URL se status lega (e.g., follow-up)
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  console.log("status", status);
  
  const fetchLeads = useCallback(async () => {
    try {
      setLoading(true);
      // Backend mein params bhejna: ?status=follow-up
      const res = await getLeadsByStatus(status);
      console.log(res);
      
      if (res.success) {
        setLeads(res.leads);
      }
    } catch (error) {
      console.error("Error fetching leads by status:", error);
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  // Status ke hisab se colors define karna
  const getThemeColor = (currentStatus) => {
    const s = currentStatus?.toLowerCase();
    if (s?.includes("follow"))
      return {
        bg: "bg-amber-50",
        text: "text-amber-600",
        border: "border-amber-100",
        accent: "bg-amber-500",
      };
    if (s?.includes("interested"))
      return {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        border: "border-emerald-100",
        accent: "bg-emerald-500",
      };
    if (s?.includes("closed"))
      return {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-100",
        accent: "bg-blue-500",
      };
    return {
      bg: "bg-gray-50",
      text: "text-gray-600",
      border: "border-gray-100",
      accent: "bg-gray-500",
    };
  };

  const theme = getThemeColor(status);

  return (
    <div className="min-h-screen bg-[#FBFBFF] pb-24 px-4">
      {/* Dynamic Header */}
      <div className="py-8 px-2 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 capitalize tracking-tight">
            {status?.replace("-", " ")}
          </h1>
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">
            {leads.length} Leads Found
          </p>
        </div>
        <div
          className={`${theme.bg} ${theme.text} p-3 rounded-2xl border ${theme.border}`}
        >
          <LayoutGrid size={20} />
        </div>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="py-20 text-center font-black text-gray-300 uppercase text-[10px] tracking-widest animate-pulse">
            Syncing Leads...
          </div>
        ) : leads.length > 0 ? (
          leads.map((lead, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={lead._id}
              className="bg-white rounded-[2rem] p-5 shadow-sm border border-gray-50 relative group active:scale-[0.98] transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-12 w-12 ${theme.bg} rounded-2xl flex items-center justify-center ${theme.text} font-black text-lg shadow-inner`}
                  >
                    {lead.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-gray-900 leading-tight">
                      {lead.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <MapPin size={10} className="text-gray-400" />
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                        {lead.city || "Global"}
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${theme.bg} ${theme.text} ${theme.border}`}
                >
                  {lead.callType}
                </div>
              </div>

              {/* Status Specific Info */}
              <div
                className={`mb-5 p-4 rounded-2xl border ${theme.border} ${theme.bg} flex justify-between items-center`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`h-2 w-2 rounded-full ${theme.accent} animate-pulse`}
                  />
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider ${theme.text}`}
                  >
                    Current Status
                  </span>
                </div>
                <span className="text-xs font-black text-gray-900">
                  {lead.status}
                </span>
              </div>

              {/* Actions Row */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleCall(lead.phone)}
                  className={`flex-1 ${theme.accent} text-white h-14 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-gray-200 active:scale-95 transition-all`}
                >
                  <Phone size={18} fill="white" />
                  <span className="font-black text-[10px] uppercase tracking-widest">
                    Connect
                  </span>
                </button>

                <button
                  onClick={() => {
                    setSelectedLead(lead);
                    setIsHistoryOpen(true);
                  }}
                  className="h-14 w-14 bg-white border border-gray-100 text-gray-400 rounded-2xl flex items-center justify-center active:scale-95 transition-all shadow-sm"
                >
                  <History size={20} />
                </button>

                <button
                  onClick={() => {
                    setSelectedLead(lead);
                    setIsUpdateOpen(true);
                  }}
                  className="h-14 w-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center active:scale-95 transition-all shadow-lg shadow-gray-200"
                >
                  <Edit3 size={20} />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 opacity-30">
            <User size={40} className="mx-auto mb-2 text-gray-400" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">
              No Leads Here
            </p>
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedLead && (
        <>
          <UpdateLeadModal
            lead={selectedLead}
            isOpen={isUpdateOpen}
            onClose={() => setIsUpdateOpen(false)}
            onRefresh={fetchLeads}
          />
          <LeadHistoryModal
            isOpen={isHistoryOpen}
            onClose={() => setIsHistoryOpen(false)}
            remarks={selectedLead.remarks}
            leadName={selectedLead.name}
            leadStatus={selectedLead.status}
            leadCallType={selectedLead.callType}
            followUpDate={selectedLead.followUpDate}
            followUpTime={selectedLead.followUpTime}
          />
        </>
      )}
    </div>
  );
};

export default StatusPage;
