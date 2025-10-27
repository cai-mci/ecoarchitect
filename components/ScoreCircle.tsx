
import React from 'react';

// This component displays the sustainability score in a visually appealing circle.
// The color of the circle changes based on the score to give a quick visual cue.

interface ScoreCircleProps {
  score: number;
}

const ScoreCircle: React.FC<ScoreCircleProps> = ({ score }) => {
  // Determine the color of the circle based on the score value.
  const getColor = () => {
    if (score >= 75) return 'text-green-500'; // Good score
    if (score >= 40) return 'text-yellow-500'; // Medium score
    return 'text-red-500'; // Bad score
  };

  const colorClass = getColor();
  // Calculate the circumference for the SVG circle progress bar.
  const circumference = 2 * Math.PI * 45; // 45 is the radius
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50%"
          cy="50%"
        />
        <circle
          className={colorClass}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="45"
          cx="50%"
          cy="50%"
          style={{ transition: 'stroke-dashoffset 0.5s ease-in-out' }}
        />
      </svg>
      <div className={`absolute text-4xl font-extrabold ${colorClass}`}>
        {score}
      </div>
    </div>
  );
};

export default ScoreCircle;
