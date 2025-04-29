import React from 'react';

const StudyStreak = ({ days }) => {
  return (
    <div className="card">
      <div className="flex items-center gap-4">
        <div className="flex items-center">
          <span className="text-accent text-lg">🔥</span>
        </div>
        <div className="flex flex-col">
          <p className="text-sm">You have kept it up for <span className="text-primary font-bold">{days}</span> days</p>
          <p className="text-sm text-light">Stay consistent!</p>
        </div>
      </div>
    </div>
  );
};

export default StudyStreak;