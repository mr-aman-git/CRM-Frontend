import React, { useMemo } from "react";
import { Search, MapPin, Filter, Calendar, XCircle, RotateCcw } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AutoAssignLeads from "../autoAssign/AutoAssignLeads";
const LeadFilters = ({ filters, setFilters, leads, activeTab }) => {
  
  const uniqueStatuses = useMemo(() => {
    if (!leads || !Array.isArray(leads)) return [];
    const statuses = leads.map((lead) => lead.status);
    return [...new Set(statuses)].filter(Boolean);
  }, [leads]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm items-center">
      
      {/* 1. Phone Search */}
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          placeholder="Phone number..."
          value={filters.phone || ""}
          className="pl-10 w-full p-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
          onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
        />
      </div>

      {/* 2. City Filter */}
      <div className="relative group">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        <input
          type="text"
          placeholder="Filter city..."
          value={filters.city || ""}
          className="pl-10 w-full p-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
          onChange={(e) => setFilters({ ...filters, city: e.target.value })}
        />
      </div>

      {/* 3. Status Dropdown */}
      <div className="relative group">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        <select
          value={filters.status || ""}
          className="pl-10 w-full p-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 cursor-pointer appearance-none outline-none"
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">All Status</option>
          {uniqueStatuses.sort().map((status) => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* 4. Improved Date Picker */}
      <div className="relative group custom-datepicker">
        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10 group-focus-within:text-blue-500" />
        <DatePicker
          selected={filters.date ? new Date(filters.date) : null}
          onChange={(date) => setFilters({ ...filters, date: date })}
          placeholderText="Select Date"
          dateFormat="dd/MM/yyyy"
          className="pl-10 w-full p-2.5 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all cursor-pointer"
          isClearable={false}
        />
      </div>

      <div className="relative group">
        {(activeTab === "unassigned") && (
          <AutoAssignLeads/>
        )}
      </div>

      {/* 5. Clear Button */}
      <div className="flex justify-start">
        {(filters.phone || filters.city || filters.status || filters.date) && (
          <button 
            onClick={() => setFilters({ phone: "", city: "", status: "", date: null })}
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-red-500 hover:bg-red-50 px-4 py-2.5 rounded-xl border border-red-100 transition-all"
          >
            <RotateCcw size={14} /> Reset Filters
          </button>
        )}
      </div>

      
    </div>
  );
};

export default LeadFilters;