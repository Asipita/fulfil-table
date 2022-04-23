import { DataTable, IRowProps } from "./components";
import { PHOTOS } from "./dummy";

// TO-DO make sure no two IDs are the same
function App() {
  function handleRowClick(rowData: IRowProps, rowIndex: number): void {
    console.log({
      rowData,
      rowIndex,
    });
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
        rows={PHOTOS}
        onSelectionChange={() => {}}
        onRowClick={handleRowClick}
      />
    </div>
  );
}

export default App;
