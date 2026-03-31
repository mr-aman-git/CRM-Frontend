import React, { useState } from "react";
import { UserPlus, Wand2 } from "lucide-react"; // Option Wand icon for auto
import AutoAssignModal from "./AutoAssignModal"; // Import the modal

const AutoAssignLeads = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Callback after successful assignment
  const handleAssignSuccess = () => {
    setIsModalOpen(false); // Close the modal
    // Optional: yahan reload leads list call karein dashboard par
    window.location.reload();
  };

  return (
    <div className="flex gap-4">
      {/* Auto Assign All Unassigned Leads Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-xl hover:shadow-lg hover:shadow-blue-100 transition shadow-lg shadow-blue-200 text-sm font-semibold group"
      >
        <Wand2
          size={20}
          className="group-hover:rotate-12 transition-transform"
        />
        Auto Assign
      </button>

      {/* Auto Assign Modal */}
      <AutoAssignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleAssignSuccess}
      />
    </div>
  );
};

export default AutoAssignLeads;
