import React, { useState } from 'react';
import Navigation from '../components/common/Navigation';
import QuizGenerator from '../components/Quiz/QuizGenerator';
import QuizQuestion from '../components/Quiz/QuizQuestion';

const QuizPage = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleStartQuiz = (settings) => {
    // Generate questions based on settings
    // In a real app, this would fetch from an API or generate algorithmically
    const generatedQuestions = [
      {
        id: '1',
        question: 'How many patterns in the concept?',
        options: ['23', '21', '55', 'N/A'],
        correctAnswer: '21'
      },
      {
        id: '2',
        question: 'Which property allows CSS to create smooth transitions?',
        options: ['animation', 'transition', 'transform', 'opacity'],
        correctAnswer: 'transition'
      },
      {
        id: '3',
        question: 'What is the capital of France?',
        options: ['London', 'Berlin', 'Paris', 'Madrid'],
        correctAnswer: 'Paris'
      },
      {
        id: '4',
        question: 'Which of these is not a JavaScript framework?',
        options: ['React', 'Angular', 'Vue', 'Java'],
        correctAnswer: 'Java'
      },
      {
        id: '5',
        question: 'How many degrees are in a right angle?',
        options: ['45', '90', '180', '360'],
        correctAnswer: '90'
      }
    ];
    
    setQuestions(generatedQuestions);
    setQuizStarted(true);
    setCurrentQuestion(0);
    setAnswers(new Array(generatedQuestions.length).fill(null));
    setQuizFinished(false);
  };

  const handleAnswer = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answer;
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setQuestions([]);
    setAnswers([]);
    setQuizFinished(false);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="page-container">
      {!quizStarted ? (
        <>
          <h1 className="page-title">Quiz Generation</h1>
          <QuizGenerator onStartQuiz={handleStartQuiz} />
        </>
      ) : quizFinished ? (
        <div className="flex flex-col gap-4">
          <h1 className="page-title">Quiz Results</h1>
          <div className="card">
            <h2 className="text-lg font-medium mb-4">You scored {calculateScore()} out of {questions.length}</h2>
            
            <div className="mb-4">
              {questions.map((question, index) => (
                <div key={question.id} className="mb-2">
                  <p className="text-sm">
                    <span className={answers[index] === question.correctAnswer ? "text-green-500" : "text-red-500"}>
                      {answers[index] === question.correctAnswer ? "✓" : "✗"}
                    </span> {question.question}
                  </p>
                  <p className="text-sm text-light">
                    Your answer: <span className={answers[index] === question.correctAnswer ? "text-green-500" : "text-red-500"}>
                      {answers[index]}
                    </span>
                  </p>
                  {answers[index] !== question.correctAnswer && (
                    <p className="text-sm text-green-500">Correct answer: {question.correctAnswer}</p>
                  )}
                </div>
              ))}
            </div>
            
            <button 
              className="btn w-full"
              onClick={handleRestartQuiz}
            >
              Create New Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="page-title">Question {currentQuestion + 1}/{questions.length}</h1>
            <button 
              className="btn btn-outline"
              onClick={handleRestartQuiz}
            >
              Cancel Quiz
            </button>
          </div>
          <QuizQuestion 
            question={questions[currentQuestion]} 
            onAnswer={handleAnswer}
          />
        </div>
      )}
      <Navigation />
    </div>
  );
};

export default QuizPage;