import React from 'react';

const LecturesList = ({ onSelectLecture }) => {
  // Sample lecture data - in a real app, this would come from the context or API
  const lectures = [
    {
      id: '1',
      title: 'Human Evolution',
      subject: 'Biology',
      thumbnail: '/api/placeholder/400/200',
      description: 'An overview of human evolutionary history and key developments.',
      duration: '45 minutes',
      instructor: 'Dr. Sarah Chen'
    },
    {
      id: '2',
      title: 'Introduction to Statistics',
      subject: 'Mathematics',
      thumbnail: '/api/placeholder/400/200',
      description: 'Learn the fundamentals of statistics and probability.',
      duration: '38 minutes',
      instructor: 'Prof. Michael Lin'
    },
    {
      id: '3',
      title: 'Ancient Civilizations',
      subject: 'History',
      thumbnail: '/api/placeholder/400/200',
      description: 'Explore the rise and fall of ancient societies and their legacies.',
      duration: '52 minutes',
      instructor: 'Dr. James Roberts'
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <div className="card">
        <input 
          type="text" 
          className="input" 
          placeholder="Search lectures..." 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {lectures.map(lecture => (
          <div 
            key={lecture.id} 
            className="card cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onSelectLecture(lecture)}
          >
            <img 
              src={lecture.thumbnail} 
              alt={lecture.title} 
              className="w-full h-32 object-cover rounded-lg mb-2"
            />
            <h3 className="font-medium">{lecture.title}</h3>
            <p className="text-sm text-light mb-2">{lecture.subject} | {lecture.duration}</p>
            <p className="text-sm mb-2 line-clamp-2">{lecture.description}</p>
            <p className="text-sm text-primary">{lecture.instructor}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LecturesList;