import React, { useEffect, useState } from 'react';
import { useStudy } from '../../context/StudyContext';

const FocusStats = () => {
  const { studyHistory, subjects } = useStudy();
  const [activeTab, setActiveTab] = useState('daily');
  const [stats, setStats] = useState({
    totalTime: 0,
    sessionsCompleted: 0,
    averageSessionLength: 0,
    subjectDistribution: {}
  });

  useEffect(() => {
    if (studyHistory.length > 0) {
      // Calculate stats
      const totalTime = studyHistory.reduce((acc, session) => acc + session.duration, 0);
      const sessionsCompleted = studyHistory.length;
      const averageSessionLength = Math.round(totalTime / sessionsCompleted);
      
      // Calculate subject distribution
      const subjectDistribution = {};
      subjects.forEach(subject => {
        subjectDistribution[subject.id] = {
          name: subject.name,
          color: subject.color,
          time: 0
        };
      });
      
      studyHistory.forEach(session => {
        if (subjectDistribution[session.subjectId]) {
          subjectDistribution[session.subjectId].time += session.duration;
        }
      });
      
      setStats({
        totalTime,
        sessionsCompleted,
        averageSessionLength,
        subjectDistribution
      });
    }
  }, [studyHistory, subjects]);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const renderBarChart = () => {
    const subjectData = Object.values(stats.subjectDistribution)
      .filter(subject => subject.time > 0)
      .sort((a, b) => b.time - a.time);
    
    const maxTime = Math.max(...subjectData.map(subject => subject.time), 1);
    
    return (
      <div className="flex flex-col gap-3 mt-4">
        {subjectData.map((subject, index) => (
          <div key={index} className="flex flex-col">
            <div className="flex justify-between text-sm mb-1">
              <span>{subject.name}</span>
              <span>{formatTime(subject.time)}</span>
            </div>
            <div className="h-6 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full"
                style={{ 
                  width: `${(subject.time / maxTime) * 100}%`, 
                  backgroundColor: subject.color 
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="card">
      <h2 className="text-lg font-medium mb-4">Statistics</h2>
      
      <div className="tab-container mb-4">
        <div 
          className={`tab ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          Daily
        </div>
        <div 
          className={`tab ${activeTab === 'weekly' ? 'active' : ''}`}
          onClick={() => setActiveTab('weekly')}
        >
          Weekly
        </div>
        <div 
          className={`tab ${activeTab === 'monthly' ? 'active' : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          Monthly
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm text-light mb-1">Total Study Time</h3>
          <p className="text-xl font-bold">{formatTime(stats.totalTime)}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm text-light mb-1">Sessions Completed</h3>
          <p className="text-xl font-bold">{stats.sessionsCompleted}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm text-light mb-1">Average Session</h3>
          <p className="text-xl font-bold">{formatTime(stats.averageSessionLength)}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-sm text-light mb-1">Current Streak</h3>
          <p className="text-xl font-bold">3 days</p>
        </div>
      </div>
      
      <h3 className="font-medium mb-2">Subject Distribution</h3>
      {renderBarChart()}
      
      <div className="text-center text-primary font-medium mt-6">
        Good job! Keep it up
        <p className="text-sm text-light">12h 42mins</p>
      </div>
    </div>
  );
};

export default FocusStats;