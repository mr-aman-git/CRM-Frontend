import React, { useState } from "react";
import { motion } from "framer-motion";
import AssignLeadsDrawer from "./AssignLeadsDrawer";
import { Trash2, UserCheck } from "lucide-react";
import { bulkLeadsDelete } from "../../api/routes.js";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const LeadTabs = ({
  activeTab,
  setActiveTab,
  counts,
  selectedIds,
  setSelectedIds,
}) => {
  const [isAssignDrawerOpen, setIsAssignDrawerOpen] = useState(false);
  const handleAssignSuccess = (msg) => {
    alert(msg);
    setSelectedIds([]);
    fetchLeads();
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0)
      return toast.error("Please select leads first");

    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${selectedIds.length} lead(s). This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it",
      reverseButtons: true,
      borderRadius: "15px",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await bulkLeadsDelete({ ids: selectedIds });

          Swal.fire({
            title: "Deleted!",
            text: "The leads have been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          setSelectedIds([]);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } catch (error) {
          console.error(error);
          Swal.fire("Error!", "Something went wrong while deleting.", "error");
        }
      }
    });
  };

  return (
    <div className="flex justify-between flex-wrap  mb-6">
      <div className="space-x-1 bg-gray-100 p-1 rounded-xl w-fit">
        {["unassigned", "assigned"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-6 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === tab
                ? "text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-white rounded-lg shadow-sm"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <span className="relative z-10 capitalize">
              {tab} Leads ({counts[tab]})
            </span>
          </button>
        ))}
      </div>

      <div>
        {selectedIds.length > 0 && (
          <div className="flex space-x-3">
            <button
              onClick={handleDelete}
              className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
            >
              <Trash2 size={18} className="mr-2" /> Delete {selectedIds.length}
            </button>

            <button
              onClick={() => setIsAssignDrawerOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              <UserCheck size={18} className="mr-2" />{" "}
              {activeTab === "assigned" ? "Transfer Leads" : "Assign Leads"}{" "}
              {selectedIds.length}
            </button>
          </div>
        )}

        <AssignLeadsDrawer
          isOpen={isAssignDrawerOpen}
          onClose={() => setIsAssignDrawerOpen(false)}
          selectedLeadIds={selectedIds}
          onSuccess={handleAssignSuccess}
        />
      </div>
    </div>
  );
};

export default LeadTabs;
