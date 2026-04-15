import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import {
  HiMenuAlt3,
  HiX,
  HiViewGrid,
  HiUsers,
  HiClipboardList,
  HiCog,
  HiUserGroup,
  HiLogout,
} from "react-icons/hi";

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const role = localStorage.getItem("role");

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin-dashboard",
      icon: <HiViewGrid />,
      roles: ["admin"],
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <HiViewGrid />,
      roles: ["staff"],
    },
    {
      name: "Upload Leads",
      path: "/upload-leads",
      icon: <HiClipboardList />,
      roles: ["admin"],
    },
    {
      name: "Leads Management",
      path: "/leads",
      icon: <HiUsers />,
      roles: ["admin"],
    },
    {
      name: "Staff Manage",
      path: "/staff",
      icon: <HiUserGroup />,
      roles: ["admin"],
    },
    {
      name: "My Leads",
      path: "/my-leads",
      icon: <HiUserGroup />,
      roles: ["staff"],
    },
    {
      name: "Follow Up",
      path: "/schedule-leads",
      icon: <HiUserGroup />,
      roles: ["staff"],
    },
    { name: "Services", path: "/service", icon: <HiCog />, roles: ["admin"] },
  ];

  const handleLogout = () => {
    localStorage.removeItem("loginToken");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    window.location.reload();
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={`fixed lg:static inset-y-0 left-0 bg-white shadow-2xl z-50 w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 text-2xl font-bold text-blue-600 border-b">
          CRM Ornsoar
        </div>

        <nav className="mt-6 px-4 space-y-2">
          {menuItems
            .filter((item) => item.roles.includes(role))
            .map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                  location.pathname === item.path
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                    : "text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 text-red-500 p-3 w-full hover:bg-red-50 rounded-xl transition-all"
          >
            <HiLogout className="text-xl" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <ProfileHeader setIsOpen={setIsOpen} menuItems={menuItems} />

        {/* Dynamic Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
