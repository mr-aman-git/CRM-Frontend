import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { HiLockClosed, HiUser, HiKey } from "react-icons/hi";
import { adminRegister } from "../../api/routes";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    secretKey: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const toastId = toast.loading("Creating Admin Account... 🛡️");

    try {
      const res = await adminRegister(formData);

      // Token store karna
      localStorage.setItem("loginToken", res.data.token);
      localStorage.setItem("name", res?.data.username);
      localStorage.setItem("name", res?.data.role);

      toast.update(toastId, {
        render: "Admin Registered Successfully! 🚀",
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });

      // Dashboard par bhej dena
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      const errorMsg =
        err.response?.data?.message ||
        "Registration Failed! Check your Secret Key ❌";

      toast.update(toastId, {
        render: errorMsg,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 to-blue-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
      >
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
              CRM Admin Setup
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Create a new administrator account
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Username */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <HiUser />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                  placeholder="Name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <HiUser />
                </div>
                <input
                  type="text"
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                  placeholder="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <HiLockClosed />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Secret Key */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Secret Key
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <HiKey />
                </div>
                <input
                  type="password"
                  required
                  className="block w-full pl-10 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                  placeholder="Enter system secret key"
                  value={formData.secretKey}
                  onChange={(e) =>
                    setFormData({ ...formData, secretKey: e.target.value })
                  }
                />
              </div>
              <p className="mt-1.5 text-[10px] text-gray-400 px-1 italic">
                *Ask your system provider for the Secret Key
              </p>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              disabled={loading}
              type="submit"
              className={`w-full py-3.5 px-4 rounded-xl shadow-lg font-bold text-white bg-slate-900 hover:bg-black transition-all flex items-center justify-center gap-2 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Registering..." : "Create Admin Account"}
            </motion.button>
          </form>
        </div>

        <div className="px-8 py-5 bg-gray-50 border-t border-gray-100 flex justify-center items-center gap-2">
          <span className="text-sm text-gray-500">
            Already have an account?
          </span>
          <Link
            to="/login"
            className="text-sm font-bold text-blue-600 hover:underline"
          >
            Login here
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
