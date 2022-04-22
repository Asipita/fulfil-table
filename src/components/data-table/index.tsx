import { ReactNode } from "react";

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

  return (
    <section className="border rounded-lg">
      <table className="w-full">
        <thead>
          {columns.map((column: IColumnProps) => (
            <th className="p-4 text-left border">{column.label}</th>
          ))}
        </thead>
        <tbody>
          {rows.map((row: IRowProps) => (
            <tr key={row.id} onClick={onRowClick} className="border p-4">
              <input type="checkbox" onChange={onSelectionChange} className="p-4 m-4 place-self-center"/>
              {Object.values(row).map((entry) => (
                <td className="p-4 border">{entry}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
