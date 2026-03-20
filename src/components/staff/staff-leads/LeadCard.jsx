import React, { useState, useCallback } from "react";
import {
  Phone,
  Calendar,
  MapPin,
  Edit3,
  ExternalLink,
  History,
} from "lucide-react";
import { motion } from "framer-motion";
import LeadHistoryModal from "./LeadHistoryModal";

const LeadCard = React.memo(({ lead, onEdit }) => {
  const [showHistory, setShowHistory] = useState(false);

  const makeCall = useCallback((phone) => {
    window.location.href = `tel:${phone}`;
  }, []);

  const getStatusColor = useCallback((status) => {
    const map = {
      Pending: "bg-gray-100 text-gray-700",
      Busy: "bg-amber-100 text-amber-700",
      "Follow Up": "bg-blue-100 text-blue-700",
      Interested: "bg-green-100 text-green-700",
      Closed: "bg-purple-100 text-purple-700",
    };
    return map[status] || map.Pending;
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-2xl p-4 shadow-sm border mb-3 hover:shadow-md transition"
      >
        {/* Header */}
        <div className="flex justify-between mb-3">
          <div>
            <h3 className="font-semibold text-gray-800 text-lg truncate">
              {lead.name}
            </h3>

            <div className="flex gap-3 text-xs text-gray-400 mt-1">
              <span className="flex items-center">
                <Calendar size={12} className="mr-1" />
                {new Date(lead.createdAt).toLocaleDateString()}
              </span>

              <span className="flex items-center">
                <ExternalLink size={12} className="mr-1" />
                {lead.platform || "Direct"}
              </span>
            </div>
          </div>

          <div>
            <span
              className={`text-[11px] font-semibold px-3 py-2 rounded-xl whitespace-nowrap flex items-center justify-center min-w-8 ${getStatusColor(
                lead.status,
              )}`}
            >
              {lead.status}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div className="flex items-center bg-gray-50 p-2 rounded">
            <MapPin size={14} className="mr-1 text-blue-500" />
            {lead.city || "Unknown"}
          </div>

          <div className="flex items-center bg-gray-50 p-2 rounded">
            <Phone size={14} className="mr-1 text-green-500" />
            {lead.phone}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => makeCall(lead.phone)}
            className="flex-1 font-bold bg-green-500 text-white py-2 rounded-lg flex justify-center items-center"
          >
            <Phone size={16} className="mr-1" />
            Call
          </button>

          <button
            onClick={() => setShowHistory(true)}
            className="w-10 h-10 bg-amber-100 text-amber-600 rounded-lg flex items-center justify-center"
          >
            <History size={18} />
          </button>

          <button
            onClick={() => onEdit(lead)}
            className="w-10 h-10 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center"
          >
            <Edit3 size={18} />
          </button>
        </div>
      </motion.div>

      {/* Modal */}
      <LeadHistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        remarks={lead.remarks}
        leadName={lead.name}
      />
    </>
  );
});

export default LeadCard;
