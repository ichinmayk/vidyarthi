// src/components/BottomNav.js
import React, { useState } from "react";
import {
  FiBarChart2,
  FiUser,
  FiClipboard,
  FiBook,
  FiCheckSquare,
  FiDollarSign,
} from "react-icons/fi"; // Added FiDollarSign
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function BottomNav({ hiddenItems = [] }) {
  const [selectedTab, setSelectedTab] = useState("Dashboard");
  const navigate = useNavigate(); // Initialize useNavigate

  const items = [
    { icon: FiBarChart2, label: "Dashboard", route: "/dashboard" }, // Added route
    { icon: FiUser, label: "Students", route: "/students" },
    { icon: FiClipboard, label: "Classes", route: "/classes" },
    { icon: FiBook, label: "Subjects", route: "/subjects" },
    { icon: FiCheckSquare, label: "Attendance", route: "/attendance" },
    { icon: FiDollarSign, label: "Fee Management", route: "/fee-management" }, // Added Fee Management
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
            route={item.route}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
            navigate={navigate} // Pass navigate as a prop
          />
        ))}
    </div>
  );
}

function BottomNavItem({ icon: Icon, label, route, selectedTab, setSelectedTab, navigate }) {
  const isSelected = selectedTab === label;

  return (
    <button
      onClick={() => {
        setSelectedTab(label); // Update the selected tab
        navigate(route); // Navigate to the associated route
      }}
      className={`flex flex-col items-center ${
        isSelected ? "text-indigo-600" : "text-gray-600"
      } transition-colors duration-200`}
    >
      <Icon className={`h-6 w-6 ${isSelected ? "text-indigo-600" : "text-gray-600"}`} />
      <span className={`text-xs ${isSelected ? "font-semibold" : ""}`}>{label}</span>
    </button>
  );
}
