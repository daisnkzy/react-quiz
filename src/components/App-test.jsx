import React, { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Error from './Error';
import Loader from './Loader';
import Ready from './Ready';
import Questions from './Questions';
import NextButton from './NextButton';
import Finish from './Finish';
import Progress from './Progress';
const initState = {
  index: 0,
  questions: [],
  status: 'loading',
  answer: null,
};
function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return { ...state, questions: action.payload, status: 'ready' };
    case 'dataFailed':
      return { ...state, status: 'error' };
    case 'start':
      return { ...state, status: 'start' };
    case 'newAnswer':
      return { ...state, answer: action.payload };
    case 'nextQuestion':
      return { ...state, index: state.index + 1, answer: null };
    case 'finished':
      return { ...state, status: 'finished' };
    case 'reset':
      return { ...initState, questions: state.questions, status: 'ready' };
    default:
      throw new Error('unknown action');
  }
}
const App = () => {
  const [state, dispatch] = useReducer(reducer, initState);
  const { index, questions, status, answer } = state;
  const numQuestions = questions.length;
  useEffect(function () {
    fetch('http://localhost:9000/questions')
      .then((res) => res.json())
      .then((data) => dispatch({ type: 'dataReceived', payload: data }))
      .catch((err) => dispatch({ type: 'dataFailed' }));
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
            <Progress numQuestions={numQuestions} index={index} />
            <Questions
              dispatch={dispatch}
              question={questions[index]}
              answer={answer}
            />
            <NextButton dispatch={dispatch} index={index} />
          </>
        )}
        {status === 'finished' && (
          <Finish
            numQuestions={numQuestions}
            dispatch={dispatch}
            index={index}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
