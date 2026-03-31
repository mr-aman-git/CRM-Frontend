import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Lock, User, Loader2, Mail, MapPin } from "lucide-react";
import { StaffRegister, StaffVerify } from "../../api/routes";
import { toast } from "react-toastify";
const StaffModal = ({
  isOpen,
  onClose,
  step,
  setStep,
  currentEmail,
  setCurrentEmail,
  refreshList,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: "",
    password: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Frontend Validation for Branch
    if (!formData.branch) {
      return toast.error("Please select a branch location");
    }

    setLoading(true);
    try {
      // Destructuring to keep it clean
      const { name, email, branch, password } = formData;

      const res = await StaffRegister({ name, email, branch, password });

      console.log("Registration Success:", res);

      toast.success("Registration successful! Please verify OTP.");
      setCurrentEmail(email);
      setStep("verify");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed";
      toast.error(errorMsg);
      console.error("Reg Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!formData.otp) {
      return toast.warn("Please enter the OTP");
    }
    setLoading(true);
    try {
      await StaffVerify({ email: currentEmail, otp: formData.otp });

      toast.success("Staff Verified Successfully! 🎉");

      // Cleanup and Refresh
      refreshList();
      onClose();
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Invalid or expired OTP";
      toast.error(errorMsg);
      console.error("Verify Error:", error);
    } finally {
      setLoading(false);
    }
  };
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 hover:bg-gray-100 rounded-full transition"
          >
            <X size={20} />
          </button>

          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {step === "register" ? "Create Staff Account" : "Verify OTP"}
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              {step === "register"
                ? "Enter details to send verification code"
                : `Enter the 6-digit code sent to ${currentEmail}`}
            </p>

            <form
              onSubmit={step === "register" ? handleRegister : handleVerify}
              className="space-y-4"
            >
              {step === "register" ? (
                <>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-3 top-3 text-gray-400"
                        size={18}
                      />
                      <input
                        required
                        type="text"
                        placeholder="John Doe"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                      Branch Location
                    </label>
                    <div className="relative">
                      {/* Icon changed to MapPin for location feel */}
                      <MapPin
                        className="absolute left-3 top-3 text-gray-400 pointer-events-none"
                        size={18}
                      />

                      <select
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                        value={formData.branch}
                        onChange={(e) =>
                          setFormData({ ...formData, branch: e.target.value })
                        }
                      >
                        <option value="" disabled>
                          Select Branch
                        </option>
                        <option value="madurai">Madurai</option>
                        <option value="delhi">Delhi</option>
                        <option value="chennai">Chennai</option>
                        <option value="coimbatore">Coimbatore</option>
                        <option value="ramanathapuram">Ramanathapuram</option>
                      </select>
                      {/* <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
      <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
      </svg>
    </div> */}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail
                        className="absolute left-3 top-3 text-gray-400"
                        size={18}
                      />
                      <input
                        required
                        type="email"
                        placeholder="staff@company.com"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-3 text-gray-400"
                        size={18}
                      />
                      <input
                        required
                        type="password"
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 bg-gray-50 border-none rounded-xl focus:ring-2 focus:ring-blue-500"
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase ml-1">
                    Verification Code
                  </label>
                  <input
                    required
                    type="text"
                    maxLength="6"
                    placeholder="000000"
                    className="w-full px-4 py-4 bg-gray-50 border-none rounded-xl text-center text-2xl font-bold tracking-[1em] focus:ring-2 focus:ring-blue-500"
                    onChange={(e) =>
                      setFormData({ ...formData, otp: e.target.value })
                    }
                  />
                </div>
              )}

              <button
                disabled={loading}
                type="submit"
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100 flex items-center justify-center"
              >
                {loading ? (
                  <Loader2 className="animate-spin mr-2" size={20} />
                ) : step === "register" ? (
                  "Send OTP"
                ) : (
                  "Verify & Complete"
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default StaffModal;
