import css from './EditWordModal.module.css';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';
import { setIsEditModalOpen } from '../../redux/dictionary/slice';
import { useEffect, useState } from 'react';
import { editWord, getWordsOwn } from '../../redux/dictionary/operations';
import toast from 'react-hot-toast';

function EditWordModal({ wordId, words }) {
  const dispatch = useDispatch();

  //   const wordForEdit = useSelector(selectEditWord);

  let isVerb = false;

  function onClickCloseBtn() {
    dispatch(setIsEditModalOpen(false));
  }

  const word = words.find(word => word._id === wordId);

  const [wordForEdit, setWordForEdit] = useState({});

  useEffect(() => {
    setWordForEdit(word);
  }, [setWordForEdit, word]);

  const ValidationSchema = yup.object().shape({
    ua: yup
      .string()
      .matches(
        /^(?![A-Za-z])[А-ЯІЄЇҐґа-яієїʼ\s]+$/u,
        'Повінні бути тільки Українскі літери'
      )
      .required('Must be filled in'),

    en: yup
      .string()
      .matches(/^[A-Za-z]+$/, 'Only English letters should be used')
      .required(),
  });

  const defaultValues = {
    en: word.en,
    ua: word.ua,
  };

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm({ resolver: yupResolver(ValidationSchema), defaultValues });

  function submitEditForm(data) {
    if (wordForEdit.category === 'verb') {
      isVerb = true;
    }

    dispatch(
      editWord({
        _id: wordId,
        en: data.en,
        ua: data.ua,
        category: wordForEdit.category,
        ...(isVerb ? { isIrregular: word.isIrregular } : {}),
      })
    )
      .unwrap()
      .then(() => {
        dispatch(getWordsOwn());
        dispatch(setIsEditModalOpen(false));
        toast.success('Word edited successful');
      })
      .catch(() => {
        toast.error('Word edit error');
      });
  }
  return (
    <div className={css.editWordModalMainContainer}>
      <div className={css.editWordModalContainer}>
        <form className={css.form} onSubmit={handleSubmit(submitEditForm)}>
          <div className={clsx(css.inputDiv, css.input1Bottom)}>
            <label>
              <div className={css.langDiv}>
                <svg className={css.langSvg}>
                  <use href="/sprite.svg#ukraine"></use>
                </svg>
                <p className={css.langText}>Ukrainian</p>
              </div>
              <input className={css.input} type="text" {...register('ua')} />
              {errors.ua && (
                <span className={css.errorSpan}>{errors.ua.message}</span>
              )}
            </label>
          </div>

          <div className={clsx(css.inputDiv, css.input2Bottom)}>
            <label>
              <div className={css.langDiv}>
                <svg className={css.langSvg}>
                  <use href="/sprite.svg#united-kingdom"></use>
                </svg>
                <p className={css.langText}>Ukrainian</p>
              </div>
              <input className={css.input} type="text" {...register('en')} />
              {errors.en && (
                <span className={css.errorSpan}>{errors.en.message}</span>
              )}
            </label>
          </div>

          <div className={css.btnDiv}>
            <button className={css.saveBtn} type="submit">
              Save
            </button>
            <button
              className={css.cancelBtn}
              type="button"
              onClick={onClickCloseBtn}
            >
              Cancel
            </button>
          </div>
        </form>
        <button
          className={css.closeBtn}
          type="button"
          onClick={onClickCloseBtn}
        >
          <svg className={css.closeSvg}>
            <use href="/sprite.svg#x-close"></use>
          </svg>
        </button>
      </div>
    </div>
  );
}

export default EditWordModal;
