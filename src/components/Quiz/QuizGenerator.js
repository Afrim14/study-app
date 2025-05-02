import React, { useState } from 'react';
import { useStudy } from '../../context/StudyContext';
import { useNavigate } from 'react-router-dom';

const QuizGenerator = ({ onStartQuiz, noteContent }) => {
  const { subjects } = useStudy();
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    subject: subjects.length > 0 ? subjects[0].id : '',
    difficulty: 'medium',
    questionCount: 5,
    // timeLimit: 0 // Time limit not used in AI generation for now
  });
  // Add state for instructions, loading, and error
  const [instructions, setInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Renamed and updated to call API
  const handleGenerateQuiz = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const body = {
      numQuestions: parseInt(settings.questionCount, 10),
      level: settings.difficulty,
      instructions: instructions,
      content: noteContent // Pass note content here if needed in the future
    };

    // *** ADD LOGGING HERE ***
    console.log('[QuizGenerator] Sending body to /api/generate-quiz:', body);

    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json(); // Always try to parse JSON
      console.log('Received data from /api/generate-quiz:', data);

      if (!response.ok) {
        // Use error message from API if available, otherwise generic error
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      if (!data.questions || !Array.isArray(data.questions)) {
         console.error("Invalid questions format received:", data);
         throw new Error('Received invalid question format from the server.');
      }
      
      console.log('Calling onStartQuiz with questions:', data.questions);
      onStartQuiz(data.questions); // Pass the generated questions array up

    } catch (err) {
      console.error("Failed to generate quiz:", err);
      setError(err.message || 'Failed to generate quiz. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      {/* Update form onSubmit handler */}
      <form onSubmit={handleGenerateQuiz} className="flex flex-col gap-4">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            How many questions do you want to generate?
          </label>
          <select
            name="questionCount"
            className="input"
            value={settings.questionCount}
            onChange={handleChange}
            disabled={isLoading} // Disable when loading
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
            disabled={isLoading} // Disable when loading
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
            placeholder="(Optional) Add specific instructions for the quiz questions"
            value={instructions} // Controlled component
            onChange={(e) => setInstructions(e.target.value)} // Update state
            disabled={isLoading} // Disable when loading
          ></textarea>
        </div>

        {/* Display error message if exists */}
        {error && (
          <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded mb-4 text-sm">
            <p>Error: {error}</p>
          </div>
        )}

        <div className="flex justify-between items-center">
          <button
            type="button"
            className="btn btn-outline"
            onClick={() => navigate('/notes')}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn"
            disabled={isLoading} // Disable while loading
          >
            {isLoading ? 'Generating...' : 'Generate'} {/* Change text while loading */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizGenerator;