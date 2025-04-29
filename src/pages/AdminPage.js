import React, { useState } from 'react';
import Navigation from '../components/common/Navigation';
import AdminPanel from '../components/Admin/AdminPanel';
import HistoryNotes from '../components/Admin/HistoryNotes';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('statistics');

  return (
    <div className="page-container">
      <h1 className="page-title">Admin</h1>
      
      <div className="tab-container">
        <div 
          className={`tab ${activeTab === 'statistics' ? 'active' : ''}`}
          onClick={() => setActiveTab('statistics')}
        >
          Statistics
        </div>
        <div 
          className={`tab ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          History Notes
        </div>
      </div>
      
      {activeTab === 'statistics' ? (
        <AdminPanel />
      ) : (
        <HistoryNotes />
      )}
      
      <Navigation />
    </div>
  );
};

export default AdminPage;