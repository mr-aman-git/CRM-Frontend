import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Copy,
  Trash2,
  User,
  Phone,
  AlertCircle,
  Loader2,
  ExternalLink,
} from "lucide-react";
import { getDuplicateLeads } from "../../../api/routes.js";

const DuplicateLeadsModal = ({ isOpen, onClose }) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const fetchDuplicates = async () => {
        setLoading(true);
        try {
          const res = await getDuplicateLeads();
          setList(res.duplicates || []);
        } catch (err) {
          console.error("Fetch Duplicates Error:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchDuplicates();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-4xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                <Copy size={24} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight">
                  Duplicate <span className="text-red-600">Leads</span>
                </h2>
                <p className="text-gray-500 text-sm font-medium">
                  Identify and merge repeating records
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-3 hover:bg-gray-100 rounded-2xl transition-colors text-gray-400 hover:text-gray-900"
            >
              <X size={24} />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-8 bg-[#FBFBFE]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <Loader2
                  className="animate-spin text-blue-600 mb-4"
                  size={32}
                />
                <p className="text-gray-500 font-bold">
                  Checking database for clones...
                </p>
              </div>
            ) : list.length > 0 ? (
              <div className="space-y-4">
                {/* Warning Banner */}
                <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-3 mb-6">
                  <AlertCircle className="text-amber-600" size={20} />
                  <p className="text-sm text-amber-800 font-medium">
                    Found <b>{list.length}</b> repeated phone numbers. This
                    might cause double-calling.
                  </p>
                </div>

                {/* Table Layout */}
                <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-100">
                      <tr>
                        <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Lead / Phone
                        </th>
                        <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Assigned Agent
                        </th>
                        <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                          Status
                        </th>
                        <th className="p-5 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {list.map((item, i) => (
                        <tr
                          key={i}
                          className="hover:bg-blue-50/30 transition-colors"
                        >
                          <td className="p-5">
                            <p className="font-bold text-gray-800">
                              {item.leadName}
                            </p>
                            <div className="flex items-center gap-1.5 text-gray-400 mt-1">
                              <Phone size={12} />
                              <span className="text-xs font-medium">
                                {item.phone}
                              </span>
                            </div>
                          </td>
                          <td className="p-5">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                                <User size={14} />
                              </div>
                              <span className="text-sm font-semibold text-gray-600">
                                {item.staffName || "Not Assigned"}
                              </span>
                            </div>
                          </td>
                          <td className="p-5">
                            <span className="px-3 py-1 bg-white border border-gray-200 text-gray-600 rounded-full text-[11px] font-bold shadow-sm">
                              {item.status}
                            </span>
                          </td>
                          <td className="p-5 text-right">
                            {/* <div className="flex justify-end gap-2">
                              <button
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded-xl transition-all"
                                title="View Details"
                              >
                                <ExternalLink size={18} />
                              </button>
                              <button
                                className="p-2 text-red-500 hover:bg-red-100 rounded-xl transition-all"
                                title="Delete Duplicate"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div> */}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="h-20 w-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-4">
                  <AlertCircle size={40} />
                </div>
                <h3 className="text-xl font-black text-gray-900">
                  Data is Clean!
                </h3>
                <p className="text-gray-500 mt-1">
                  No duplicate phone numbers found in your records.
                </p>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-8 border-t border-gray-100 bg-gray-50 flex justify-end">
            <button
              onClick={onClose}
              className="px-8 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg"
            >
              Done
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DuplicateLeadsModal;
