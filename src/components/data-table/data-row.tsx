import clsx from "clsx";
import { useState, ChangeEvent } from "react";
import { IRowProps } from ".";

export interface IDataRowProps {
  onRowClick(arg0: IRowProps, arg1: number): void;
  onSelectionChange(): void;
  row: IRowProps;
  isNumericRow(arg0: string): boolean;
  getRowProps(arg0: any): Array<[arg1: any, arg2: any]>;
  getCorrespondingColumn(arg0: number, arg1: IRowProps): string;
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
}: IDataRowProps) {
  const [isSelected, setSelected] = useState(false);

  function handleSelectionChange(event: ChangeEvent<HTMLInputElement>): void {
    setSelected(event.currentTarget.checked);
    onSelectionChange();
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
