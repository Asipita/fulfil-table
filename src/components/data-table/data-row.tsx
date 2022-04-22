import { IRowProps } from ".";

export interface IDataRowProps {
  onRowClick(arg0: IRowProps, arg1: number): void;
  onSelectionChange(): void;
  row: IRowProps;
  isNumericRow(arg0: number): boolean;
  idx: number;
}

export default function DataRow({
  onRowClick,
  onSelectionChange,
  row,
  isNumericRow,
  idx,
}: IDataRowProps) {
  return (
    <tr
      key={row.id}
      onClick={() => onRowClick(row, idx)}
      className="border p-4"
    >
      <input
        type="checkbox"
        onChange={() => onSelectionChange()}
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
  );
}
