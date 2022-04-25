import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { DataTable, IRowProps } from "./components";
import { usePosts } from "./hooks";

// TO-DO make sure no two IDs are the same

const TableColumns  = [
  {
    id: "id",
    label: "ID",
    isNumeric: false,
  },
  {
    id: "title",
    label: "Title",
    isNumeric: false,
  },
  {
    id: "url",
    label: "URL",
    isNumeric: false,
  },
  {
    id: "thumbnailUrl",
    label: "Thumbnail URL",
    isNumeric: true,
  },
]
function App() {
  const [page, setPage] = useState<number>(0);
  const [rows, setRows] = useState<any[]>([])
  const { data, isLoading, isError } = usePosts(page);
  function handleRowClick(rowData: IRowProps, rowIndex: number): void {
    // console.log({
    //   rowData,
    //   rowIndex,
    // });
  }

  // Gets called everytime a row is selected, returns the selected rows
  function handleRowSelection(rows: IRowProps[]): void {
    // "rows" will be all the selected rows, so use rows here
    // console.log({rows})
  }

  const { ref, inView /*entry*/ } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView) {
      setPage((prev) => {
        return prev + 1;
      });
    }
  }, [inView]);

  useEffect(()=> {
    if(data){
      setRows((prev)=> ([...prev, ...data]))
    }
  },[data, isLoading])

  if (isError) {
    return (
      <h1>
        An error occured while trying to get resources from json-placeholder
      </h1>
    );
  }
  return (
    <div className="p-8 border-4 border-green-300">
      <DataTable
        columns={TableColumns}
        rows={rows}
        onSelectionChange={handleRowSelection}
        onRowClick={handleRowClick}
      />

      {isLoading && "Loading..."}
      <div className="h-10" ref={ref} />
    </div>
  );
}

export default App;
