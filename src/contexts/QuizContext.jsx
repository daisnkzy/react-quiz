import { createContext, useReducer, useEffect, useContext } from 'react';

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

const QuizContext = createContext();
const QuizProvider = ({ children }) => {
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
    <QuizContext.Provider
      value={{
        questions,
        numQuestions,
        maxPoints,
        status,
        index,
        answer,
        points,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
function useQuiz() {
  const context = useContext(QuizContext);
  return context;
}
export { QuizProvider, useQuiz };
