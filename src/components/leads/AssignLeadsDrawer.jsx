import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, UserPlus, Search, CheckCircle, Loader2 } from "lucide-react";
import { getAllStaff, assignLeads } from "../../api/routes.js";
import { toast } from "react-toastify";
const AssignLeadsDrawer = ({ isOpen, onClose, selectedLeadIds, onSuccess }) => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assigningId, setAssigningId] = useState(null); // Tracking individual button loading
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (isOpen) fetchStaff();
  }, [isOpen]);

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const data = await getAllStaff();
      // Sirf verified staff dikhayenge dropdown mein
      setStaffList(data.filter((s) => s.isVerified));
    } catch (error) {
      console.error("Error fetching staff", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAssign = async (staffId) => {
    try {
      setAssigningId(staffId);
      const payload = {
        leadIds: selectedLeadIds,
        staffId: staffId,
      };
      await assignLeads(payload);
      toast.success(`${selectedLeadIds.length} Leads assigned successfully!`);
      onClose();
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      alert("Assignment failed. Try again.");
      console.log(error);
    } finally {
      setAssigningId(null);
    }
  };

  const filteredStaff = staffList.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-60"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-70 flex flex-col"
          >
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-800">
                  Assign Leads
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {selectedLeadIds.length} leads selected for assignment
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search staff by name..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {loading ? (
                <div className="flex justify-center py-10">
                  <Loader2 className="animate-spin text-blue-500" />
                </div>
              ) : filteredStaff.length > 0 ? (
                filteredStaff.map((staff) => (
                  <div
                    key={staff._id}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                        {staff.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {staff.name}
                        </p>
                        <p className="text-xs text-gray-400">{staff.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleAssign(staff._id)}
                      disabled={assigningId === staff._id}
                      className="px-4 py-2 cursor-pointer bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition flex items-center"
                    >
                      {assigningId === staff._id ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <>
                          <UserPlus size={14} className="mr-1" /> Assign
                        </>
                      )}
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400 py-10 text-sm">
                  No verified staff found.
                </p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AssignLeadsDrawer;
