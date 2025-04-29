import React, { useState } from 'react';
import Navigation from '../components/common/Navigation';
import Timer from '../components/FocusMode/Timer';
import FocusStats from '../components/FocusMode/FocusStats';
import { useStudy } from '../context/StudyContext';

const FocusModePage = () => {
  const { subjects, addStudySession } = useStudy();
  const [activeTab, setActiveTab] = useState('timer');
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.id || '');
  const [timerDuration, setTimerDuration] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);

  const handleTimerComplete = (duration) => {
    if (selectedSubject) {
      addStudySession({
        subjectId: selectedSubject,
        duration: Math.floor(duration / 60), // Convert seconds to minutes
        completed: true
      });
    }
    setSessionCompleted(true);
    setIsRunning(false);
  };

  const handleStartTimer = () => {
    setIsRunning(true);
    setSessionCompleted(false);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setSessionCompleted(false);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Focus Mode</h1>
      
      <div className="tab-container">
        <div 
          className={`tab ${activeTab === 'timer' ? 'active' : ''}`}
          onClick={() => setActiveTab('timer')}
        >
          Timer
        </div>
        <div 
          className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </div>
      </div>
      
      {activeTab === 'timer' ? (
        <div className="flex flex-col gap-4">
          <div className="card">
            <h2 className="text-lg font-medium mb-4">Stay Focused!</h2>
            
            {!isRunning && !sessionCompleted && (
              <div className="mb-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Select Subject
                  </label>
                  <select
                    className="input"
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                  >
                    {subjects.map(subject => (
                      <option key={subject.id} value={subject.id}>
                        {subject.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Timer Duration
                  </label>
                  <select
                    className="input"
                    value={timerDuration}
                    onChange={(e) => setTimerDuration(parseInt(e.target.value))}
                  >
                    <option value={15 * 60}>15 minutes</option>
                    <option value={20 * 60}>20 minutes</option>
                    <option value={25 * 60}>25 minutes</option>
                    <option value={30 * 60}>30 minutes</option>
                    <option value={45 * 60}>45 minutes</option>
                    <option value={60 * 60}>60 minutes</option>
                  </select>
                </div>
              </div>
            )}
            
            <Timer 
              duration={timerDuration} 
              isRunning={isRunning}
              onComplete={handleTimerComplete}
            />
            
            {!isRunning && !sessionCompleted ? (
              <button 
                className="btn w-full"
                onClick={handleStartTimer}
                disabled={!selectedSubject}
              >
                Start
              </button>
            ) : !isRunning && sessionCompleted ? (
              <div className="flex flex-col gap-2">
                <div className="bg-green-100 text-green-800 p-3 rounded-lg mb-2 text-center">
                  Great job! Keep it up!
                </div>
                <button 
                  className="btn w-full"
                  onClick={handleResetTimer}
                >
                  Start a New Session
                </button>
              </div>
            ) : (
              <button 
                className="btn btn-outline w-full"
                onClick={handleResetTimer}
              >
                Cancel Session
              </button>
            )}
          </div>
          
          <div className="card">
            <h3 className="font-medium mb-2">Focus Tips</h3>
            <ul className="list-disc pl-5 text-sm">
              <li className="mb-1">Remove distractions from your environment</li>
              <li className="mb-1">Set clear goals for your study session</li>
              <li className="mb-1">Take short breaks between sessions</li>
              <li className="mb-1">Stay hydrated and maintain good posture</li>
              <li>Use the Pomodoro technique (25 min work, 5 min break)</li>
            </ul>
          </div>
        </div>
      ) : (
        <FocusStats />
      )}
      
      <Navigation />
    </div>
  );
};

export default FocusModePage;