import clsx from "clsx";
import { useState, ChangeEvent, useEffect } from "react";
import { IRowProps, SelectAllRows } from ".";

export interface IDataRowProps {
  onRowClick(arg0: IRowProps, arg1: number): void;
  onSelectionChange(arg0: IRowProps[], arg1: number): void;
  row: IRowProps;
  isNumericRow(arg0: string): boolean;
  getRowProps(arg0: any): Array<[arg1: any, arg2: any]>;
  getCorrespondingColumn(arg0: number, arg1: IRowProps): string;
  selectAllRows: SelectAllRows;
  handleRows: [arg0: (arg0: IRowProps)=>void, arg1: (arg0: string)=>void];
  idx: number;
}

export default function DataRow({
  onRowClick,
  onSelectionChange,
  row,
  isNumericRow,
  idx,
  getRowProps,
  getCorrespondingColumn,
  handleRows,
  selectAllRows
}: IDataRowProps) {

  const [addRow, removeRow] = handleRows
  const [isSelected, setIsSelected] = useState<boolean>(selectAllRows === "all");
  
  useEffect(()=>{
    setIsSelected(selectAllRows === "all")
  }, [selectAllRows])  
  
  function handleSelectionChange(event: ChangeEvent<HTMLInputElement>): void {
    const {checked} = event.currentTarget
    // setIsSelected(event.currentTarget.checked);
    setIsSelected(checked)
    if(checked){
      addRow(row)
    }else {
      removeRow(row.id)
    }
  }

  return (
    <tr
      key={row.id}
      onClick={() => onRowClick(row, idx)}
      className={clsx(isSelected && "bg-green-700 text-white", "border p-4")}
    >
      <input
        type="checkbox"
        onChange={handleSelectionChange}
        className="p-4 m-4 place-self-center"
        checked={isSelected}
      />
      {getRowProps(row).map(([key,], idx) => {
        return (
          <td
            className="p-4 border"
            align={isNumericRow(key) ? "right" : "left"}
            key={idx}
          >
            {getCorrespondingColumn(idx, row)}
          </td>
        );
      })}
    </tr>
  );
}
