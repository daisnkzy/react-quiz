import React from 'react';
import { useQuiz } from '../contexts/QuizContext';

const Progress = () => {
  const { numQuestions, index, points, maxPoints } = useQuiz();

  return (
    <div className="progress">
      <progress max={numQuestions} value={index + 1} />
      <p>
        {index + 1}/{numQuestions}
      </p>
      <p>
        {points}/{maxPoints}
      </p>
    </div>
  );
};

export default Progress;
