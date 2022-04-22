import { DataTable } from "./components";

// TO-DO make sure no two IDs are the same
function App() {
  return (
    <div className='p-8'>
      <DataTable
        columns={[
          {
            id: "234",
            label: "First",
            isNumeric: false,
            width: "50%"
          },{
            id: "234",
            label: "First",
            isNumeric: false
          },{
            id: "234",
            label: "First",
            isNumeric: true
          },{
            id: "234",
            label: "First",
            isNumeric: false,
            width: "500px"
          },
        ]}
        rows={[
          {
            id: "1",
            product: "Bread",
            price: 200
          },{
            id: "1",
            product: "Bread",
            price: 200
          },{
            id: "1",
            product: "Bread",
            price: 200
          },{
            id: "1",
            product: "Bread",
            price: 200
          },
        ]}
        onRowClick={()=>alert("Row Clicked")}
        onSelectionChange={()=>alert("Selection Changed")}
      />
    </div>
  );
}

export default App;
