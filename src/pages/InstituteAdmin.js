// src/pages/InstituteAdmin.js
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import BottomNav from '../components/BottomNav';
import { useTranslation } from 'react-i18next';

export default function InstituteAdmin() {
  const { t } = useTranslation();
  
  // State to manage the selected tab across Sidebar and BottomNav
  const [selectedTab, setSelectedTab] = useState('Dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Sidebar */}
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />

      {/* Main content */}
      <div className="flex-1 p-6 md:p-8 bg-white">
        <h1 className="text-2xl font-semibold">{t('instituteAdmin.dashboardOverview')}</h1>
        <div className="grid gap-6 mt-4 md:grid-cols-4 grid-cols-2">
          <Card label={t('instituteAdmin.totalStudents')} count="1200" />
          <Card label={t('instituteAdmin.totalClasses')} count="45" />
          <Card label={t('instituteAdmin.totalSubjects')} count="30" />
          <Card label={t('instituteAdmin.attendance')} count="95%" />
        </div>
      </div>

      {/* Bottom Navigation for mobile */}
      <BottomNav selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
    </div>
  );
}

// Card component
function Card({ label, count }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 text-center">
      <h2 className="text-lg font-medium">{label}</h2>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  );
}
