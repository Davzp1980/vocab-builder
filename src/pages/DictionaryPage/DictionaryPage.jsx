import css from './DictionaryPage.module.css';
import Dashboard from '../../components/Dashboard/Dashboard';
import WordsTable from '../../components/WordsTable/WordsTable';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWordsOwn } from '../../redux/dictionary/operations';
import { selectFilters } from '../../redux/dictionary/selectors';
import { setFiltersReset } from '../../redux/dictionary/slice';
import WordsPagination from '../../components/WordsPagination/WordsPagination';

function DictionaryPage() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);

  useEffect(() => {
    dispatch(setFiltersReset());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getWordsOwn({ ...filters }));
  }, [dispatch, filters]);

  return (
    <div className={css.dictionaryContainer}>
      <Dashboard />
      <WordsTable />
      <WordsPagination />
    </div>
  );
}

export default DictionaryPage;
