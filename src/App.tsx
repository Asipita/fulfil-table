import { DataTable, IRowProps } from "./components";
import { PHOTOS } from "./dummy";
import { usePosts } from "./hooks";

// TO-DO make sure no two IDs are the same
function App() {

  const {data, isLoading, isFetching, isError} = usePosts()

  function handleRowClick(rowData: IRowProps, rowIndex: number): void {
    // console.log({
    //   rowData,
    //   rowIndex,
    // });
  }

  // Gets called everytime a row is selected, returns the selected rows
  function handleRowSelection(rows: IRowProps[],): void {
    // "rows" will be all the selected rows, so use rows here
    // console.log({rows})
  }

  if(isError) {
    return <h1>An error occured while trying to get resources from json-placeholder</h1>
  }

  if(isLoading) {
    return <h1>Loading data....</h1>
  }

  return (
    <div className="p-8">
      <DataTable
        columns={[
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
        ]}
        rows={data}
        onSelectionChange={handleRowSelection}
        onRowClick={handleRowClick}
      />

        <div className="flex flex-wrap gap-1 my-2 border p-2">
          {(Array(50)).fill((_: any, idx: number)=> idx).map((elm, idx)=> <button className="border py-2 px-4">{idx+1}</button>)}
        </div>
    </div>
  );
}

export default App;
