import { ReactNode, useRef, useState } from "react";
import DataRow from "./data-row";
interface IDataTableProps {
  columns: Array<IColumnProps>;
  rows: any;
  onRowClick(arg0: IRowProps, arg1: number): void;
  onSelectionChange(arg0: IRowProps[]): void;
}

export interface IColumnProps {
  id: string;
  label: string;
  isNumeric: boolean;
  width?: string;
}

export interface IRowProps {
  id: string;
  title: ReactNode | number | string;
  url: string;
}

export type SelectAllRows = "all" | "none" | "default";

export function DataTable(props: IDataTableProps) {
  const { columns, rows, onRowClick, onSelectionChange } = props;
  // const [selectedRows, setSelectedRows] = useState<IRowProps[]>([]);
  const [selectAllRows, setSelectAllRows] = useState<SelectAllRows>("none");
  let selectedRows = useRef<IRowProps[]>([]).current;
  function isNumericRow(key: string): boolean {
    const currentColumn = columns.find((column) => column.id === key);
    return currentColumn?.isNumeric || false;
  }

  function getRowProps(row: any): Array<[arg1: any, arg2: any]> {
    const tempRow = { ...row };
    const rowKeys = Object.keys(row);
    const columnIds = columns.map((column) => column.id);
    for (const key of rowKeys) {
      if (!columnIds.includes(key)) delete tempRow[key];
    }

    return Object.entries(tempRow).sort(([key]) => columnIds.indexOf(key));
  }

  function getCorrespondingColumn(index: number, row: IRowProps): string {
    const correspondingColumn = columns[index];
    return (row as any)[correspondingColumn.id];
  }

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

  function highlightAllRows() {
    setSelectAllRows("all");
    rows.forEach((row: IRowProps) => {
      addRow(row);
    });
  }

  function deHighlightAllRows() {
    setSelectAllRows("none");
    rows.forEach((row: IRowProps) => {
      removeRow(row.id);
    });
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
