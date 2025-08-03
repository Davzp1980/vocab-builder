import css from './Dashboard.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import DictionarySelector from '../../components/DictionarySelector/DictionarySelector';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsAddWordModalOpen,
  selectIsOpenSelect,
  selectStatistic,
  selectWordCategory,
} from '../../redux/dictionary/selectors';
import {
  setIsAddWordModalOpen,
  setIsOpenSelect,
} from '../../redux/dictionary/slice';
import { useEffect, useState } from 'react';
import { getStatistic } from '../../redux/dictionary/operations';
import ModalAddWord from '../ModalAddWord/ModalAddWord';
import { getWordsOwn } from '../../redux/dictionary/operations';

function Dashboard() {
  const dispatch = useDispatch();
  const [rotate, setRotate] = useState(false);
  const [openCategoryList, setOpenCategoryList] = useState(true);

  const isOpenSelect = useSelector(selectIsOpenSelect);

  const selectedCategory = useSelector(selectWordCategory);
  const statistic = useSelector(selectStatistic);

  const isAddWordModalOpen = useSelector(selectIsAddWordModalOpen);

  useEffect(() => {
    dispatch(getStatistic());
  }, [dispatch]);

  function onClickSelect() {
    setRotate(prev => !prev);
    setOpenCategoryList(prev => !prev);

    dispatch(setIsOpenSelect(openCategoryList));
  }

  const ValidationSchema = yup.object().shape({
    word: yup.string().required('Must be filled in'),
    selector: yup.string().required(),
    category: yup.string().required('Please select an option'),
  });

  const { register, reset, watch } = useForm({
    resolver: yupResolver(ValidationSchema),
    defaultValues: { category: 'Regular' },
  });

  const selected = watch('category');
  const word = watch('word');

  let isVerb = false;

  useEffect(() => {
    const isReg = selected === 'Regular' ? true : false;
    if (selectedCategory === 'verb') {
      isVerb = true;
    }
    if (!word) return;
    const timer = setTimeout(() => {
      dispatch(
        getWordsOwn({
          keyword: word.trim(),
          category: selectedCategory,
          ...(isVerb ? { isIrregular: isReg } : {}),
        })
      );
      // console.log('VerbType-', selected);
      // console.log('word-', word);
      // console.log('category-', selectedCategory);
      reset();
    }, 900);

    return () => {
      clearTimeout(timer);
    };
  }, [word, reset]);

  function addWord() {
    dispatch(setIsAddWordModalOpen(true));
  }

  function train() {
    console.log('Train');
  }

  return (
    <div className={css.dictionaryContainer}>
      <form className={css.form}>
        <div className={css.inputContainer}>
          <input
            className={css.input}
            type="text"
            placeholder="Find the word"
            {...register('word')}
          />
          <svg className={css.searchSvg}>
            <use href="/sprite.svg#search"></use>
          </svg>
        </div>
        <div className={css.inputContainer}>
          <input
            value={selectedCategory}
            className={css.input}
            type="text"
            name="selector"
            placeholder="Categories"
            {...register('selector')}
            onClick={onClickSelect}
          />
          <svg
            className={clsx(css.searchSvg, rotate && css.searchSvgRotate)}
            onClick={onClickSelect}
          >
            <use href="/sprite.svg#down-select"></use>
          </svg>
        </div>
        {isOpenSelect && <DictionarySelector />}

        {selectedCategory === 'verb' ? (
          <div className={css.radioBtnDiv}>
            <label className={css.radioLabel}>
              {selected === 'Regular' ? (
                <svg className={css.radioSvg}>
                  <use href="/sprite.svg#radio-on"></use>
                </svg>
              ) : (
                <svg className={css.radioSvg}>
                  <use href="/sprite.svg#radio-off"></use>
                </svg>
              )}
              <input
                className={css.radio}
                type="radio"
                name="category"
                value="Regular"
                checked={selected === 'Regular'}
                {...register('category')}
              />
              Regular
            </label>

            <label className={css.radioLabel}>
              {selected === 'Irregular' ? (
                <svg className={css.radioSvg}>
                  <use href="/public/sprite.svg#radio-on"></use>
                </svg>
              ) : (
                <svg className={css.radioSvg}>
                  <use href="/public/sprite.svg#radio-off"></use>
                </svg>
              )}
              <input
                className={css.radio}
                type="radio"
                name="category"
                value="Irregular"
                checked={selected === 'Irregular'}
                {...register('category')}
              />
              Irregular
            </label>
          </div>
        ) : (
          ''
        )}
      </form>
      <p className={css.toStudyP}>
        To study:
        <span className={css.spanStatistic}>{statistic?.totalCount}</span>
      </p>
      <div className={css.addWordContainer}>
        <button className={css.addWordTrainBtn} type="button" onClick={addWord}>
          Add word{' '}
          <svg className={css.svgBtn}>
            <use href="/sprite.svg#plus"></use>
          </svg>
        </button>

        <button className={css.addWordTrainBtn} type="button" onClick={train}>
          Train oneself{' '}
          <svg className={css.svgBtn}>
            <use href="/arrow-right.svg"></use>
          </svg>
        </button>
      </div>
      {isAddWordModalOpen && <ModalAddWord />}
    </div>
  );
}

export default Dashboard;
