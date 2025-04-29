import React, { useState } from 'react';
import Navigation from '../components/common/Navigation';
import CreateNote from '../components/Notes/CreateNote';
import NotesList from '../components/Notes/NotesList';
import { useStudy } from '../context/StudyContext';

const NotesPage = () => {
  const { notes } = useStudy();
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsCreating(true);
  };

  const handleCloseCreate = () => {
    setIsCreating(false);
    setEditingNote(null);
  };

  return (
    <div className="page-container">
      {isCreating ? (
        <CreateNote 
          onClose={handleCloseCreate}
          editNote={editingNote}
        />
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h1 className="page-title">Create Notes</h1>
            <button 
              className="btn"
              onClick={() => setIsCreating(true)}
            >
              <i className="fas fa-plus mr-2"></i>
              New Note
            </button>
          </div>
          <NotesList 
            notes={notes}
            onEditNote={handleEditNote}
          />
        </>
      )}
      <Navigation />
    </div>
  );
};

export default NotesPage;