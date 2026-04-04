import React, { useState, useEffect } from "react";
import { getDashboardStats } from "../../api/routes.js";
import StatsCards from "./StatsCards";
import MainCharts from "./MainCharts";
import StatusDonut from "./StatusDonut";
import { Loader2, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import { TrendingUp, ArrowRight, ShieldCheck } from "lucide-react";
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await getDashboardStats();
      setData(res);
    } catch (err) {
      console.error("Dashboard Load Error:", err);
    } finally {
      setLoading(false);
    }
  };
  console.log("data", data);

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
        <p className="text-gray-500 font-bold animate-pulse">
          Analyzing CRM Data...
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          {/* <h1 className="text-4xl font-black text-gray-900 tracking-tight">
            Intelligence <span className="text-blue-600">Hub</span>
          </h1> */}
          <p className="text-gray-500 mt-1 font-medium italic">
            Real-time performance metrics & lead analytics.
          </p>
        </div>
        <button
          onClick={fetchStats}
          className="p-3 bg-white border border-gray-200 rounded-2xl hover:bg-gray-50 transition shadow-sm"
        >
          <RefreshCcw size={20} className="text-gray-600" />
        </button>
      </div>

      {/* Top Stats Section */}
      <StatsCards summary={data?.summary} />

      {/* Main Charts Section */}
      <MainCharts
        trendData={data?.charts?.monthlyTrend}
        branchData={data?.charts?.branchDistribution}
      />

      {/* Bottom Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Left Side: Status Donut */}
        <div className="lg:col-span-1 h-full">
          <StatusDonut summary={data?.summary} />
        </div>

        {/* Right Side: Smart Lead Insights Widget */}
        <div className="lg:col-span-1 relative bg-linear-to-br from-indigo-600 via-blue-600 to-indigo-800 rounded-[2.5rem] p-10 text-white shadow-2xl shadow-blue-200/50 overflow-hidden flex flex-col justify-between border border-white/10">
          {/* Background Decorative Circles (Optional for Premium Feel) */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl border border-white/30">
                <TrendingUp className="text-white" size={24} />
              </div>
              <h2 className="text-2xl font-black tracking-tight">
                Smart Lead Insights
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-blue-50 text-xl leading-relaxed font-medium">
                Your conversion rate is at{" "}
                <span className="inline-block px-3 py-1 bg-emerald-400/20 text-emerald-300 rounded-xl border border-emerald-400/30 font-black mx-1">
                  {data?.summary?.conversionRate || "0%"}
                </span>
              </p>

              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/10">
                <p className="text-blue-100 leading-relaxed">
                  <span className="text-white font-bold block mb-1 underline decoration-blue-400 underline-offset-4">
                    Priority Focus Needed:
                  </span>
                  Focus on the{" "}
                  <span className="font-black text-white uppercase tracking-wider">
                    {data?.summary?.followUp} leads
                  </span>{" "}
                  in follow-up status to boost this week's target.
                </p>
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-wrap gap-4 mt-10 relative z-10">
            <Link to="/detailed-report" className="flex-1">
              <button className="w-full bg-white text-indigo-700 px-6 py-4 rounded-2xl font-black text-sm shadow-xl shadow-indigo-900/20 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 group">
                Detailed Report
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </Link>

            <Link to="/" className="flex-1">
              <button className="w-full bg-indigo-500/30 text-white border border-white/20 px-6 py-4 rounded-2xl font-bold text-sm backdrop-blur-md hover:bg-white/10 transition-all flex items-center justify-center gap-2 group">
                <ShieldCheck size={18} className="opacity-70" />
                System Audit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
