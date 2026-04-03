import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  PieChart,
  Users,
  AlertCircle,
  Download,
  ArrowLeft,
  TrendingUp,
  Target,
  Loader2
} from "lucide-react";
import { getDetailedReport } from "../../../api/routes.js";
import { useNavigate } from "react-router-dom";

const DetailedReport = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await getDetailedReport();
        setData(res.report);
      } catch (err) {
        console.error("Report Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-gray-500 font-bold animate-pulse">
          Compiling Detailed Intelligence...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation & Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div className="flex items-center gap-4">
            {/* <button 
              onClick={() => navigate("/dashboard")}
              className="p-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition shadow-sm"
            >
              <ArrowLeft size={20} className="text-gray-600" />
            </button> */}
            <div>
              <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                Detailed <span className="text-blue-600">Analytics</span>
              </h1>
              <p className="text-gray-500 font-medium mt-1 italic">
                Deep dive into source performance and agent efficiency.
              </p>
            </div>
          </div>
          
          {/* <button className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-lg shadow-gray-200">
            <Download size={18} /> Export PDF
          </button> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Stats & Source */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Critical Alert: Aging Leads */}
            {data?.agingLeadsCount > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-amber-50 border border-amber-100 p-6 rounded-[2rem] flex items-center gap-5"
              >
                <div className="h-14 w-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <AlertCircle size={28} />
                </div>
                <div>
                  <h4 className="font-black text-amber-900 text-lg uppercase tracking-tight">Pipeline Warning</h4>
                  <p className="text-amber-700 font-medium">
                    Attention! <b>{data.agingLeadsCount} leads</b> have been inactive for more than 7 days. They require immediate follow-up.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Source Analysis Section */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><PieChart size={20}/></div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Source Performance</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data?.sourceAnalysis?.map((source, i) => (
                  <div key={i} className="group bg-gray-50 p-5 rounded-3xl border border-transparent hover:border-blue-100 hover:bg-white transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <span className="px-3 py-1 bg-white rounded-full text-[10px] font-black text-blue-600 border border-blue-50 uppercase tracking-widest">
                        {source._id || "Direct"}
                      </span>
                      <TrendingUp size={16} className="text-gray-300 group-hover:text-blue-400" />
                    </div>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-2xl font-black text-gray-900">{source.count}</p>
                        <p className="text-xs font-bold text-gray-400">Total Inflow</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-emerald-600">{source.closed}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Successful Closures</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Leaderboard */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm h-full">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg"><Target size={20}/></div>
                <h3 className="text-xl font-black text-gray-900 uppercase tracking-tight">Top Performers</h3>
              </div>

              <div className="space-y-6">
                {data?.topPerformers?.map((staff, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className={`h-12 w-12 rounded-2xl flex items-center justify-center font-black text-lg transition-colors ${
                      i === 0 ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-500 group-hover:bg-blue-50 group-hover:text-blue-600'
                    }`}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-gray-800 leading-none mb-1">{staff.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 flex-1 bg-gray-100 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${staff.rate * 100}%` }}
                            className="h-full bg-blue-600"
                          />
                        </div>
                        <span className="text-xs font-bold text-blue-600">{(staff.rate * 100).toFixed(0)}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 p-6 bg-blue-600 rounded-4xl text-white">
                <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Pro Insight</p>
                <p className="text-sm font-medium leading-relaxed">
                  Your top agent is converting at <b>{(data?.topPerformers?.[0]?.rate * 100).toFixed(1)}%</b>. 
                  Share their workflow with the rest of the team.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DetailedReport;