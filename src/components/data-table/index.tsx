import { ReactNode, useMemo } from "react";
// import clsx from "clsx";
interface IDataTableProps {
  columns: Array<IColumnProps>;
  rows: Array<IRowProps>;
  onRowClick(): void;
  onSelectionChange(): void;
}

interface IColumnProps {
  id: string;
  label: string;
  isNumeric?: boolean;
  width?: string;
}

interface IRowProps {
  id: string;
  product: ReactNode | number;
  price: number;
}

export function DataTable(props: IDataTableProps) {
  const { columns, rows, onRowClick, onSelectionChange } = props;

  function isNumericRow(idx: number): boolean {
    return !!columns[idx+1].isNumeric;
  }

  return (
    <section className="border rounded-lg">
      <table className="w-full">
        <thead>
          {columns.map(({ label, isNumeric, id }: IColumnProps) => (
            <th key={id} className="p-4 border" align={isNumeric ? "right" : "left"}>
              {label}
            </th>
          ))}
        </thead>
        <tbody>
          {rows.map((row: IRowProps) => (
            <tr key={row.id} onClick={onRowClick} className="border p-4">
              <input
                type="checkbox"
                onChange={onSelectionChange}
                className="p-4 m-4 place-self-center"
              />
              {Object.values(row).map((entry, idx) => (
                <td
                  className="p-4 border"
                  align={isNumericRow(idx) ? "right" : "left"}
                  key={idx}
                >
                  {entry}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
