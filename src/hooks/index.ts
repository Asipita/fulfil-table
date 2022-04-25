import { useQuery } from "react-query";

async function getter(url: string) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export function usePosts(page: number) {
  return useQuery(["posts", page], () =>
    getter(
      `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=100`
    )
  );
}

export function useGetRowProps(columns) {
  return function(row: any): Array<[arg1: any, arg2: any]> {
    const tempRow = { ...row };
    const rowKeys = Object.keys(row);
    const columnIds = columns.map((column) => column.id);
    for (const key of rowKeys) {
      if (!columnIds.includes(key)) delete tempRow[key];
    }

    return Object.entries(tempRow).sort(([key]) => columnIds.indexOf(key));
  }
}

export function useGetCorrespondingColumns(columns) {
  return function (index: number, row): string {
    const correspondingColumn = columns[index];
    return (row as any)[correspondingColumn.id];
  }
}

export function useIsNumericRow(columns) {
  return function (key: string): boolean {
    const currentColumn = columns.find((column) => column.id === key);
    return currentColumn?.isNumeric || false;
  }
}

export function useHighlightAllRows(rows: any[], selectRows, addRow: (arg0: any) => void) {
  return function () {
    selectRows("all");
    rows.forEach((row) => {
      addRow(row);
    });
  }
}

export function useDeHighlightAllRows(rows, selectRows, removeRow: (arg0: any) => void) {
  return function () {
    selectRows("none");
    rows.forEach((row) => {
      removeRow(row.id);
    });
  }
}