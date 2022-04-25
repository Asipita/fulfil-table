import { fireEvent, render, screen } from "@testing-library/react";
import { DataTable } from "./components";
import { PHOTOROWS, TABLECOLUMNS } from "./dummy";
import Providers from "./providers";

export const TestTable = function ({handleRowClick = jest.fn, onSelectionChange = jest.fn}) {
  return (
    <Providers>
      <DataTable
        columns={TABLECOLUMNS}
        rows={PHOTOROWS}
        onRowClick={handleRowClick}
        onSelectionChange={onSelectionChange}
      />
    </Providers>
  );
};

test("renders a table without error", () => {
  render(<TestTable/>);

  const rowCheckBox = screen.getAllByTestId("row-box");
  expect(rowCheckBox.length).toBeGreaterThan(0);

  const firstRowCheckBox = rowCheckBox[0];
  fireEvent.click(firstRowCheckBox);
  expect(firstRowCheckBox).toBeChecked();
});