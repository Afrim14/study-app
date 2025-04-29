import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';

const SubjectSelection = () => {
  const { subjects, addSubject } = useStudy();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSubject, setNewSubject] = useState({ name: '', color: '#8462f4' });

  const handleAddSubject = (e) => {
    e.preventDefault();
    if (newSubject.name.trim()) {
      addSubject(newSubject);
      setNewSubject({ name: '', color: '#8462f4' });
      setShowAddForm(false);
    }
  };

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">How are you going to <span className="text-primary">study</span> today?</h2>
        {!showAddForm && (
          <button 
            onClick={() => setShowAddForm(true)}
            className="btn btn-outline text-sm"
          >
            Add Subject
          </button>
        )}
      </div>

      {showAddForm ? (
        <form onSubmit={handleAddSubject} className="mb-4">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              className="input"
              placeholder="Subject Name"
              value={newSubject.name}
              onChange={(e) => setNewSubject({...newSubject, name: e.target.value})}
            />
            <input
              type="color"
              value={newSubject.color}
              onChange={(e) => setNewSubject({...newSubject, color: e.target.value})}
              className="cursor-pointer"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="btn">Add</button>
            <button 
              type="button" 
              className="btn btn-outline"
              onClick={() => setShowAddForm(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {subjects.map(subject => (
            <div 
              key={subject.id} 
              className="card" 
              style={{borderLeft: `4px solid ${subject.color}`}}
            >
              <h3 className="font-medium">{subject.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubjectSelection;