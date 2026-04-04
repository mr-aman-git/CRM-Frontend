import React from "react";
import { motion } from "framer-motion";
import { PieChart, TrendingUp } from "lucide-react";

const SourcePerformance = ({ sourceAnalysis }) => {
  return (
    <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-blue-600 rounded-2xl shadow-sm border border-blue-100/50">
            <PieChart size={22} />
          </div>
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight">
              SOURCE <span className="text-blue-600">PERFORMANCE</span>
            </h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              Lead Origin Analysis
            </p>
          </div>
        </div>
        <span className="px-3 py-1 bg-gray-50 text-gray-400 text-[10px] font-bold rounded-full">
          Real-time
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {sourceAnalysis?.map((source, i) => {
          const rate = ((source.closed / source.count) * 100).toFixed(1);
          return (
            <div
              key={i}
              className="group relative bg-gray-50 p-6 rounded-4xl border border-transparent hover:border-blue-100 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/5"
            >
              <div className="flex justify-between items-start mb-5">
                <span className="px-3 py-1 bg-white rounded-xl text-[11px] font-black text-blue-600 border border-blue-50 uppercase tracking-widest shadow-sm">
                  {source._id || "Direct"}
                </span>
                <TrendingUp
                  size={14}
                  className="text-gray-300 group-hover:text-blue-500 transition-colors"
                />
              </div>

              <div className="flex justify-between items-end mb-4">
                <div>
                  <p className="text-3xl font-black text-gray-900 leading-none mb-1">
                    {source.count}
                  </p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    Total Inflow
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-emerald-600 leading-none mb-1">
                    {source.closed}
                  </p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-wider">
                    Closures
                  </p>
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-bold">
                  <span className="text-gray-400 italic">Conversion</span>
                  <span className="text-emerald-600">{rate}%</span>
                </div>
                <div className="h-1.5 w-full bg-gray-200/50 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${rate}%` }}
                    className="h-full bg-emerald-500 rounded-full"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SourcePerformance;
