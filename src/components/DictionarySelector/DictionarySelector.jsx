import { useDispatch, useSelector } from 'react-redux';
import css from './DictionarySelector.module.css';

import { selectWordsCategories } from '../../redux/dictionary/selectors';
import {
  setIsOpenSelect,
  setSelectedWordCategory,
} from '../../redux/dictionary/slice';

function DictionarySelector() {
  const dispatch = useDispatch();

  const wordsCategories = useSelector(selectWordsCategories);

  function handleClick(category) {
    dispatch(setSelectedWordCategory(category));
    dispatch(setIsOpenSelect(false));
  }

  return (
    <div>
      <ul className={css.selectorContainer}>
        {wordsCategories.map((category, index) => (
          <li
            className={css.selectorLi}
            key={index}
            onClick={() => handleClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DictionarySelector;
