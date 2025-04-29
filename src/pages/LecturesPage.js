import React, { useState } from 'react';
import Navigation from '../components/common/Navigation';
import LectureView from '../components/Lectures/LectureView';
import LecturesList from '../components/Lectures/LecturesList';

const LecturesPage = () => {
  const [selectedLecture, setSelectedLecture] = useState(null);

  const handleBackToList = () => {
    setSelectedLecture(null);
  };

  return (
    <div className="page-container">
      {selectedLecture ? (
        <LectureView 
          lecture={selectedLecture} 
          onBack={handleBackToList} 
        />
      ) : (
        <>
          <h1 className="page-title">Lectures</h1>
          <LecturesList onSelectLecture={setSelectedLecture} />
        </>
      )}
      <Navigation />
    </div>
  );
};

export default LecturesPage;