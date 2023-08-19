import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Ready from './Ready';
import Loader from './Loader';
import Questions from './Questions';
import NextButton from './NextButton';
import Progress from './Progress';
import Finish from './Finish';

const initState = {
  status: 'loading',
  index: 0,
  questions: [],
  answer: null,
  points: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, status: 'ready', questions: action.payload };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return { ...state, status: 'start' };
    case 'newAnswer':
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finished':
      return { ...state, status: 'finished' };
    case 'restart':
      return { ...initState, status: 'ready', questions: state.questions };
    default:
      throw new Error('unknown action');
  }
}
const App = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { questions, status, index, answer, points } = state;
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);
  useEffect(function () {
    fetch('http://localhost:9000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'error' }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <Ready numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === 'start' && (
          <>
            <Progress
              numQuestions={numQuestions}
              index={index}
              points={points}
              maxPoints={maxPoints}
            />
            <Questions
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <NextButton dispatch={dispatch} answer={answer} index={index} />
          </>
        )}
        {status === 'finished' && (
          <Finish
            numQuestions={numQuestions}
            index={index}
            points={points}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
