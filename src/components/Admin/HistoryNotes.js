import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';

const HistoryNotes = () => {
  const { notes } = useStudy();
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Sort notes by date (newest first)
  const sortedNotes = [...notes].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
  
  // Filter notes based on selected category
  const filteredNotes = selectedCategory === 'all' 
    ? sortedNotes 
    : sortedNotes.filter(note => note.subjectId === selectedCategory);
  
  // Group notes by month
  const groupedNotes = filteredNotes.reduce((groups, note) => {
    const date = new Date(note.createdAt);
    const monthYear = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    
    if (!groups[monthYear]) {
      groups[monthYear] = [];
    }
    
    groups[monthYear].push(note);
    return groups;
  }, {});
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      day: 'numeric',
      month: 'short'
    });
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">History Notes</h2>
        <select
          className="input w-40"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="favorites">Favorites</option>
          <option value="archived">Archived</option>
        </select>
      </div>
      
      {Object.keys(groupedNotes).length === 0 ? (
        <div className="text-center text-light py-8">
          No notes found
        </div>
      ) : (
        Object.entries(groupedNotes).map(([monthYear, monthNotes]) => (
          <div key={monthYear} className="mb-6">
            <h3 className="text-sm font-medium mb-2">{monthYear}</h3>
            <div className="grid grid-cols-3 gap-4">
              {monthNotes.map(note => (
                <div 
                  key={note.id}
                  className="bg-gray-50 rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="w-full h-24 flex items-center justify-center bg-gray-200">
                    <i className="fas fa-play-circle text-3xl text-gray-400"></i>
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm truncate">{note.title}</h4>
                    <p className="text-xs text-light mt-1">{formatDate(note.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default HistoryNotes;