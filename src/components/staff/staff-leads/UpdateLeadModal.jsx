import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Loader2 } from "lucide-react";
import { remarkLeads } from "../../../api/routes.js";

const UpdateLeadModal = ({ lead, isOpen, onClose, onRefresh }) => {
  const [status, setStatus] = useState(lead?.status || "Pending");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await remarkLeads(lead._id, { status, comment });
      onRefresh();
      onClose();
    } catch (error) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Update Lead</h2>
            <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                Change Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="Pending">Pending</option>
                <option value="Busy">Busy</option>
                <option value="Follow Up">Follow Up</option>
                <option value="Interested">Interested</option>
                <option value="Not-Interested">Not Interested</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">
                Add Remark/Comment
              </label>
              <textarea
                rows="4"
                placeholder="Write what happened during the call..."
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 text-sm"
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-blue-100 flex items-center justify-center"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Save Update"}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UpdateLeadModal;
