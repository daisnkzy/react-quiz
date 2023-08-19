// import React from 'react';

import { useQuiz } from '../contexts/QuizContext';

const Finish = () => {
  const { numQuestions, index, points, dispatch } = useQuiz();

  return (
    <>
      <p className="result">
        你完成了{numQuestions}道题中的{index + 1}道。
      </p>
      <p className="highscore">
        你的得分为<strong>{points}</strong>分
      </p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'restart' })}
      >
        重新开始
      </button>
    </>
  );
};

export default Finish;

// const Finish = () => {
//   const { dispatch } = useQuiz();

//   return (
//     <div>
//       <button
//         className="btn btn-ui"
//         onClick={() => dispatch({ type: 'reset' })}
//       >
//         reset
//       </button>
//     </div>
//   );
// };

// export default Finish;
