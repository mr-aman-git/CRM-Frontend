import React, { useState, useEffect, useMemo } from "react";
import { getAllStaff } from "../../api/routes";
import {
  UserPlus,
  Mail,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  MapPin,
} from "lucide-react";
import StaffModal from "./StaffModal";
import StaffFilter from "./StaffFilter"; // Import naya component
import { Link } from "react-router-dom";

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState("register");
  const [currentEmail, setCurrentEmail] = useState("");

  // 1. Filters State
  const [filters, setFilters] = useState({ email: "", branch: "" });

  const fetchStaff = async () => {
    try {
      setLoading(true);
      const data = await getAllStaff();
      setStaffList(data);
    } catch (error) {
      console.error("Error fetching staff", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // 2. Filter Logic (useMemo for Performance)
  const filteredStaff = useMemo(() => {
    return staffList.filter((staff) => {
      const matchesEmail = staff.email
        .toLowerCase()
        .includes(filters.email.toLowerCase());
      const matchesBranch =
        filters.branch === "" || staff.branch === filters.branch;
      return matchesEmail && matchesBranch;
    });
  }, [staffList, filters]);

  // 3. Unique Branches nikalna dropdown ke liye
  const branches = useMemo(() => {
    return [...new Set(staffList.map((s) => s.branch))].filter(Boolean);
  }, [staffList]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* 4. Filter Component Usage */}
        <StaffFilter
          filters={filters}
          setFilters={setFilters}
          branches={branches}
        />

        <button
          onClick={() => {
            setStep("register");
            setIsModalOpen(true);
          }}
          className="flex items-center px-6 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition shadow-xl shadow-blue-100 font-bold text-sm cursor-pointer"
        >
          <UserPlus size={18} className="mr-2 " /> Add Staff Member
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      ) : (
        <>
        
          {filteredStaff.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStaff.map((staff) => (
                <Link to={`/staff/${staff._id}`}>
                <div
                  key={staff._id}
                  className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="flex justify-between items-start mb-5">
                    <div className="h-14 w-14 bg-linear-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-black shadow-lg shadow-blue-100">
                      {staff.name.charAt(0)}
                    </div>
                    {staff.isVerified ? (
                      <span className="flex items-center text-[10px] font-black uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1.5 rounded-lg border border-green-100">
                        <ShieldCheck size={14} className="mr-1" /> Verified
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setCurrentEmail(staff.email);
                          setStep("verify");
                          setIsModalOpen(true);
                        }}
                        className="flex items-center text-[10px] font-black uppercase tracking-widest text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-100 hover:bg-amber-100 transition"
                      >
                        <ShieldAlert size={14} className="mr-1" /> Pending
                      </button>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {staff.name}
                  </h3>

                  <div className="space-y-2">
                    <div className="flex items-center text-gray-500 text-sm font-medium">
                      <Mail size={14} className="mr-2 text-blue-400" />{" "}
                      {staff.email}
                    </div>
                    <div className="flex items-center text-gray-500 text-sm font-medium">
                      <MapPin size={14} className="mr-2 text-indigo-400" />{" "}
                      {staff.branch || "Main Branch"}
                    </div>
                  </div>
                </div>
                 </Link>
              ))}
              
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <p className="text-gray-400 font-medium">
                No staff found matching your filters.
              </p>
            </div>
          )}
        </>
      )}

      <StaffModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        step={step}
        setStep={setStep}
        currentEmail={currentEmail}
        setCurrentEmail={setCurrentEmail}
        refreshList={fetchStaff}
      />
    </div>
  );
};

export default Staff;
