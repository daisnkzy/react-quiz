import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Ready from './Ready';
import Loader from './Loader';
import Questions from './Questions';
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
      return {
        ...state,
        answer: action.payload,
      };
    default:
      throw new Error('unknown action');
  }
}
const App = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { questions, status, index, answer } = state;
  const numQuestions = questions.length;

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
          <Questions
            question={questions[index]}
            answer={answer}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
