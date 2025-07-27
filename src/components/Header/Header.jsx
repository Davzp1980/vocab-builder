import { useDispatch, useSelector } from 'react-redux';
import css from './Header.module.css';
import { selectUser } from '../../redux/auth/selectors';
import { setIsModalOpen } from '../../redux/dictionary/slice';
import { selectIsModalOpen } from '../../redux/dictionary/selectors';
import MobileMolalWindow from '../MobileMolalWindow/MobileMolalWindow';

function Header() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isModalOpen = useSelector(selectIsModalOpen);

  function openModalWindow() {
    dispatch(setIsModalOpen(true));
  }

  return (
    <div className={css.headerContainer}>
      <div className={css.logoDiv}>
        <svg className={css.logoSvg}>
          <use href="/sprite.svg#logo"></use>
        </svg>
        <p className={css.logoP}>VocabBuilder</p>
      </div>
      <div className={css.menuDiv}>
        <p className={css.userName}>{user.name}</p>
        <div className={css.userLogoDiv}>
          <svg className={css.userLogoIcon}>
            <use href="/sprite.svg#user-icon"></use>
          </svg>
        </div>

        <button
          className={css.burgerBtn}
          type="button"
          onClick={openModalWindow}
        >
          <svg className={css.burgerBtnSvg}>
            <use href="/sprite.svg#burger"></use>
          </svg>
        </button>
      </div>
      {isModalOpen && <MobileMolalWindow />}
    </div>
  );
}

export default Header;
