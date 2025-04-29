import React, { createContext, useState, useEffect, useContext } from 'react';

const StudyContext = createContext(null);

export const useStudy = () => useContext(StudyContext);

export const StudyProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [notes, setNotes] = useState([]);
  const [lectures, setLectures] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [studyStreak, setStudyStreak] = useState(0);
  const [studyHistory, setStudyHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from localStorage on initial render
  useEffect(() => {
    const loadData = () => {
      const storedSubjects = localStorage.getItem('subjects');
      const storedNotes = localStorage.getItem('notes');
      const storedLectures = localStorage.getItem('lectures');
      const storedQuizzes = localStorage.getItem('quizzes');
      const storedStreak = localStorage.getItem('studyStreak');
      const storedHistory = localStorage.getItem('studyHistory');

      if (storedSubjects) setSubjects(JSON.parse(storedSubjects));
      if (storedNotes) setNotes(JSON.parse(storedNotes));
      if (storedLectures) setLectures(JSON.parse(storedLectures));
      if (storedQuizzes) setQuizzes(JSON.parse(storedQuizzes));
      if (storedStreak) setStudyStreak(parseInt(storedStreak));
      if (storedHistory) setStudyHistory(JSON.parse(storedHistory));

      // Initialize with sample data if nothing exists
      if (!storedSubjects) {
        const initialSubjects = [
          { id: '1', name: 'Mathematics', color: '#FF6B6B' },
          { id: '2', name: 'Science', color: '#4ECDC4' },
          { id: '3', name: 'History', color: '#FFD166' },
          { id: '4', name: 'English', color: '#6A0572' }
        ];
        setSubjects(initialSubjects);
        localStorage.setItem('subjects', JSON.stringify(initialSubjects));
      }

      setLoading(false);
    };

    loadData();
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('subjects', JSON.stringify(subjects));
      localStorage.setItem('notes', JSON.stringify(notes));
      localStorage.setItem('lectures', JSON.stringify(lectures));
      localStorage.setItem('quizzes', JSON.stringify(quizzes));
      localStorage.setItem('studyStreak', studyStreak.toString());
      localStorage.setItem('studyHistory', JSON.stringify(studyHistory));
    }
  }, [subjects, notes, lectures, quizzes, studyStreak, studyHistory, loading]);

  // Function to add a new subject
  const addSubject = (subject) => {
    const newSubject = {
      id: Date.now().toString(),
      ...subject
    };
    setSubjects([...subjects, newSubject]);
    return newSubject;
  };

  // Function to add a new note
  const addNote = (note) => {
    const newNote = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...note
    };
    setNotes([...notes, newNote]);
    return newNote;
  };

  // Function to update an existing note
  const updateNote = (id, updatedData) => {
    const updatedNotes = notes.map(note => 
      note.id === id ? { ...note, ...updatedData, updatedAt: new Date().toISOString() } : note
    );
    setNotes(updatedNotes);
  };

  // Function to delete a note
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Function to add a study session
  const addStudySession = (session) => {
    const today = new Date().toISOString().split('T')[0];
    const lastStudyDay = studyHistory.length > 0 
      ? new Date(studyHistory[studyHistory.length - 1].date).toISOString().split('T')[0]
      : null;
    
    // Check if the streak should continue or reset
    let newStreak = studyStreak;
    if (!lastStudyDay) {
      newStreak = 1;
    } else if (lastStudyDay === today) {
      // Already studied today, just update the duration
      const updatedHistory = [...studyHistory];
      const todaySession = updatedHistory[updatedHistory.length - 1];
      todaySession.duration += session.duration;
      setStudyHistory(updatedHistory);
      return;
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      if (lastStudyDay === yesterdayStr) {
        newStreak += 1;
      } else {
        newStreak = 1;
      }
    }
    
    setStudyStreak(newStreak);
    setStudyHistory([...studyHistory, { ...session, date: today }]);
  };

  // Function to add a new quiz
  const addQuiz = (quiz) => {
    const newQuiz = {
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      ...quiz
    };
    setQuizzes([...quizzes, newQuiz]);
    return newQuiz;
  };

  const value = {
    subjects,
    notes,
    lectures,
    quizzes,
    studyStreak,
    studyHistory,
    loading,
    addSubject,
    addNote,
    updateNote,
    deleteNote,
    addStudySession,
    addQuiz
  };

  return (
    <StudyContext.Provider value={value}>
      {!loading && children}
    </StudyContext.Provider>
  );
};