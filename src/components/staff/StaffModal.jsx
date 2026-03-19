import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Lock, User, Loader2, Mail } from "lucide-react";
import { StaffRegister, StaffVerify } from "../../api/routes";

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
    password: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await StaffRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setCurrentEmail(formData.email);
      setStep("verify");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await StaffVerify({ email: currentEmail, otp: formData.otp });
      alert("Staff Verified Successfully!");
      refreshList();
      onClose();
    } catch (error) {
      alert("Invalid OTP");
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
