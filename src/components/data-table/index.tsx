import { ReactNode } from "react";
import DataRow from "./data-row";
interface IDataTableProps {
  columns: Array<IColumnProps>;
  // rows: Array<IRowProps>;
  rows: any;
  onRowClick(arg0: IRowProps, arg1: number): void;
  onSelectionChange(): void;
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

export function DataTable(props: IDataTableProps) {
  const { columns, rows, onRowClick, onSelectionChange } = props;

  function isNumericRow(key: string): boolean {
    const currentColumn = columns.find((column) => column.id === key);
    return currentColumn?.isNumeric || false;
  }

  function getRowProps(row: any): Array<[arg1:any, arg2:any]> {
    const tempRow = {...row}
    const rowKeys = Object.keys(row);
    const columnIds = columns.map((column)=>column.id)
    for(const key of rowKeys){
      if(!columnIds.includes(key)) delete(tempRow[key])
    }
    
    return Object.entries(tempRow).sort(([key,])=>(columnIds.indexOf(key)))
  }

  function getCorrespondingColumn(index: number, row: IRowProps) : string{
    const correspondingColumn = columns[index]
    return (row as any)[correspondingColumn.id]
  }

  return (
    <section className="border rounded-lg">
      <table className="table-auto w-full">
        <thead>
          <th>
            <input
              type="checkbox"
              onChange={() => {}}
              className="p-4 place-self-center"
              checked={true}
              id="selectAllBox"
            />
            <label htmlFor="selectAllBox">Select all</label>
          </th>
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
          {rows.map((row: IRowProps, idx: number) => (
            <DataRow
              onRowClick={onRowClick}
              onSelectionChange={onSelectionChange}
              isNumericRow={isNumericRow}
              getRowProps={getRowProps}
              getCorrespondingColumn={getCorrespondingColumn}
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
