import { ReactNode } from "react";

export interface IDataTableProps {
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

export type SelectAllRows = "all" | "none" | "default";
