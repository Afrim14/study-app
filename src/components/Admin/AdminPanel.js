import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';

const AdminPanel = () => {
  const { subjects, studyHistory } = useStudy();
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  // Get data for the chart
  const getChartData = () => {
    // Filter data based on selections
    let filteredData = [...studyHistory];
    
    if (selectedSubject !== 'all') {
      filteredData = filteredData.filter(session => session.subjectId === selectedSubject);
    }
    
    if (selectedTimeframe !== 'all') {
      const today = new Date();
      let startDate;
      
      switch(selectedTimeframe) {
        case 'day':
          startDate = new Date(today);
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          startDate = new Date(today);
          startDate.setDate(today.getDate() - 7);
          break;
        case 'month':
          startDate = new Date(today);
          startDate.setMonth(today.getMonth() - 1);
          break;
        default:
          startDate = new Date(0); // Beginning of time
      }
      
      filteredData = filteredData.filter(session => new Date(session.date) >= startDate);
    }
    
    // Group by subject
    const subjectData = {};
    subjects.forEach(subject => {
      subjectData[subject.id] = {
        name: subject.name,
        color: subject.color,
        totalTime: 0
      };
    });
    
    filteredData.forEach(session => {
      if (subjectData[session.subjectId]) {
        subjectData[session.subjectId].totalTime += session.duration;
      }
    });
    
    return Object.values(subjectData).filter(subject => subject.totalTime > 0);
  };

  const chartData = getChartData();
  
  const totalTime = chartData.reduce((total, subject) => total + subject.totalTime, 0);
  
  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Statistics</h2>
        <div className="flex gap-2">
          <select
            className="input"
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
          >
            <option value="all">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
          
          <select
            className="input"
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
          >
            <option value="all">All Time</option>
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      {/* Bar chart */}
      <div className="h-64 flex items-end gap-4 mb-8">
        {chartData.length > 0 ? (
          chartData.map((subject, index) => {
            const heightPercentage = (subject.totalTime / Math.max(...chartData.map(s => s.totalTime))) * 100;
            
            return (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full rounded-t-md" 
                  style={{ 
                    height: `${heightPercentage}%`, 
                    backgroundColor: subject.color,
                    minHeight: '10px'
                  }}
                ></div>
                <div className="text-xs mt-2 text-center">{subject.name}</div>
              </div>
            );
          })
        ) : (
          <div className="w-full text-center text-light py-16">
            No study data available
          </div>
        )}
      </div>

      <div className="text-center">
        <p>
          Good Job! Keep it Up
        </p>
        <p className="text-sm text-light">
          {formatTime(totalTime)}
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;