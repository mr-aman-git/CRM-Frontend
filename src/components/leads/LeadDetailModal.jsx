import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Phone, Mail, MapPin, Tag, MessageSquare } from "lucide-react";

const LeadDetailModal = ({ lead, onClose }) => {
  if (!lead) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
        >
          <div className="p-6 border-b flex justify-between items-center bg-gray-50">
            <h3 className="text-xl font-bold text-gray-800">Lead Details</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
            <DetailItem
              icon={<User size={18} />}
              label="Full Name"
              value={lead.name}
            />
            <DetailItem
              icon={<Phone size={18} />}
              label="Phone"
              value={lead.phone}
            />
            <DetailItem
              icon={<Mail size={18} />}
              label="Email"
              value={lead.email || "N/A"}
            />
            <DetailItem
              icon={<MapPin size={18} />}
              label="City"
              value={lead.city}
            />
            <DetailItem
              icon={<Tag size={18} />}
              label="Campaign"
              value={lead.campaignName}
            />

            <div className="pt-4 border-t">
              <h4 className="flex items-center font-semibold mb-2">
                <MessageSquare size={18} className="mr-2" /> Remarks
              </h4>
              <div className="bg-blue-50 p-3 rounded-lg text-sm text-gray-700">
                {lead.remarks?.length > 0
                  ? lead.remarks[lead.remarks.length - 1].comment
                  : "No remarks yet."}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3">
    <div className="mt-1 text-blue-500">{icon}</div>
    <div>
      <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">
        {label}
      </p>
      <p className="text-gray-700 font-medium">{value}</p>
    </div>
  </div>
);

export default LeadDetailModal;
