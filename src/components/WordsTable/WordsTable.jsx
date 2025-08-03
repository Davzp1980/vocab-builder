import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table';
import css from './WordsTable.module.css';
import { useSelector } from 'react-redux';
import {
  selectIsEditModalOpen,
  selectWordsOwn,
} from '../../redux/dictionary/selectors';
import { CircularProgressbar } from 'react-circular-progressbar';
import { useEffect, useMemo, useState } from 'react';
import CircleBar from '../CircleBar/CircleBar';
import { useLocation } from 'react-router';
import ActionsBtnModal from '../ActionsBtnModal/ActionsBtnModal';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import clsx from 'clsx';
import { setOwnWordId } from '../../redux/dictionary/slice';
import EditWordModal from '../EditWordModal/EditWordModal';

function WordsTable() {
  const wordsOwn = useSelector(selectWordsOwn);
  const isEditModalOpen = useSelector(selectIsEditModalOpen);

  const data = useMemo(() => wordsOwn.results || [], [wordsOwn.results]);
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [popoverId, setPopoverId] = useState(null);

  const handleClick = (event, id) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setAnchorEl({
      getBoundingClientRect: () => rect,
      nodeType: 1,
    });
    setPopoverId(id);
    setOwnWordId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    handleClose();
  }, [wordsOwn]);

  const open = Boolean(anchorEl);

  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor('en', {
      cell: info => {
        return <div className={css.cellPadding}>{info.getValue()}</div>;
      },
      header: () => {
        return (
          <div className={css.iconTH}>
            <span>Word</span>
            {/* <svg className={css.flag}>
              <use></use>
            </svg> */}
          </div>
        );
      },
    }),
    columnHelper.accessor('ua', {
      cell: info => {
        return <div className={css.cellPadding}>{info.getValue()}</div>;
      },
      header: () => {
        return (
          <div className={css.iconTH}>
            <span>Translation</span>
            {/* <svg className={css.flag}>
              <use></use>
            </svg> */}
          </div>
        );
      },
    }),
    columnHelper.accessor('prog', {
      cell: info => {
        return (
          <div className={css.cellPadding}>
            {info.getValue()}
            <CircleBar percentage={wordsOwn.results.progress} />
          </div>
        );
      },
      header: () => {
        return (
          <div className={css.iconTH}>
            <span>Progress</span>
            {/* <svg className={css.flag}>
              <use></use>
            </svg> */}
          </div>
        );
      },
    }),
    columnHelper.accessor('_id', {
      cell: info => {
        if (location.pathname === '/dictionary') {
          return (
            <div className={clsx(css.cellPadding)}>
              <Button
                type="button"
                className={css.actionsBtn}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  boxShadow: 'none',
                }}
                variant="contained"
                onClick={event => handleClick(event, info.getValue())}
              >
                <svg className={css.actionsBtnSvg}>
                  <use href="/sprite.svg#3-dots"></use>
                </svg>
              </Button>
            </div>
          );
        }
      },
      header: () => {
        return (
          <div className={css.iconTH}>
            <span></span>
            {/* <svg className={css.flag}>
              <use></use>
            </svg> */}
          </div>
        );
      },
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={css.tableMainContainer}>
      <table className={css.table}>
        <thead>
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id}>
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(
                    cell.column.columnDef.cell ??
                      cell.column.columnDef.accessorKey,
                    cell.getContext()
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <Popover
        id={popoverId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        disableRestoreFocus
        sx={{
          '& .MuiPaper-root': {
            borderRadius: '15px',
            boxShadow: '0 4px 47px rgba(18, 20, 23, 0.08)',
          },
        }}
      >
        <ActionsBtnModal wordId={popoverId} onClose={handleClose} />
      </Popover>
      {isEditModalOpen && <EditWordModal wordId={popoverId} words={data} />}
    </div>
  );
}

export default WordsTable;
