import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
} from '@tanstack/react-table';
import css from './WordsTable.module.css';
import { useSelector } from 'react-redux';
import { selectWordsOwn } from '../../redux/dictionary/selectors';

function WordsTable() {
  //   const wordsOwn = useSelector(selectWordsOwn);
  //   console.log(wordsOwn);

  const data = [
    { en: 'Alice', ua: 25, email: 'alice@example.com', country: 'USA' },
    { en: 'Bob', ua: 30, email: 'bob@example.com', country: 'Canada' },
    { en: 'Charlie', ua: 35, email: 'charlie@example.com', country: 'UK' },
  ];

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
    columnHelper.accessor('progress', {
      cell: info => {
        return <div className={css.cellPadding}>{info.getValue()}</div>;
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
    </div>
  );
}

export default WordsTable;
