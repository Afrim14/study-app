import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/common/Navigation';

const SummaryPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const noteContent = location.state?.noteContent || '';

  // State for summary, loading, and error
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch summary from the backend
    const fetchSummary = async () => {
      if (!noteContent) return; // Don't fetch if no content

      setIsLoading(true);
      setError(null);
      setSummary('');

      try {
        // *** IMPORTANT: Replace with your actual backend endpoint ***
        const response = await fetch('/api/generate-summary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content: noteContent }), // Send note content
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.summary) {
          setSummary(data.summary);
        } else {
          throw new Error('Summary not found in response');
        }

      } catch (err) {
        console.error("Failed to fetch summary:", err);
        setError('Failed to generate summary. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSummary(); // Call the fetch function when the component mounts or noteContent changes

  }, [noteContent]); // Dependency array ensures this runs when noteContent is available

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="page-title">Generated Summary</h1>
        <Link to="/notes" className="btn btn-outline">
           <i className="fas fa-arrow-left mr-2"></i>
          Back to Notes
        </Link>
      </div>

      <div className="card mb-4">
        <h2 className="text-lg font-semibold mb-2">Original Note Content:</h2>
        <p className="text-gray-700 whitespace-pre-wrap">{noteContent || "No content received."}</p>
      </div>

      <div className="card">
        <h2 className="text-lg font-semibold mb-2">AI Summary:</h2>
        {isLoading && (
          <div className="text-center py-4">
            <p className="text-gray-500">Generating summary...</p>
            {/* Optional: Add a spinner icon */}
          </div>
        )}
        {error && (
          <div className="text-center py-4 text-red-600">
            <p>{error}</p>
          </div>
        )}
        {!isLoading && !error && (
           <p className="text-gray-800 whitespace-pre-wrap">{summary || "No summary generated yet."}</p> 
        )}
      </div>

      <div className="mt-6 text-center">
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/quiz')}
        >
          <i className="fas fa-question-circle mr-2"></i>
          Go to Quiz
        </button>
      </div>

      <Navigation />
    </div>
  );
};

export default SummaryPage; 