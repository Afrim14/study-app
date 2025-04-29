import React from 'react';
import Navigation from '../components/common/Navigation';
import SubjectSelection from '../components/Dashboard/SubjectSelection';
import StudyStreak from '../components/Dashboard/StudyStreak';
import StudyOptions from '../components/Dashboard/StudyOptions';
import { useStudy } from '../context/StudyContext';

const HomePage = () => {
  const { studyStreak } = useStudy();

  return (
    <div className="page-container">
      <div className="flex flex-col gap-4">
        <h1 className="page-title">Subject Selection</h1>
        
        <SubjectSelection />
        
        <StudyStreak days={studyStreak} />
        
        <StudyOptions />
      </div>
      
      <Navigation />
    </div>
  );
};

export default HomePage;