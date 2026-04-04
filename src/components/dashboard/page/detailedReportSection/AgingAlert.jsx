import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const AgingAlert = ({ count }) => {
  if (!count || count <= 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="relative overflow-hidden bg-linear-to-r from-rose-50 to-amber-50 border border-rose-100 p-5 rounded-4xl flex flex-col md:flex-row items-center gap-4 shadow-sm mb-8"
    >
      <div className="absolute top-0 right-0 p-2 opacity-[0.03]">
        <AlertCircle size={80} className="rotate-12 text-rose-500" />
      </div>

      <div className="relative shrink-0">
        <div className="h-12 w-12 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center shadow-inner">
          <AlertCircle size={22} strokeWidth={2.5} />
        </div>
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
        </span>
      </div>

      <div className="flex-1 text-center md:text-left relative z-10">
        <div className="flex items-center justify-center md:justify-start gap-2 mb-0.5">
          <span className="px-2 py-0.5 bg-rose-600 text-white text-[9px] font-black uppercase tracking-wider rounded-lg">
            High Priority
          </span>
          <h4 className="font-black text-rose-900 text-sm uppercase tracking-tight">
            Follow-up Stall
          </h4>
        </div>
        <p className="text-rose-800/80 font-semibold text-sm leading-tight">
          Alert:{" "}
          <span className="font-black text-rose-600 text-lg">{count}</span>{" "}
          leads stuck for over a week.
          <span className="ml-1 text-rose-900/50 font-bold italic text-xs">
            Action required.
          </span>
        </p>
      </div>

      <button className="shrink-0 bg-white border border-rose-200 text-rose-600 px-5 py-2.5 rounded-xl font-black text-xs shadow-sm hover:bg-rose-600 hover:text-white transition-all duration-300 active:scale-95">
        Review Now
      </button>
    </motion.div>
  );
};

export default AgingAlert;
