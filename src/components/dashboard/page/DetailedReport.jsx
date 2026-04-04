import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { getDetailedReport } from "../../../api/routes.js";
import AgingAlert from "./detailedReportSection/AgingAlert.jsx";
import SourcePerformance from "./detailedReportSection/SourcePerformance";
import Leaderboard from "./detailedReportSection/Leaderboard";

const DetailedReport = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

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
        <p className="text-gray-500 font-bold animate-pulse italic text-sm">
          Compiling Detailed Intelligence...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            Detailed <span className="text-blue-600">Analytics</span>
          </h1>
          <p className="text-gray-500 font-medium mt-1 italic text-sm">
            Deep dive into source performance and agent efficiency.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-8">
            <AgingAlert count={data?.agingLeadsCount} />
            <SourcePerformance sourceAnalysis={data?.sourceAnalysis} />
          </div>

          {/* Sidebar Area */}
          <Leaderboard performers={data?.topPerformers} />
        </div>
      </div>
    </div>
  );
};

export default DetailedReport;
