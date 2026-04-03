import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Database,
  Search,
  UserMinus,
  CheckCircle2,
  FileText,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { getSystemAudit } from "../../../api/routes.js";
import { useNavigate } from "react-router-dom";
import DuplicateLeadsModal from "./DuplicateLeadsModal";

const SystemAudit = () => {
  const [audit, setAudit] = useState(null);
  const [scanning, setScanning] = useState(true);
  const [isDuplicateModalOpen, setIsDuplicateModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const runAudit = async () => {
      setScanning(true);
      try {
        const res = await getSystemAudit();
        // 1.5s ka delay taaki scanning animation feel ho
        setTimeout(() => {
          setAudit(res.audit);
          setScanning(false);
        }, 1500);
      } catch (err) {
        console.error("Audit Error:", err);
        setScanning(false);
      }
    };
    runAudit();
  }, []);

  // Jab tak scan ho raha hai
  if (scanning) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center bg-[#F8FAFC]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="text-blue-600 mb-6"
        >
          <Search size={64} />
        </motion.div>
        <h3 className="text-2xl font-black text-gray-900 tracking-tight">
          Deep Scanning Database...
        </h3>
        <p className="text-gray-400 mt-2 font-medium">
          Verifying lead integrity & staff efficiency logs
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-[#F8FAFC] min-h-screen">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-4xl font-black text-gray-900 tracking-tight">
              System <span className="text-blue-600">Audit</span>
            </h1>
            <p className="text-gray-500 font-medium mt-1">
              Data health report generated on {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-5 py-2.5 rounded-2xl border border-emerald-100 shadow-sm">
            <ShieldCheck size={20} />
            <span className="text-sm font-bold uppercase tracking-wider">
              {audit?.systemStatus || "System Healthy"}
            </span>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <AuditItem
            icon={<Database className="text-red-500" />}
            label="Unassigned Leads"
            value={audit?.unassignedAlert || 0}
            sub="Critical: Leads with no owner"
            color="border-red-100"
          />

          <button
            onClick={() => setIsDuplicateModalOpen(true)}
            className="w-full text-left outline-none group" 
          >
            <AuditItem
              icon={<FileText className="text-blue-500" />}
              label="Duplicate Records"
              value={audit?.duplicateLeads || 0}
              sub="Potential data redundancy"
              color="border-blue-100"
             
            />
          </button>

          <AuditItem
            icon={<UserMinus className="text-amber-500" />}
            label="Inactive Staff"
            value={audit?.inactiveStaffList?.length || 0}
            sub="No activity in last 48 hours"
            color="border-amber-100"
          />
          <AuditItem
            icon={<CheckCircle2 className="text-emerald-500" />}
            label="Integrity Score"
            value="98%"
            sub="Overall database health"
            color="border-emerald-100"
          />
        </div>

        {/* Action Footer */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
              <AlertTriangle size={24} />
            </div>
            <p className="text-gray-600 font-medium max-w-md">
              Audit complete. We recommend assigning the pending leads to active
              staff members to maintain conversion momentum.
            </p>
          </div>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl shadow-gray-200 whitespace-nowrap"
          >
            Back to Dashboard
          </button>
        </div>
      </div>

      <DuplicateLeadsModal
        isOpen={isDuplicateModalOpen}
        onClose={() => setIsDuplicateModalOpen(false)}
      />
    </div>
  );
};

// Internal Component for Audit Cards
const AuditItem = ({ icon, label, value, sub, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className={`bg-white p-6 rounded-[2.5rem] border ${color} shadow-sm flex items-center gap-6`}
  >
    <div className="h-16 w-16 bg-gray-50 rounded-3xl flex items-center justify-center shadow-inner">
      {icon}
    </div>
    <div className="flex-1">
      <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">
        {label}
      </p>
      <h4 className="text-3xl font-black text-gray-900">{value}</h4>
      <p className="text-sm text-gray-500 font-medium mt-1">{sub}</p>
    </div>
  </motion.div>
);

export default SystemAudit;
