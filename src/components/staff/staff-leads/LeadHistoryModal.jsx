import React, { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, MessageCircle, Calendar } from "lucide-react";

const LeadHistoryModal = React.memo(
  ({ isOpen, onClose, remarks = [], leadName }) => {
    const sortedRemarks = useMemo(() => {
      return remarks?.length ? [...remarks].reverse() : [];
    }, [remarks]);

    const formatTime = (date) =>
      new Date(date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });

    const formatDate = (date) => new Date(date).toLocaleDateString();

    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="relative bg-white w-full max-w-md rounded-3xl shadow-xl overflow-hidden"
            >
              {/* Header */}
              <div className="p-5 border-b flex justify-between items-center bg-gray-50">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    Call History
                  </h2>
                  <p className="text-xs text-blue-600 font-semibold mt-1">
                    {leadName}
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white rounded-full"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 max-h-[60vh] overflow-y-auto">
                {sortedRemarks.length > 0 ? (
                  <div className="relative border-l border-blue-100 ml-3 space-y-6">
                    {sortedRemarks.map((item) => (
                      <div key={item._id} className="relative pl-6">
                        <div className="absolute -left-1.5 top-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />

                        <div className="bg-gray-50 p-3 rounded-xl border text-sm">
                          <div className="flex justify-between text-[11px] mb-1 text-gray-500">
                            <span className="flex items-center">
                              <Clock size={12} className="mr-1" />
                              {formatTime(item.createdAt)}
                            </span>

                            <span className="flex items-center">
                              <Calendar size={12} className="mr-1" />
                              {formatDate(item.createdAt)}
                            </span>
                          </div>

                          <p className="text-gray-700 italic">
                            "{item.comment}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <MessageCircle
                      size={36}
                      className="mx-auto text-gray-300 mb-2"
                    />
                    <p className="text-gray-400 text-sm">No remarks found</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t">
                <button
                  onClick={onClose}
                  className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition"
                >
                  Done
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
