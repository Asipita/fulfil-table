import clsx from "clsx";
import { useState, ChangeEvent, useEffect } from "react";
import { IDataRowProps } from "../../interfaces";

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
      data-testid="table-row"
    >
      <input
        type="checkbox"
        onChange={handleSelectionChange}
        className="p-4 m-4 place-self-center"
        checked={isSelected}
        data-testid="row-box"
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
