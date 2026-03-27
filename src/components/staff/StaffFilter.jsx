import React from 'react';
import { Search, MapPin, XCircle } from 'lucide-react';

const StaffFilter = ({ filters, setFilters, branches }) => {
  const handleClear = () => {
    setFilters({ email: '', branch: '' });
  };

  return (
    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm mb-8 flex flex-wrap gap-4 items-center">
      {/* Email Search */}
      <div className="relative flex-1 min-w-[240px]">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search by email..."
          value={filters.email}
          onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm"
        />
      </div>

      {/* Branch Dropdown */}
      <div className="relative min-w-[200px]">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <select
          value={filters.branch}
          onChange={(e) => setFilters({ ...filters, branch: e.target.value })}
          className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all text-sm appearance-none cursor-pointer"
        >
          <option value="">All Branches</option>
          {branches.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      {/* Clear Filters */}
      {(filters.email || filters.branch) && (
        <button
          onClick={handleClear}
          className="flex items-center text-sm font-medium text-red-500 hover:text-red-600 transition"
        >
          <XCircle size={16} className="mr-1" /> Clear
        </button>
      )}
    </div>
  );
};

export default StaffFilter;