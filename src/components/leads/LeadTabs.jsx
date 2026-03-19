import React, { useState } from "react";
import { motion } from "framer-motion";
import AssignLeadsDrawer from "./AssignLeadsDrawer";
import { Trash2, UserCheck } from "lucide-react";
const LeadTabs = ({
  activeTab,
  setActiveTab,
  counts,
  selectedIds,
  setSelectedIds,
}) => {
  const [isAssignDrawerOpen, setIsAssignDrawerOpen] = useState(false);
  const handleAssignSuccess = (msg) => {
    alert(msg); // Yahan aap toast notification bhi laga sakte hain
    setSelectedIds([]); // Selection clear karein
    fetchLeads(); // Table refresh karein taaki assigned leads 'Assigned' tab mein chali jayein
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
            <button className="flex items-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition">
              <Trash2 size={18} className="mr-2" /> Delete {selectedIds.length}
            </button>
            <button
              onClick={() => setIsAssignDrawerOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200"
            >
              <UserCheck size={18} className="mr-2" /> Assign{" "}
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
