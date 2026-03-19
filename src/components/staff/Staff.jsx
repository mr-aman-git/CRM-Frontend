import React, { useState, useEffect } from "react";
import { StaffRegister, StaffVerify, getAllStaff } from "../../api/routes";
import {
  UserPlus,
  Mail,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  RefreshCw,
} from "lucide-react";
import StaffModal from "./StaffModal";

const Staff = () => {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [step, setStep] = useState("register"); // register or verify
  const [currentEmail, setCurrentEmail] = useState("");

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

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">
            Staff Management
          </h1>
          <p className="text-gray-500">
            Manage your team and their verification status
          </p>
        </div>
        <button
          onClick={() => {
            setStep("register");
            setIsModalOpen(true);
          }}
          className="flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-200 font-semibold"
        >
          <UserPlus size={20} className="mr-2" /> Add New Staff
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="animate-spin text-blue-600" size={40} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffList.map((staff) => (
            <div
              key={staff._id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="h-12 w-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                  {staff.name.charAt(0)}
                </div>
                {staff.isVerified ? (
                  <span className="flex items-center text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <ShieldCheck size={14} className="mr-1" /> Verified
                  </span>
                ) : (
                  <button
                    onClick={() => {
                      setCurrentEmail(staff.email);
                      setStep("verify");
                      setIsModalOpen(true);
                    }}
                    className="flex items-center text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full hover:bg-amber-100"
                  >
                    <ShieldAlert size={14} className="mr-1" /> Verify Now
                  </button>
                )}
              </div>
              <h3 className="text-lg font-bold text-gray-800">{staff.name}</h3>
              <div className="flex items-center text-gray-500 text-sm mt-1">
                <Mail size={14} className="mr-2" /> {staff.email}
              </div>
            </div>
          ))}
        </div>
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
