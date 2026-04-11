import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, User, TrendingUp, ChevronRight } from "lucide-react";
import { getStaffDashboard } from "../../../api/routes.js";
import StatusGrid from "./StatusGrid";
import PerformanceChart from "./PerformanceChart";

const StaffDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchStats();
  }, [filter]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await getStaffDashboard(filter);
      setData(res.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-10">
      {/* HEADER */}
      <div className="bg-white px-6 pt-3 pb-3 rounded-[3rem] shadow-sm sticky top-0 z-30 border-b border-gray-50">
        {/* MOBILE FILTERS */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {["today", "week", "month", "all"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === f
                  ? "bg-gray-900 text-white shadow-xl scale-95"
                  : "bg-gray-100 text-gray-400 border border-transparent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="px-5 mt-6 space-y-6">
        {/* HERO CARD */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-gray-900 rounded-[2.5rem] p-7 text-white relative overflow-hidden shadow-2xl shadow-blue-900/20"
        >
          <div className="absolute -top-10 -right-10 opacity-20 bg-blue-500 h-40 w-40 rounded-full blur-3xl" />
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.2em] mb-1">
                  Assigned Leads
                </p>
                <h2 className="text-6xl font-black tracking-tighter italic">
                  {data?.totalLeads || 0}
                </h2>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10">
                <TrendingUp size={24} className="text-blue-400" />
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-gray-900 bg-gray-700"
                  />
                ))}
                <div className="h-8 px-3 rounded-full border-2 border-gray-900 bg-blue-600 flex items-center justify-center text-[10px] font-bold">
                  +12
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-gray-400 uppercase">
                  Conversion
                </p>
                <p className="text-xl font-black text-emerald-400">
                  {data?.conversionRate || 0}%
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* GRAPH SECTION */}
        <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">
            Performance Insights
          </h3>
          <PerformanceChart data={data} />
        </div>

        {/* STATUS GRID COMPONENT */}
        <StatusGrid data={data} />
      </div>
    </div>
  );
};

export default StaffDashboard;
