import { useDispatch } from 'react-redux';
import css from './ActionsBtnModal.module.css';
import { deleteWord, getStatistic } from '../../redux/dictionary/operations';
import { setIsEditModalOpen } from '../../redux/dictionary/slice';

function ActionsBtnModal({ wordId, onClose }) {
  const dispatch = useDispatch();

  function wordEdit() {
    onClose();
    dispatch(setIsEditModalOpen(true));
  }

  function wordDelete(id) {
    dispatch(deleteWord(id));
    dispatch(getStatistic());
  }

  return (
    <div className={css.ActionsBtnModalContainer}>
      <button className={css.button} type="button" onClick={wordEdit}>
        <svg className={css.btnSvg}>
          <use href="/sprite.svg#pensil-color"></use>
        </svg>
        <p className={css.btnText}>Edit</p>
      </button>
      <button
        className={css.button}
        type="button"
        onClick={() => wordDelete(wordId)}
      >
        <svg className={css.btnSvg}>
          <use href="/sprite.svg#trash-color"></use>
        </svg>
        <p className={css.btnText}>Delete</p>
      </button>
    </div>
  );
}

export default ActionsBtnModal;
