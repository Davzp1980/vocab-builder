import css from './ModalAddWord.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import {
  selectIsOpenSelect,
  selectWordCategory,
} from '../../redux/dictionary/selectors';
import {
  setIsAddWordModalOpen,
  setIsOpenSelect,
} from '../../redux/dictionary/slice';
import clsx from 'clsx';
import DictionarySelector from '../DictionarySelector/DictionarySelector';
import {
  addNewWord,
  getStatistic,
  getWordsOwn,
} from '../../redux/dictionary/operations';
import toast from 'react-hot-toast';

function ModalAddWord() {
  const dispatch = useDispatch();
  const [rotate, setRotate] = useState(false);

  const isOpenSelect = useSelector(selectIsOpenSelect);
  const selectedCategory = useSelector(selectWordCategory);

  function onClickSelect() {
    setRotate(prev => !prev);

    dispatch(setIsOpenSelect(true));
  }

  function onClickCloseBtn() {
    dispatch(setIsAddWordModalOpen(false));
  }

  function onClickCancelBtn() {
    dispatch(setIsAddWordModalOpen(false));
  }

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        dispatch(setIsAddWordModalOpen(false));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [dispatch]);

  const ValidationSchema = yup.object().shape({
    selector: yup.string().required(),
    category: yup.string().required('Please select an option'),
    ukrainian: yup
      .string()
      .required('Має бути заповнено')
      .matches(
        /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
        'Cлово має бути Українською'
      ),
    english: yup
      .string()
      .required('Must be filled in')
      .matches(/\b[A-Za-z'-]+(?:\s+[A-Za-z'-]+)*\b/, 'Word must be in English'),
  });

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ValidationSchema),
    defaultValues: { category: 'Regular' },
  });

  const selected = watch('category');

  useEffect(() => {
    if (selectedCategory) {
      setValue('selector', selectedCategory);
    }
  }, [selectedCategory, setValue]);

  let isVerb = false;

  function onSubmit(data) {
    const isReg = data.category === 'Regular' ? true : false;
    if (data.selector === 'verb') {
      isVerb = true;
    }

    function englishWord(category, word) {
      if (category === 'Regular') {
        if (word.split(' ').length > 1) {
          toast.error('Виберіть Irregular');
          return;
        }

        return `${word}-${word}-${word}`.toLowerCase();
      } else {
        const arr = word.split(' ');

        return `${arr[0]}-${arr[1]}-${arr[2]}`.toLowerCase();
      }
    }

    dispatch(
      addNewWord({
        en: isVerb
          ? englishWord(data.category, data.english)
          : data.english.toLowerCase(),
        ua: data.ukrainian.toLowerCase().trim(),
        category: data.selector,
        ...(isVerb ? { isIrregular: isReg } : {}),
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getWordsOwn());
        dispatch(getStatistic());
        toast.success('Word added successful');
      })
      .catch(() => {
        toast.error('Word add error');
      });

    reset();
    dispatch(setIsAddWordModalOpen(false));
  }

  return (
    <div className={css.addWordMainContainer}>
      <h2 className={css.addWordH2}>Add word</h2>
      <p className={css.addWordP}>
        Adding a new word to the dictionary is an important step in enriching
        the language base and expanding the vocabulary.
      </p>
      <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={clsx(css.inputContainer, css.inputCategories)}>
          <input
            value={selectedCategory}
            className={clsx(css.input)}
            type="text"
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
          {selectedCategory === 'verb' ? (
            <div className={css.radioBtnDiv}>
              <label className={css.radioLabel}>
                {selected === 'Regular' ? (
                  <svg className={css.radioSvg}>
                    <use href="/sprite.svg#Radio-on-addword"></use>
                  </svg>
                ) : (
                  <svg className={css.radioSvg}>
                    <use href="/sprite.svg#Radio-off-addword"></use>
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
                    <use href="/sprite.svg#Radio-on-addword"></use>
                  </svg>
                ) : (
                  <svg className={css.radioSvg}>
                    <use href="/sprite.svg#Radio-off-addword"></use>
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
          {isOpenSelect && <DictionarySelector />}
        </div>
        <div>
          <div className={css.ukrContainer}>
            <label>
              <div className={css.languageDiv}>
                <svg className={css.languageSvg}>
                  <use href="/sprite.svg#ukraine"></use>
                </svg>
                <p className={css.ukraineP}>Ukrainian</p>
              </div>

              <input
                className={clsx(css.input)}
                type="text"
                name="ukrainian"
                {...register('ukrainian')}
              />
              {errors.ukrainian && (
                <span className={css.errorSpan}>
                  {errors.ukrainian.message}
                </span>
              )}
            </label>
          </div>

          <div className={css.engContainer}>
            <label>
              <div className={css.languageDiv}>
                <svg className={css.languageSvg}>
                  <use href="/sprite.svg#united-kingdom"></use>
                </svg>
                <p className={css.ukraineP}>English</p>
              </div>
              <input
                className={clsx(css.input)}
                type="text"
                name="english"
                {...register('english')}
              />
              {errors.english && (
                <span className={css.errorSpan}>{errors.english.message}</span>
              )}
            </label>
          </div>

          <div className={css.submitBtnDiv}>
            <button className={css.addBtn} type="submit">
              Add
            </button>
            <button
              className={css.cancelBtn}
              type="button"
              onClick={onClickCancelBtn}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <button className={css.closeBtn} type="button" onClick={onClickCloseBtn}>
        <svg className={css.closeBtnSvg}>
          <use href="/sprite.svg#x-close"></use>
        </svg>
      </button>
    </div>
  );
}

export default ModalAddWord;
