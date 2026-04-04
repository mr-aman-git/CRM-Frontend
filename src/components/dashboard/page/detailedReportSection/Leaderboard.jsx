import React from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp } from "lucide-react";

const Leaderboard = ({ performers }) => {
  const topAgent = performers?.[0];

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <Target size={20} />
          </div>
          <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">
            Top Performers
          </h3>
        </div>

        <div className="space-y-6">
          {performers?.map((staff, i) => (
            <div key={i} className="flex items-center gap-4 group">
              <div
                className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-lg transition-colors ${i === 0 ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600"}`}
              >
                {i + 1}
              </div>
              <div className="flex-1">
                <p className="font-black text-gray-800 leading-none mb-1 text-sm uppercase">
                  {staff.name}
                </p>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${staff.rate * 100}%` }}
                      className="h-full bg-blue-600"
                    />
                  </div>
                  <span className="text-xs font-bold text-blue-600">
                    {(staff.rate * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pro Insight Widget */}
        {topAgent && (
          <div className="mt-8 relative overflow-hidden bg-linear-to-br from-blue-600 to-indigo-700 p-6 rounded-4xl text-white shadow-xl shadow-blue-900/20 border border-white/10">
            <div className="absolute -bottom-4 -right-4 opacity-10 rotate-12">
              <TrendingUp size={80} />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-6 w-6 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-md">
                  <span className="text-[10px]">🏆</span>
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-100">
                  Performance Insight
                </p>
              </div>
              <p className="text-xs font-semibold leading-relaxed">
                Your top agent,{" "}
                <span className="text-white underline decoration-blue-300 underline-offset-4 font-black">
                  {topAgent.name}
                </span>
                , converts at a massive{" "}
                <span className="inline-block px-2 py-0.5 bg-emerald-400 text-emerald-950 rounded-lg font-black text-[10px]">
                  {(topAgent.rate * 100).toFixed(1)}%
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
