import {
  useDeHighlightAllRows,
  useGetCorrespondingColumns,
  useGetRowProps,
  useHighlightAllRows,
  useIsNumericRow,
} from "hooks/";
import { IColumnProps, IDataTableProps, IRowProps, SelectAllRows } from "interfaces";
import { useRef, useState } from "react"
import DataRow from "./data-row";

export function DataTable(props: IDataTableProps) {
  const [selectAllRows, setSelectAllRows] = useState<SelectAllRows>("none");
  const { columns, rows, onRowClick, onSelectionChange } = props;

  const isNumericRow = useIsNumericRow(columns);
  const getRowProps = useGetRowProps(columns);
  const getCorrespondingColumn = useGetCorrespondingColumns(columns);
  const highlightAllRows = useHighlightAllRows(rows, setSelectAllRows, addRow);
  const deHighlightAllRows = useDeHighlightAllRows(
    rows,
    setSelectAllRows,
    removeRow
  );

  let selectedRows = useRef<IRowProps[]>([]).current;

  function addRow(row: IRowProps): void {
    const tempRows = [...selectedRows, row];
    selectedRows = tempRows;
    onSelectionChange(tempRows);
  }

  function removeRow(rowId: string): void {
    const filteredRows = selectedRows.filter((row) => row.id !== rowId);
    selectedRows = filteredRows;
    onSelectionChange(filteredRows);
  }

  function handleSelectAllRows(event: React.ChangeEvent<HTMLInputElement>) {
    const { checked } = event.currentTarget;
    if (checked) {
      highlightAllRows();
    } else {
      deHighlightAllRows();
    }
  }

  return (
    <section className="border rounded-lg">
      <table className="table-auto w-full">
        <thead>
          <th>
            <label htmlFor="selectAllBox">
              <input
                type="checkbox"
                onChange={handleSelectAllRows}
                className="p-4 place-self-center"
                checked={selectAllRows === "all"}
                id="selectAllBox"
              />
              Select all
            </label>
          </th>
          {columns.map(({ label, isNumeric, id, width }: IColumnProps) => (
            <th
              key={id}
              className="p-4 border"
              align={isNumeric ? "right" : "left"}
              style={{
                width: width || "initial",
              }}
              data-testid="table-head"
            >
              {label}
            </th>
          ))}
        </thead>
        <tbody>
          {rows.map((row: IRowProps, idx: number) => (
            <DataRow
              onRowClick={onRowClick}
              onSelectionChange={onSelectionChange}
              isNumericRow={isNumericRow}
              getRowProps={getRowProps}
              getCorrespondingColumn={getCorrespondingColumn}
              handleRows={[addRow, removeRow]}
              selectAllRows={selectAllRows}
              row={row}
              idx={idx}
              key={row.id}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}
