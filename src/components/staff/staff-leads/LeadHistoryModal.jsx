import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  MessageCircle,
  Calendar,
  PhoneCall,
  Zap,
  User,
} from "lucide-react";

const LeadHistoryModal = React.memo(
  ({
    isOpen,
    onClose,
    remarks = [],
    leadName,
    followUpDate,
    followUpTime,
    leadStatus,
    leadCallType,
  }) => {
    const sortedRemarks = useMemo(() => {
      return remarks?.length ? [...remarks].reverse() : [];
    }, [remarks]);

    const formatTime = (date) =>
      new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    const formatDate = (date) => new Date(date).toLocaleDateString("en-GB");

    // Dynamic Color for Status
    const getStatusStyles = (status) => {
      if (status === "Closed")
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      if (status === "Follow Up")
        return "bg-amber-100 text-amber-700 border-amber-200";
      return "bg-blue-100 text-blue-700 border-blue-200";
    };

    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/60 backdrop-blur-[2px]"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-white w-full max-w-lg rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="px-6 pt-8 pb-4 border-b border-gray-50 flex justify-between items-start sticky top-0 bg-white z-10">
                <div>
                  <h2 className="text-2xl font-black text-gray-900 leading-tight tracking-tight">
                    Lead History
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="h-2 w-2 bg-blue-600 rounded-full animate-pulse" />
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                      {leadName}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-3 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors"
                >
                  <X size={20} className="text-gray-500" />
                </button>
              </div>

              {/* Body */}
              <div className="flex-1 overflow-y-auto px-6 py-4 no-scrollbar">
                {/* 1. TOP SUMMARY CARD */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {/* Status & Call Type */}
                  <div className="bg-gray-50 p-4 rounded-3xl border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap size={14} className="text-blue-600" />
                      <span className="text-[10px] font-black uppercase text-gray-400">
                        Current Info
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span
                        className={`px-2 py-1 rounded-lg text-[10px] font-black text-center border ${getStatusStyles(leadStatus)}`}
                      >
                        {leadStatus?.toUpperCase() || "PENDING"}
                      </span>
                      <span className="text-[10px] font-black bg-gray-900 text-white px-2 py-1 rounded-lg text-center">
                        {leadCallType || "NOT-SELECTED"}
                      </span>
                    </div>
                  </div>

                  {/* Follow Up Date/Time */}
                  <div className="bg-blue-50/50 p-4 rounded-3xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-2 text-blue-600">
                      <Calendar size={14} />
                      <span className="text-[10px] font-black uppercase tracking-widest">
                        Next Action
                      </span>
                    </div>
                    {followUpDate ? (
                      <div className="flex flex-col">
                        <p className="text-sm font-black text-gray-900">
                          {followUpDate}
                        </p>
                        <p className="text-xs font-bold text-blue-600">
                          {followUpTime || "Time missing"}
                        </p>
                      </div>
                    ) : (
                      <p className="text-[10px] font-bold text-gray-400 italic">
                        No follow-up set
                      </p>
                    )}
                  </div>
                </div>

                {/* 2. TIMELINE REMARKS */}
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Clock size={14} /> Interaction Timeline
                </h3>

                {sortedRemarks.length > 0 ? (
                  <div className="space-y-8 relative">
                    {/* Continuous Vertical Line */}
                    <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-linear-to-b from-blue-100 via-blue-200 to-transparent" />

                    {sortedRemarks.map((item, index) => (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        key={item._id}
                        className="relative pl-10"
                      >
                        {/* Dot on Line */}
                        <div
                          className={`absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border-4 border-white shadow-sm z-10 ${index === 0 ? "bg-blue-600 scale-125" : "bg-blue-200"}`}
                        />

                        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[9px] font-black text-gray-400 uppercase flex items-center gap-1">
                              <Clock size={10} /> {formatTime(item.createdAt)}
                            </span>
                            <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                              {formatDate(item.createdAt)}
                            </span>
                          </div>

                          <p className="text-sm text-gray-700 font-medium leading-relaxed italic">
                            "{item.comment}"
                          </p>

                          <div className="mt-3 pt-3 border-t border-gray-50 flex items-center gap-2">
                            <div className="h-5 w-5 bg-gray-100 rounded-full flex items-center justify-center">
                              <User size={10} className="text-gray-400" />
                            </div>
                            <span className="text-[10px] font-bold text-gray-400 italic">
                              Staff Updated
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="h-16 w-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-dashed border-gray-200">
                      <MessageCircle size={24} className="text-gray-300" />
                    </div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wider italic">
                      No conversation history
                    </p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 bg-white border-t border-gray-50 sticky bottom-0">
                <button
                  onClick={onClose}
                  className="w-full py-4 bg-gray-900 text-white rounded-3xl font-black uppercase tracking-[0.2em] text-[11px] shadow-xl shadow-gray-200 active:scale-95 transition-all"
                >
                  Close History
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    );
  },
);

export default LeadHistoryModal;
