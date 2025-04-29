import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';

const NotesList = ({ notes, onEditNote }) => {
  const { subjects, deleteNote } = useStudy();
  const [filterSubject, setFilterSubject] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getSubjectName = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.name : 'Unknown Subject';
  };

  const getSubjectColor = (subjectId) => {
    const subject = subjects.find(s => s.id === subjectId);
    return subject ? subject.color : '#8462f4';
  };

  const filteredNotes = notes.filter(note => {
    // Filter by subject
    if (filterSubject !== 'all' && note.subjectId !== filterSubject) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !(
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )) {
      return false;
    }
    
    return true;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const handleDeleteNote = (e, noteId) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this note?')) {
      deleteNote(noteId);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="card">
        <div className="flex gap-2">
          <input
            type="text"
            className="input flex-1"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="input w-32"
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
          >
            <option value="all">All Subjects</option>
            {subjects.map(subject => (
              <option key={subject.id} value={subject.id}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="card flex flex-col items-center justify-center py-8">
          <i className="fas fa-book text-4xl text-light mb-4"></i>
          <p className="text-light">No notes found</p>
          <p className="text-light text-sm">Create a new note to get started</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredNotes.map(note => (
            <div 
              key={note.id}
              className="card cursor-pointer hover:shadow-md transition-shadow"
              style={{ borderLeft: `4px solid ${getSubjectColor(note.subjectId)}` }}
              onClick={() => onEditNote(note)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{note.title}</h3>
                <button 
                  className="text-light hover:text-primary"
                  onClick={(e) => handleDeleteNote(e, note.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
              
              <p className="text-sm text-light mb-2">{getSubjectName(note.subjectId)}</p>
              
              <p className="text-sm mb-4 line-clamp-2">
                {note.content.length > 100 
                  ? `${note.content.substring(0, 100)}...` 
                  : note.content}
              </p>
              
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap gap-1">
                  {note.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag} 
                      className="bg-primary bg-opacity-10 text-primary rounded-full px-2 py-0.5 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {note.tags.length > 3 && (
                    <span className="text-light text-xs">+{note.tags.length - 3} more</span>
                  )}
                </div>
                
                <span className="text-light text-xs">
                  {formatDate(note.createdAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotesList;