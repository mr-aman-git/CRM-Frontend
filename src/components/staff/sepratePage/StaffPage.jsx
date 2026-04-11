import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Mail,
  MapPin,
  ShieldCheck,
  Briefcase,
  Target,
  PhoneCall,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
  Calendar,
  Filter,
  UserMinus,
  PowerOff,
  AlertOctagon,
  PhoneOff,
  History,
  TrendingUp,
} from "lucide-react";
import { getStaffStats } from "../../../api/routes.js";
import { toast } from "react-toastify";

const StaffPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Filter State add kari
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await getStaffStats(id, filter);
        setData(res);
        console.log("res", res);
      } catch (err) {
        toast.error("Staff details not found");
        navigate("/staff");
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchProfile();
  }, [id, navigate, filter]); // 3. Filter ko dependency mein dala

  if (loading && !data)
    // Sirf pehli baar bada loader dikhaye
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 bg-[#F8FAFC]">
        <Loader2 className="animate-spin text-blue-600" size={40} />
        <p className="text-gray-500 font-medium animate-pulse">
          Loading Staff Intelligence...
        </p>
      </div>
    );

  const { staffDetails, stats } = data;

  return (
    <div className="p-6 bg-[#F8FAFC] font-sans min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Top Header with Back Button & Filter Dropdown */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-semibold text-sm"
          >
            <ArrowLeft size={18} /> Back to Team
          </button>

          {/* 4. Filter UI */}
          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm">
            <Filter size={16} className="text-blue-500" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="text-xs font-bold text-gray-600 bg-transparent outline-none cursor-pointer uppercase tracking-wider"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            {loading && (
              <Loader2 size={14} className="animate-spin text-blue-500" />
            )}
          </div>
        </div>

        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-4xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 mb-10"
        >
          <div className="h-32 w-32 rounded-3xl bg-linear-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white text-4xl font-black shadow-xl shadow-blue-100">
            {staffDetails.name.substring(0, 2).toUpperCase()}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
              <h1 className="text-3xl font-black text-gray-900">
                {staffDetails.name}
              </h1>
              {staffDetails.isVerified && (
                <span className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
                  <ShieldCheck size={14} /> Verified Member
                </span>
              )}
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-gray-500 text-sm font-medium">
              <span className="flex items-center gap-1.5">
                <Mail size={16} className="text-blue-500" />{" "}
                {staffDetails.email}
              </span>
              <span className="flex items-center gap-1.5 uppercase tracking-wider">
                <MapPin size={16} className="text-blue-500" />{" "}
                {staffDetails.branch} Branch
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={16} className="text-blue-500" /> Member since
                2026
              </span>
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-2xl text-center min-w-37.5 border border-blue-100">
            <p className="text-[10px] font-black text-blue-400 uppercase mb-1">
              Success Rate ({filter})
            </p>
            <p className="text-3xl font-black text-blue-700">
              {stats.totalAssigned > 0
                ? ((stats.closed / stats.totalAssigned) * 100).toFixed(0)
                : 0}
              %
            </p>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Left Highlight Card */}
          <motion.div
            whileHover={{ y: -5 }}
            className="lg:col-span-1 bg-gray-900 text-white rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Briefcase size={120} className="-rotate-12" />
            </div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/5">
                  <Briefcase size={24} className="text-blue-400" />
                </div>
                <span className="text-[10px] font-black uppercase bg-blue-500 px-4 py-1.5 rounded-full tracking-[0.1em] shadow-lg shadow-blue-500/20">
                  {filter === "all" ? "Total Workload" : `${filter}'s focus`}
                </span>
              </div>

              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">
                Leads to Process
              </p>
              <h2 className="text-6xl font-black tracking-tighter italic">
                {stats.totalAssigned || 0}
              </h2>
            </div>

            <div className="mt-10 relative z-10">
              <div className="flex justify-between text-[10px] mb-2 text-gray-400 font-black uppercase tracking-widest">
                <span>Syncing Efficiency</span>
                <span className="text-blue-400 animate-pulse">● Live</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1.5 }}
                  className="h-full bg-gradient-to-r from-blue-600 to-blue-400"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Status Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatusBox
              label="Interested"
              value={stats.interested}
              icon={<Target size={20} />}
              color="bg-emerald-50 text-emerald-600"
            />
            <StatusBox
              label="Follow-up"
              value={stats.followUp}
              icon={<PhoneCall size={20} />}
              color="bg-amber-50 text-amber-600"
            />
            <StatusBox
              label="Callback"
              value={stats.callBackDue}
              icon={<History size={20} />}
              color="bg-violet-50 text-violet-600"
            />
            <StatusBox
              label="Pending"
              value={stats.pending}
              icon={<Clock size={20} />}
              color="bg-blue-50 text-blue-600"
            />
            <StatusBox
              label="Closed"
              value={stats.closed}
              icon={<CheckCircle size={20} />}
              color="bg-indigo-50 text-indigo-600"
            />
            <StatusBox
              label="Busy"
              value={stats.busy}
              icon={<UserMinus size={20} />}
              color="bg-orange-50 text-orange-600"
            />
            <StatusBox
              label="Not Picked"
              value={stats.notPicked}
              icon={<PhoneOff size={20} />}
              color="bg-rose-50 text-rose-600"
            />
            <StatusBox
              label="Switch Off"
              value={stats.switchOff}
              icon={<PowerOff size={20} />}
              color="bg-gray-100 text-gray-600"
            />
            <StatusBox
              label="Invalid"
              value={stats.invalidNumber}
              icon={<AlertOctagon size={20} />}
              color="bg-red-50 text-red-600"
            />
          </div>
        </div>

        {/* Action Suggestion */}
        <div className="mt-10 p-6 bg-white border border-dashed border-gray-300 rounded-4xl flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
              <CheckCircle size={24} />
            </div>
            <p className="text-sm text-gray-500 font-medium">
              Report showing data for:{" "}
              <span className="text-blue-600 font-bold uppercase">
                {filter}
              </span>
            </p>
          </div>
          <button className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-sm font-bold transition-all">
            Download {filter} Report
          </button>
        </div>
      </div>
    </div>
  );
};

const StatusBox = ({ label, value, icon, color }) => (
  <motion.div
    layout // Smooth transition for value changes
    whileHover={{ scale: 1.02 }}
    className="bg-white p-6 rounded-4xl border border-gray-100 shadow-sm flex items-center justify-between"
  >
    <div className="flex items-center gap-4">
      <div
        className={`h-12 w-12 rounded-2xl ${color} flex items-center justify-center`}
      >
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-2xl font-black text-gray-800">{value}</p>
      </div>
    </div>
  </motion.div>
);

export default StaffPage;
