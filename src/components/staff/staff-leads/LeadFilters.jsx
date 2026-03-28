import React from "react";
import { Search, Filter as FilterIcon } from "lucide-react";

const LeadFilters = ({
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
}) => {
  return (
    <div className="bg-white p-4 sticky top-0 z-40 border-b border-gray-100 space-y-3">
      <h1 className="text-xl font-black text-gray-800 uppercase tracking-tighter">
        My Assignments
      </h1>

      <div className="flex flex-col gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Search name or phone..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter Dropdown */}
        <div className="relative">
          <FilterIcon
            className="absolute left-3 top-3 text-gray-400"
            size={16}
          />
          <select
            className="w-full pl-10 pr-4 py-3 bg-gray-100 border-none rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 appearance-none font-medium text-gray-700"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Busy">Busy</option>
            <option value="Follow Up">Follow Up</option>
            <option value="Interested">Interested</option>
            <option value="Not-Interested">Not Interested</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default LeadFilters;
