// import React from 'react';

// const Questions = ({ question, answer, dispatch }) => {
//   return (
//     <div>
//       <h4>{question.question}</h4>
//       <div className="options">
//         {question.options.map((option, index) => (
//           <button
//             className={`btn btn-option ${index === answer ? 'answer' : ''} ${
//               answer !== null
//                 ? index === question.correctOption
//                   ? 'correct'
//                   : 'wrong'
//                 : ''
//             }`}
//             key={option}
//             onClick={() => dispatch({ type: 'newAnswer', payload: index })}
//             disabled={answer !== null}
//           >
//             {option}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Questions;

import React from 'react';
import { useQuiz } from '../contexts/QuizContext';

const Questions = () => {
  const { dispatch, questions, answer, index } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? 'answer' : ''} ${
              answer !== null
                ? index === question.correctOption
                  ? 'correct'
                  : 'wrong'
                : ''
            }`}
            key={option}
            onClick={() => dispatch({ type: 'newAnswer', payload: index })}
            disabled={answer !== null}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questions;
