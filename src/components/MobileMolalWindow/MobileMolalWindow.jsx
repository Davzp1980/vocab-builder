import { useDispatch, useSelector } from 'react-redux';
import css from './MobileMolalWindow.module.css';
import { selectUser } from '../../redux/auth/selectors';
import { setIsModalOpen } from '../../redux/dictionary/slice';
import { Link } from 'react-router';
import { logOut } from '../../redux/auth/operations';

function MobileMolalWindow() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  function openModalWindow() {
    dispatch(setIsModalOpen(false));
  }

  function logout() {
    dispatch(logOut());
    dispatch(setIsModalOpen(false));
  }
  return (
    <div className={css.modalMainContainer}>
      <div className={css.modalContainer}>
        <div className={css.logoContainer}>
          <div className={css.logoDiv}>
            <p className={css.userName}>{user.name}</p>
            <div className={css.userLogoDiv}>
              <svg className={css.userLogoIcon}>
                <use href="/sprite.svg#user-icon-burger"></use>
              </svg>
            </div>
          </div>
          <button
            className={css.closeBtn}
            type="button"
            onClick={openModalWindow}
          >
            <svg className={css.closeIcon}>
              <use href="/sprite.svg#x-close"></use>
            </svg>
          </button>
        </div>
        <div className={css.dictionaryContainer}>
          <Link className={css.dictionaryLink} to="/dictionary">
            Dictionary
          </Link>
          <Link className={css.link} to="/recommend">
            Recommend
          </Link>
          <Link className={css.link} to="/recommend">
            Training
          </Link>
          <button className={css.logoutBtn} onClick={logout}>
            Log out
            <svg className={css.linkSvg}>
              <use href="/sprite.svg#arrow-right"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileMolalWindow;
