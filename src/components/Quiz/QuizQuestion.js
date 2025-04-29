import React, { useState } from 'react';

const QuizQuestion = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      onAnswer(selectedOption);
      setSelectedOption(null);
    }
  };

  return (
    <div className="card">
      <h2 className="text-lg font-medium mb-4">{question.question}</h2>
      
      <div className="flex flex-col gap-2 mb-4">
        {question.options.map((option, index) => (
          <div 
            key={index}
            className={`p-3 rounded-lg border cursor-pointer transition-all ${
              selectedOption === option 
                ? 'border-primary bg-primary bg-opacity-5' 
                : 'border-gray-200 hover:border-primary'
            }`}
            onClick={() => handleOptionClick(option)}
          >
            <div className="flex items-center">
              <div 
                className={`w-6 h-6 flex items-center justify-center rounded-full mr-3 ${
                  selectedOption === option 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {String.fromCharCode(65 + index)}
              </div>
              <span>{option}</span>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        className={`btn w-full ${!selectedOption ? 'opacity-50 cursor-not-allowed' : ''}`}
        onClick={handleSubmit}
        disabled={!selectedOption}
      >
        Submit Answer
      </button>
    </div>
  );
};

export default QuizQuestion;