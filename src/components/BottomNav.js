// src/components/BottomNav.js
import React, { useState } from 'react';
import { FiBarChart2, FiUser, FiClipboard, FiBook, FiCheckSquare } from 'react-icons/fi';

export default function BottomNav() {
  const [selectedTab, setSelectedTab] = useState("Dashboard");

  return (
    <div className="fixed bottom-0 inset-x-0 bg-gray-100 shadow-lg flex justify-around py-2 border-t md:hidden">
      <BottomNavItem icon={FiBarChart2} label="Dashboard" selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <BottomNavItem icon={FiUser} label="Students" selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <BottomNavItem icon={FiClipboard} label="Classes" selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <BottomNavItem icon={FiBook} label="Subjects" selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <BottomNavItem icon={FiCheckSquare} label="Attendance" selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </div>
  );
}

function BottomNavItem({ icon: Icon, label, selectedTab, setSelectedTab }) {
  const isSelected = selectedTab === label;

  return (
    <button
      onClick={() => setSelectedTab(label)}
      className={`flex flex-col items-center ${isSelected ? 'text-indigo-600' : 'text-gray-600'} transition-colors duration-200`}
    >
      <Icon className={`h-6 w-6 ${isSelected ? 'text-indigo-600' : 'text-gray-600'}`} />
      <span className={`text-xs ${isSelected ? 'font-semibold' : ''}`}>{label}</span>
    </button>
  );
}
