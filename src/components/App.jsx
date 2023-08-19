import Header from './Header';
import Main from './Main';
import Ready from './Ready';
import Loader from './Loader';
import Questions from './Questions';
import NextButton from './NextButton';
import Progress from './Progress';
import Finish from './Finish';
import { useQuiz } from '../contexts/QuizContext';

const App = () => {
  const { status } = useQuiz();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && <Ready />}
        {status === 'start' && (
          <>
            <Progress />
            <Questions />
            <NextButton />
          </>
        )}
        {status === 'finished' && <Finish />}
      </Main>
    </div>
  );
};

export default App;
