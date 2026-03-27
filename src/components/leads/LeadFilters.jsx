import React, { useState } from "react";
import { Search, Filter } from "lucide-react";

const LeadFilters = ({ filters, setFilters }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by number..."
          className="pl-10 w-full p-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setFilters({ ...filters, phone: e.target.value })}
        />
      </div>
      <input
        type="text"
        placeholder="Filter by City"
        className="w-full p-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setFilters({ ...filters, city: e.target.value })}
      />
      <select
        className="w-full p-2 bg-gray-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      >
        <option value="">All Status</option>
        <option value="Pending">Pending</option>
        <option value="Follow Up">Follow Up</option>
        <option value="Closed">Busy</option>
        <option value="Closed">Interested</option>
        <option value="Closed">Closed</option>
      </select>
    </div>
  );
};

export default LeadFilters;
