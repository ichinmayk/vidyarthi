// src/components/Sidebar.js
import React from "react";
import {
  FiBarChart2,
  FiUser,
  FiClipboard,
  FiBook,
  FiCheckSquare,
  FiDollarSign,
} from "react-icons/fi"; // Added FiDollarSign
import { FaIndianRupeeSign } from "react-icons/fa6";
import brandLogo from "../assets/logos/vidyarthi_logo.jpg";

export default function Sidebar({
  selectedTab,
  setSelectedTab,
  hiddenItems = [],
}) {
  const items = [
    { icon: FiBarChart2, label: "Dashboard" },
    { icon: FiUser, label: "Students" },
    { icon: FiClipboard, label: "Classes" },
    { icon: FiBook, label: "Subjects" },
    { icon: FiCheckSquare, label: "Attendance" },
    { icon: FaIndianRupeeSign, label: "Fee Management" }, // Added Fee Management
  ];

  return (
    <div className="hidden md:flex flex-col items-center w-60 p-4 bg-gray-300 shadow-lg transition-width duration-300">
      <img src={brandLogo} alt="Vidyarthi Logo" className="h-12 mb-4" />
      <nav className="flex flex-col items-center space-y-4 mt-8 w-full">
        {items
          .filter((item) => !hiddenItems.includes(item.label)) // Exclude hidden items
          .map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              selectedTab={selectedTab}
              setSelectedTab={setSelectedTab}
            />
          ))}
      </nav>
    </div>
  );
}

function SidebarItem({ icon: Icon, label, selectedTab, setSelectedTab }) {
  const isSelected = selectedTab === label;

  return (
    <div
      onClick={() => setSelectedTab(label)}
      className={`flex items-center space-x-2 w-full p-2 rounded-md cursor-pointer ${
        isSelected
          ? "bg-indigo-100 text-indigo-600 font-semibold"
          : "text-gray-600"
      } transition-all duration-200`}
    >
      <Icon className="h-5 w-5" />
      <span>{label}</span>
    </div>
  );
}
