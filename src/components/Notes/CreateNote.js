import React, { useState, useEffect } from 'react';
import { useStudy } from '../../context/StudyContext';
import { useNavigate } from 'react-router-dom';

const CreateNote = ({ onClose, editNote }) => {
  const { subjects, addNote, updateNote } = useStudy();
  const navigate = useNavigate();
  const [note, setNote] = useState({
    title: '',
    content: '',
    subjectId: '',
    tags: []
  });
  const [newTag, setNewTag] = useState('');

  useEffect(() => {
    if (editNote) {
      setNote(editNote);
    } else if (subjects.length > 0) {
      setNote(prev => ({ ...prev, subjectId: subjects[0].id }));
    }
  }, [editNote, subjects]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (note.title.trim() && note.content.trim() && note.subjectId) {
      if (editNote) {
        updateNote(editNote.id, note);
      } else {
        addNote(note);
      }
      onClose();
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !note.tags.includes(newTag.trim())) {
      setNote({
        ...note,
        tags: [...note.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setNote({
      ...note,
      tags: note.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleGenerateSummary = () => {
    if (note.content.trim()) {
      navigate('/summary', { state: { noteContent: note.content } });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="page-title">Create a {editNote ? 'New' : 'New'} Note</h1>
        <button className="btn btn-outline" onClick={onClose}>
          <i className="fas fa-times mr-2"></i>
          Cancel
        </button>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="card">
          <input 
            type="text" 
            className="input mb-2" 
            placeholder="Note Title"
            value={note.title}
            onChange={(e) => setNote({...note, title: e.target.value})}
            required
          />
          
          <div className="flex items-center gap-2 mb-2">
            <i className="fas fa-bookmark text-primary"></i>
            <select 
              className="input" 
              value={note.subjectId}
              onChange={(e) => setNote({...note, subjectId: e.target.value})}
              required
            >
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>
                  {subject.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 mb-2">
            <i className="fas fa-tags text-primary"></i>
            <div className="flex flex-1 gap-2">
              <input 
                type="text" 
                className="input flex-1" 
                placeholder="Add tags"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
              />
              <button 
                type="button" 
                className="btn"
                onClick={handleAddTag}
              >
                Add
              </button>
            </div>
          </div>

          {note.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {note.tags.map(tag => (
                <div key={tag} className="bg-primary text-white rounded-full px-3 py-1 text-sm flex items-center">
                  {tag}
                  <button 
                    type="button"
                    className="ml-2"
                    onClick={() => handleRemoveTag(tag)}
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <textarea 
            className="input" 
            placeholder="Write your notes here..."
            rows="10"
            value={note.content}
            onChange={(e) => setNote({...note, content: e.target.value})}
            required
          ></textarea>

          <div className="mt-4">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleGenerateSummary}
              disabled={!note.content.trim()}
            >
              <i className="fas fa-wand-magic-sparkles mr-2"></i>
              Generate Summary
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <button 
            type="button" 
            className="btn btn-outline"
            onClick={onClose}
          >
            Cancel
          </button>
          <div className="flex gap-2">
            <button 
              type="button" 
              className="btn btn-outline"
            >
              Draft
            </button>
            <button 
              type="submit" 
              className="btn"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNote;