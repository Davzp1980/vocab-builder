import css from './DictionaryPage.module.css';
import Dashboard from '../../components/Dashboard/Dashboard';
import WordsTable from '../../components/WordsTable/WordsTable';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getWordsOwn } from '../../redux/dictionary/operations';

function DictionaryPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWordsOwn());
  }, [dispatch]);

  return (
    <div className={css.dictionaryContainer}>
      <Dashboard />
      <WordsTable />
    </div>
  );
}

export default DictionaryPage;
