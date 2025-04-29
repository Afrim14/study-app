import React from 'react';
import { Link } from 'react-router-dom';

const StudyOptions = () => {
  const options = [
    {
      id: 'upload-notes',
      title: 'Upload Notes',
      icon: '📄',
      link: '/notes',
      color: '#FBD38D'
    },
    {
      id: 'study-timer',
      title: 'Study Timer',
      icon: '⏱️',
      link: '/focus',
      color: '#90CDF4'
    },
    {
      id: 'study-analysis',
      title: 'Study Analysis',
      icon: '📊',
      link: '/admin',
      color: '#D6BCFA'
    }
  ];

  return (
    <div className="flex flex-col gap-2">
      {options.map(option => (
        <Link to={option.link} key={option.id}>
          <div className="card" style={{ backgroundColor: option.color + '20', borderLeft: `4px solid ${option.color}` }}>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-full" style={{ backgroundColor: option.color }}>
                <span>{option.icon}</span>
              </div>
              <div>
                <h3 className="font-medium">{option.title}</h3>
                <p className="text-sm text-light">0 items</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default StudyOptions;