import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';

const QuizGenerator = ({ onStartQuiz }) => {
  const { subjects } = useStudy();
  const [settings, setSettings] = useState({
    subject: subjects.length > 0 ? subjects[0].id : '',
    difficulty: 'medium',
    questionCount: 5,
    timeLimit: 0 // 0 means no time limit
  });

  const difficulties = [
    { value: 'easy', label: 'Easy' },
    { value: 'medium', label: 'Medium' },
    { value: 'hard', label: 'Hard' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings({
      ...settings,
      [name]: value
    });
  };

  const handleStartQuiz = (e) => {
    e.preventDefault();
    onStartQuiz(settings);
  };

  return (
    <div className="card">
      <form onSubmit={handleStartQuiz} className="flex flex-col gap-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            How many questions do you want to generate?
          </label>
          <select
            name="questionCount"
            className="input"
            value={settings.questionCount}
            onChange={handleChange}
          >
            <option value="5">5 Questions</option>
            <option value="10">10 Questions</option>
            <option value="15">15 Questions</option>
            <option value="20">20 Questions</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Select Level
          </label>
          <select
            name="difficulty"
            className="input"
            value={settings.difficulty}
            onChange={handleChange}
          >
            {difficulties.map(difficulty => (
              <option key={difficulty.value} value={difficulty.value}>
                {difficulty.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Add instruction. Focus more, your goals:
          </label>
          <textarea
            name="instructions"
            className="input"
            rows="3"
            placeholder="Add specific instructions for the quiz"
          ></textarea>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn"
          >
            Generate
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizGenerator;