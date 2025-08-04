import { useDispatch, useSelector } from 'react-redux';
import css from './WordsPagination.module.css';
import { selectWordsOwn } from '../../redux/dictionary/selectors';
import { useState } from 'react';
import { setFilters } from '../../redux/dictionary/slice';
import clsx from 'clsx';

function WordsPagination() {
  const dispatch = useDispatch();
  const wordOwn = useSelector(selectWordsOwn);

  const [currentPage, setCurrentPage] = useState(1);

  const [numbBtn1, setNumbBtn1] = useState(1);
  const [numbBtn2, setNumbBtn2] = useState(2);

  function onclickCurrentPage(pageNumber) {
    setCurrentPage(pageNumber);
    dispatch(
      setFilters({
        page: pageNumber,
      })
    );
  }

  function onClickNext() {
    if (wordOwn.totalPages === currentPage) {
      return;
    }

    setCurrentPage(prev => prev + 1);

    setNumbBtn1(prev => prev + 1);

    setNumbBtn2(prev => prev + 1);
    dispatch(
      setFilters({
        page: numbBtn1 + 1,
      })
    );
  }

  function onClickPrev() {
    if (currentPage === 1) {
      return;
    }

    setCurrentPage(prev => {
      if (numbBtn1 === 1) {
        setNumbBtn1(1);
        setNumbBtn2(2);
      }
      return prev - 1;
    });

    setNumbBtn1(prev => prev - 1);
    setNumbBtn2(prev => prev - 1);

    dispatch(
      setFilters({
        page: currentPage - 1,
      })
    );
  }

  function onclickPlus10() {
    setCurrentPage(10);
    dispatch(
      setFilters({
        page: 10,
      })
    );
  }

  function firstPage() {
    setCurrentPage(1);
    setNumbBtn1(1);
    setNumbBtn2(2);
    dispatch(
      setFilters({
        page: 1,
      })
    );
  }

  function lastPage() {
    setCurrentPage(wordOwn.totalPages);

    setNumbBtn1(wordOwn.totalPages - 1);
    setNumbBtn2(wordOwn.totalPages);
    dispatch(
      setFilters({
        page: wordOwn.totalPages,
      })
    );
  }

  return (
    <div className={css.wordsPaginationMainContainer}>
      <div className={css.mainBtnDiv}>
        <button className={css.pagBtn} type="button" onClick={firstPage}>
          <svg className={css.pagLeftSvg}>
            <use href="/sprite.svg#pagin-left"></use>
          </svg>
        </button>
        <button
          className={css.pagBtn}
          type="button"
          disabled={currentPage === 1 && 'disabled'}
          onClick={onClickPrev}
        >
          <svg
            className={clsx(
              css.pagLeftSvg,
              currentPage === 1 && css.svgDisabled
            )}
          >
            <use href="/sprite.svg#Prev"></use>
          </svg>
        </button>
        <div className={css.pagNumbersDiv}>
          {[numbBtn1, numbBtn2].map((num, index) => (
            <button
              key={index}
              className={clsx(css.pagBtn, {
                [css.activeBtn]: currentPage === num,
              })}
              type="button"
              onClick={() => onclickCurrentPage(num)}
            >
              {num}
            </button>
          ))}

          <div className={css.pagBtn}>...</div>
          <button
            className={css.pagBtn}
            type="button"
            disabled={wordOwn?.results?.length < 10 && 'disabled'}
            onClick={onclickPlus10}
          >
            10
          </button>
          <button className={css.pagBtn} type="button" onClick={onClickNext}>
            <svg
              className={clsx(
                css.pagLeftSvg,
                currentPage === wordOwn.totalPages && css.svgDisabled
              )}
            >
              <use href="/sprite.svg#Next"></use>
            </svg>
          </button>
          <button className={css.pagBtn} type="button" onClick={lastPage}>
            <svg className={css.pagLeftSvg}>
              <use href="/sprite.svg#pagin-right"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default WordsPagination;
