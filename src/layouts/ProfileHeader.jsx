import React from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { useLocation } from "react-router-dom";

const ProfileHeader = ({ setIsOpen, menuItems }) => {
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");
  const location = useLocation();

  // 🔥 Current route ka title nikalna
  const currentPage =
    menuItems.find((item) => item.path === location.pathname)?.name ||
    "Dashboard";

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-blue-500 shadow-lg h-20 flex items-center justify-between px-4 lg:px-6">
      {/* Left: Menu + Page Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsOpen(true)}
          className="lg:hidden text-2xl text-gray-600 hover:text-blue-600"
        >
          <HiMenuAlt3 />
        </button>

        <h1 className="text-[20px] lg:text-2xl font-bold text-gray-800">
          {currentPage}
        </h1>
      </div>

      {/* Right: Profile */}
      <div className="flex items-center gap-3">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-gray-800">{name}</p>
          <p className="text-xs text-gray-500 uppercase">{role}</p>
        </div>

        {/* Avatar */}
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow">
          {name?.slice(0, 2).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
