import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  History,
  Edit3,
  Calendar,
  Clock,
  MapPin,
  Zap,
  MessageSquare,
} from "lucide-react";
import { getScheduleLeads } from "../../../api/routes.js";
import LeadHistoryModal from "../staff-leads/LeadHistoryModal.jsx";
import UpdateLeadModal from "../staff-leads/UpdateLeadModal.jsx";

const ScheduleLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const fetchleads = async () => {
    try {
      setLoading(true);
      const res = await getScheduleLeads();
      if (res.success) {
        setLeads(res.leads);
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchleads();
  }, []);

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      <div className="p-4 space-y-4">
        {loading ? (
          <div className="text-center py-20 text-gray-400 font-bold uppercase text-[10px] tracking-widest">
            Loading Schedules...
          </div>
        ) : leads.length > 0 ? (
          leads.map((lead, index) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={lead._id}
              className="bg-white rounded-4xl p-5 shadow-sm border border-gray-100 relative overflow-hidden"
            >
              {/* Top Info */}
              <div className="flex justify-between items-start mb-4">
                <div className="">
                  <h2 className="text-lg font-black text-gray-900 leading-tight">
                    {lead.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold text-gray-400 flex items-center gap-0.5 uppercase tracking-tighter">
                      <MapPin size={10} /> {lead.city || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              {/* FOLLOW UP HIGHLIGHT BOX */}
              {/* REFINED FOLLOW UP SECTION */}
              <div className="flex items-center gap-3 mb-6">
                {/* Date Container */}
                <div className="flex-1 bg-blue-50/50 border border-blue-100 rounded-[1.5rem] p-3 flex items-center gap-3">
                  <div className="h-9 w-9 bg-white rounded-xl flex items-center justify-center shadow-sm text-blue-600">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">
                      Date
                    </p>
                    <p className="text-xs font-black text-gray-900 leading-none">
                      {lead.followUpDate || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Time Container */}
                <div className="flex-1 bg-emerald-50/50 border border-emerald-100 rounded-[1.5rem] p-3 flex items-center gap-3">
                  <div className="h-9 w-9 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-600">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest leading-none mb-1">
                      Time
                    </p>
                    <p className="text-xs font-black text-gray-900 leading-none uppercase">
                      {lead.followUpTime || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleCall(lead.phone)}
                  className="flex-1 bg-emerald-500 text-white h-14 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-100 active:scale-95 transition-all"
                >
                  <Phone size={20} fill="white" />
                  <span className="ml-2 font-black text-xs uppercase tracking-widest">
                    Call
                  </span>
                </button>

                <button
                  onClick={() => {
                    setSelectedLead(lead);
                    setIsHistoryOpen(true);
                  }}
                  className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100 active:scale-95 transition-all"
                >
                  <History size={20} />
                </button>

                <button
                  onClick={() => {
                    setSelectedLead(lead);
                    setIsUpdateOpen(true);
                  }}
                  className="w-14 h-14 bg-gray-900 text-white rounded-2xl flex items-center justify-center active:scale-95 transition-all"
                >
                  <Edit3 size={20} />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20">
            <div className="h-20 w-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap size={30} className="text-gray-200" />
            </div>
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest italic">
              All caught up!
            </p>
          </div>
        )}
      </div>

      {/* MODALS */}
      {selectedLead && (
        <>
          <UpdateLeadModal
            lead={selectedLead}
            isOpen={isUpdateOpen}
            onClose={() => setIsUpdateOpen(false)}
            onRefresh={fetchleads}
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

export default ScheduleLeads;
