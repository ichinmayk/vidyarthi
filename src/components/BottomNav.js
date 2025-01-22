// src/components/BottomNav.js
import React, { useState } from "react";
import { FiBarChart2, FiUser, FiClipboard, FiBook, FiCheckSquare, FiDollarSign } from "react-icons/fi"; // Added FiDollarSign

export default function BottomNav({ hiddenItems = [] }) {
  const [selectedTab, setSelectedTab] = useState("Dashboard");

  const items = [
    { icon: FiBarChart2, label: "Dashboard" },
    { icon: FiUser, label: "Students" },
    { icon: FiClipboard, label: "Classes" },
    { icon: FiBook, label: "Subjects" },
    { icon: FiCheckSquare, label: "Attendance" },
    { icon: FiDollarSign, label: "Fee Management" }, // Added Fee Management
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 bg-gray-100 shadow-lg flex justify-around py-2 border-t md:hidden">
      {items
        .filter((item) => !hiddenItems.includes(item.label)) // Exclude hidden items
        .map((item) => (
          <BottomNavItem
            key={item.label}
            icon={item.icon}
            label={item.label}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        ))}
    </div>
  );
}

function BottomNavItem({ icon: Icon, label, selectedTab, setSelectedTab }) {
  const isSelected = selectedTab === label;

  return (
    <button
      onClick={() => setSelectedTab(label)}
      className={`flex flex-col items-center ${
        isSelected ? "text-indigo-600" : "text-gray-600"
      } transition-colors duration-200`}
    >
      <Icon className={`h-6 w-6 ${isSelected ? "text-indigo-600" : "text-gray-600"}`} />
      <span className={`text-xs ${isSelected ? "font-semibold" : ""}`}>{label}</span>
    </button>
  );
}
