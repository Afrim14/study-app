import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

// Pages
import HomePage from './pages/HomePage';
import NotesPage from './pages/NotesPage';
import LecturesPage from './pages/LecturesPage';
import QuizPage from './pages/QuizPage';
import FocusModePage from './pages/FocusModePage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/lectures" element={<LecturesPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/focus" element={<FocusModePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;