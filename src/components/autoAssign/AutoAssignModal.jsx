import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Loader2, UserCheck, AlertTriangle } from "lucide-react";
import { getAllStaff, autoAssignLeads } from "../../api/routes.js";
import { toast } from "react-toastify";

const AutoAssignModal = ({ isOpen, onClose, onSuccess }) => {
  const [staffList, setStaffList] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [assigning, setAssigning] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStaffIds, setSelectedStaffIds] = useState([]);
  const [error, setError] = useState(null);

  // 1. Fetch Verified Staff on Open
  useEffect(() => {
    if (isOpen) {
      const fetchStaff = async () => {
        setLoadingStaff(true);
        setError(null);
        try {
          const res = await getAllStaff();

          const verified =
            res?.filter((user) => user.isVerified === true) || [];

          setStaffList(verified);
        } catch (err) {
          setError("Failed to fetch staff list. Please try again.");
          console.error(err);
        } finally {
          setLoadingStaff(false);
        }
      };
      fetchStaff();
    }
  }, [isOpen]);

  // 2. Client-side Search Filter (useMemo for performance)
  const filteredStaff = useMemo(() => {
    return staffList.filter(
      (staff) =>
        staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        staff.branch?.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [staffList, searchTerm]);

  // 3. Selection Toggle Logic
  const toggleSelect = (id) => {
    setSelectedStaffIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  // 4. Final Assignment Call
  const handleConfirmAssignment = async () => {
    console.log("selectedStaffIds", selectedStaffIds);

    if (selectedStaffIds.length === 0) {
      return toast.error("Please select at least one staff member.");
    }

    setAssigning(true);
    try {
      // API call parameters: only selected staff IDs
      const res = await autoAssignLeads({ selectedStaffIds: selectedStaffIds });
      console.log("res", res);

      if (res.success) {
        toast.success(res.message || "Leads assigned equally!");
        onSuccess(); // Close and reset selection
      } else {
        toast.error(res.message || "Failed to assign leads.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Internal Server Error.");
      console.error(err);
    } finally {
      setAssigning(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl p-8 overflow-hidden max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-black text-gray-900">
                Auto-Assign Leads
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Select verified staff members to distribute unassigned leads
                equally
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50"
            >
              <X size={24} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search staff by name, email or branch..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
            />
          </div>

          {/* Staff List Area */}
          <div className="border border-gray-100 rounded-2xl bg-gray-50 overflow-y-auto max-h-[50vh] p-3 space-y-2">
            {loadingStaff ? (
              <div className="flex flex-col items-center justify-center py-12 text-gray-500 gap-3">
                <Loader2 className="animate-spin text-blue-600" size={30} />
                <span className="text-sm font-medium">
                  Fetching verified staff...
                </span>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-10 text-red-500 gap-2 border border-red-100 rounded-xl bg-red-50 text-center">
                <AlertTriangle size={30} />
                <span className="text-sm font-bold">{error}</span>
              </div>
            ) : filteredStaff.length === 0 ? (
              <div className="text-center py-10 text-gray-400 text-sm">
                No verified staff found matching your search.
              </div>
            ) : (
              filteredStaff.map((staff) => (
                <label
                  key={staff._id}
                  className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition ${
                    selectedStaffIds.includes(staff._id)
                      ? "bg-blue-50/50 border-blue-500 shadow-inner"
                      : "bg-white border-transparent hover:border-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`relative ${selectedStaffIds.includes(staff._id) ? "scale-105" : ""}`}
                    >
                      <div className="h-11 w-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold uppercase text-lg">
                        {staff.name.substring(0, 2)}
                      </div>
                      {staff.isVerified && (
                        <div className="absolute -right-1 -bottom-1 bg-white p-0.5 rounded-full">
                          <UserCheck className="h-4 w-4 text-green-500 bg-white" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">
                        {staff.name}
                      </div>
                      <div className="text-xs text-gray-500">{staff.email}</div>
                      {staff.branch && (
                        <div className="mt-1 text-xs text-blue-600 font-medium capitalize">
                          @{staff.branch} branch
                        </div>
                      )}
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedStaffIds.includes(staff._id)}
                    onChange={() => toggleSelect(staff._id)}
                    className="h-5 w-5 text-blue-600 rounded-lg border-gray-300 focus:ring-blue-500 cursor-pointer"
                  />
                </label>
              ))
            )}
          </div>

          {/* Selection Count Summary */}
          {selectedStaffIds.length > 0 && (
            <div className="mt-4 text-sm text-blue-700 bg-blue-50 p-3 rounded-lg border border-blue-100 font-medium">
              Selection: <b>{selectedStaffIds.length}</b> staff member(s) chosen
              for distribution. leads will be equally shared (Round-Robin).
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 mt-8 justify-end">
            <button
              onClick={onClose}
              disabled={assigning}
              className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 disabled:opacity-50 text-sm font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmAssignment}
              disabled={selectedStaffIds.length === 0 || assigning}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-50 transition shadow-lg shadow-blue-200 text-sm font-semibold"
            >
              {assigning ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Assigning equally... (Wait)
                </>
              ) : (
                <>Assign Leads Equally ({selectedStaffIds.length})</>
              )}
            </button>
          </div>

          {/* Overlay loader when assigning 1000+ leads */}
          {assigning && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex flex-col gap-4 items-center justify-center z-10 p-10 text-center">
              <Loader2 className="animate-spin text-blue-600" size={50} />
              <h4 className="text-xl font-bold text-gray-800">
                Assigning Unassigned Leads...
              </h4>
              <p className="text-sm text-gray-500">
                This might take a minute as we're processing all unassigned
                leads. Please don't close the window or refresh the page.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AutoAssignModal;
