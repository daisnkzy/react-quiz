import React from 'react';
import { useQuiz } from '../contexts/QuizContext';

const NextButton = () => {
  const { dispatch, index, answer } = useQuiz();

  if (answer === null) return null;
  return (
    <>
      {index !== 14 ? (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: 'nextQuestion' })}
        >
          下一个
        </button>
      ) : (
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: 'finished' })}
        >
          结束
        </button>
      )}
    </>
  );
};

export default NextButton;
