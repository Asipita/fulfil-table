import { ReactNode } from "react";
import DataRow from "./data-row";
// import clsx from "clsx";
interface IDataTableProps {
  columns: Array<IColumnProps>;
  rows: Array<IRowProps>;
  onRowClick(arg0: IRowProps, arg1: number): void;
  onSelectionChange(): void;
}

export interface IColumnProps {
  id: string;
  label: string;
  isNumeric?: boolean;
  width?: string;
}

export interface IRowProps {
  id: string;
  product: ReactNode | number;
  price: number;
}

export function DataTable(props: IDataTableProps) {
  const { columns, rows, onRowClick, onSelectionChange } = props;

  function isNumericRow(idx: number): boolean {
    return !!columns[idx + 1].isNumeric;
  }

  return (
    <section className="border rounded-lg">
      <table className="table-auto w-full">
        <thead>
          {columns.map(({ label, isNumeric, id, width }: IColumnProps) => (
            <th
              key={id}
              className="p-4 border"
              align={isNumeric ? "right" : "left"}
              style={{
                width: width || "initial",
              }}
            >
              {label}
            </th>
          ))}
        </thead>
        <tbody>
          {rows.map((row: IRowProps, idx) => (
            <DataRow
              onRowClick={onRowClick}
              onSelectionChange={onSelectionChange}
              isNumericRow={isNumericRow}
              row={row}
              idx={idx}
              key={idx}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}
