import React, { useState, useEffect, useRef } from 'react';

const Timer = ({ duration, isRunning, onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [progress, setProgress] = useState(100);
  const timerRef = useRef(null);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            onComplete(duration);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning, duration, onComplete]);

  useEffect(() => {
    setProgress((timeLeft / duration) * 100);
  }, [timeLeft, duration]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const calculateStrokeDashoffset = () => {
    const circumference = 2 * Math.PI * 70; // 70 is the radius of the circle
    return circumference - (progress / 100) * circumference;
  };

  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div className="relative w-48 h-48 mb-4">
        <svg className="w-full h-full" viewBox="0 0 150 150">
          {/* Background circle */}
          <circle
            cx="75"
            cy="75"
            r="70"
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="10"
          />
          
          {/* Progress circle */}
          <circle
            cx="75"
            cy="75"
            r="70"
            fill="none"
            stroke={isRunning ? "#8462f4" : "#d1d5db"}
            strokeWidth="10"
            strokeDasharray={2 * Math.PI * 70}
            strokeDashoffset={calculateStrokeDashoffset()}
            strokeLinecap="round"
            transform="rotate(-90 75 75)"
          />
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-3xl font-bold">{formatTime(timeLeft)}</div>
        </div>
      </div>
    </div>
  );
};

export default Timer;