import { useQuiz } from '../contexts/QuizContext';

const Ready = () => {
  const { numQuestions, dispatch } = useQuiz();
  return (
    <div className="start">
      <h2>欢迎来到React问答</h2>
      <h4>一共有{numQuestions}道题目等待练习。</h4>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: 'start' })}
      >
        开 始
      </button>
    </div>
  );
};

export default Ready;
