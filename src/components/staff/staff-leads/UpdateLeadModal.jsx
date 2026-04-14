import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, Calendar as CalendarIcon, Clock } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { remarkLeads } from "../../../api/routes.js";

const UpdateLeadModal = ({ lead, isOpen, onClose, onRefresh }) => {
  const [status, setStatus] = useState(lead?.status || "Pending");
  const [callType, setCallType] = useState(lead?.callType || "Not-Selected");
  const [comment, setComment] = useState("");
  const [followUpDate, setFollowUpDate] = useState(null);
  const [followUpTime, setFollowUpTime] = useState(null);
  const [loading, setLoading] = useState(false);

  // Statuses jisme date/time compulsory hona chahiye
  const showDateTimePicker = ["Follow Up", "Call-Back-Due"].includes(status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Data prepare kar rahe hain backend ke liye
    const updateData = {
      status,
      callType,
      comment,
      followUpDate: followUpDate
        ? followUpDate.toISOString().split("T")[0]
        : null,
      followUpTime: followUpTime
        ? followUpTime.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })
        : null,
    };

    console.log("updateData", updateData);

    try {
      await remarkLeads(lead._id, updateData);
      onRefresh();
      onClose();
      // Reset states
      setFollowUpDate(null);
      setFollowUpTime(null);
    } catch (error) {
      alert("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-100 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-4">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          className="bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] p-8 shadow-2xl overflow-y-auto max-h-[90vh] no-scrollbar"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-gray-900">Update Lead</h2>
            <button
              onClick={onClose}
              className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Status Select */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 italic">
                Change Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-blue-500 rounded-2xl font-bold text-gray-700 outline-none transition-all"
              >
                <option value="Pending">Pending</option>
                <option value="Busy">Busy</option>
                <option value="Follow Up">Follow Up</option>
                <option value="Interested">Interested</option>
                <option value="Not-Interested">Not Interested</option>
                <option value="Not-Picked">Not Picked</option>
                <option value="Switch-Off">Switch Off</option>
                <option value="Invalid-Number">Invalid Number</option>
                <option value="Call-Back-Due">Call Back Due</option>
                <option value="Closed">Closed</option>
              </select>
            </div>

            {/* Conditional Date & Time Picker */}
            {showDateTimePicker && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="grid grid-cols-2 gap-3"
              >
                <div className="relative">
                  <label className="block text-[10px] font-black text-blue-500 uppercase tracking-widest mb-2 italic text-center">
                    Select Date
                  </label>
                  <DatePicker
                    selected={followUpDate}
                    onChange={(date) => {
                      setFollowUpDate(date);
                      setFollowUpTime(null); // Date badalte hi time reset
                    }}
                    minDate={new Date()} // Past dates disabled
                    placeholderText="DD/MM/YYYY"
                    className="w-full p-4 bg-blue-50 border-none rounded-2xl font-bold text-blue-700 text-center outline-none"
                    dateFormat="dd/MM/yyyy"
                  />
                </div>

                <div className="relative">
                  <label
                    className={`block text-[10px] font-black uppercase tracking-widest mb-2 italic text-center ${!followUpDate ? "text-gray-300" : "text-blue-500"}`}
                  >
                    Select Time
                  </label>
                  <DatePicker
                    selected={followUpTime}
                    onChange={(time) => setFollowUpTime(time)}
                    showTimeSelect
                    showTimeSelectOnly
                    timeIntervals={15}
                    timeCaption="Time"
                    dateFormat="h:mm aa"
                    disabled={!followUpDate} // Bina date ke disabled
                    placeholderText="00:00 AM"
                    className={`w-full p-4 border-none rounded-2xl font-bold text-center outline-none transition-all ${
                      !followUpDate
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-blue-50 text-blue-700"
                    }`}
                  />
                </div>
              </motion.div>
            )}

            {/* Call Type Select */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 italic">
                Call Type
              </label>
              <select
                value={callType}
                onChange={(e) => setCallType(e.target.value)}
                className="w-full p-4 bg-gray-50 border-none rounded-2xl font-bold text-gray-700 outline-none"
              >
                <option value="Not-Selected">Not Selected</option>
                <option value="Hot">🔥 Hot</option>
                <option value="Warm">☀️ Warm</option>
                <option value="Cold">❄️ Cold</option>
              </select>
            </div>

            {/* Comment Area */}
            <div>
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 italic">
                Call Remark
              </label>
              <textarea
                rows="3"
                placeholder="What did the client say?"
                className="w-full p-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 font-medium text-sm outline-none"
                onChange={(e) => setComment(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              disabled={
                loading ||
                (showDateTimePicker && (!followUpDate || !followUpTime))
              }
              className={`w-full py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg transition-all flex items-center justify-center ${
                loading ||
                (showDateTimePicker && (!followUpDate || !followUpTime))
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                  : "bg-blue-600 text-white shadow-blue-200 active:scale-95"
              }`}
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Confirm Update"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UpdateLeadModal;
