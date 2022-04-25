import { fireEvent, render, screen } from "@testing-library/react";
import { TestTable } from "../../../App.test";
import { PHOTOROWS, TABLECOLUMNS } from "../../../dummy";

test("Clicking on a row calls the onRowClick function and with the right arguments", () => {
  const handleRowClick = jest.fn();

  render(<TestTable handleRowClick={handleRowClick} />);
  const firstRowCheckbox = screen.getAllByTestId("row-box")[0];
  fireEvent.click(firstRowCheckbox);

  expect(handleRowClick).toHaveBeenCalledTimes(1);
  expect(handleRowClick).toHaveBeenCalledWith(PHOTOROWS[0], 0);
});

test("Checking a box calls the onSelectionChange function and with the right arguments", () => {
  const handleSelectionChange = jest.fn();

  render(<TestTable onSelectionChange={handleSelectionChange} />);
  const [firstRowCheckbox, secondRowCheckbox] =
    screen.getAllByTestId("row-box");
  fireEvent.click(firstRowCheckbox);
  fireEvent.click(secondRowCheckbox);

  expect(handleSelectionChange).toHaveBeenCalledTimes(2);
  expect(handleSelectionChange).toHaveBeenLastCalledWith([
    PHOTOROWS[0],
    PHOTOROWS[1],
  ]);
});

test("Numeric rows should be right aligned", () => {
  render(<TestTable />);

  const [firstRow] = screen.getAllByTestId("table-row");
  const tableHeads = screen.getAllByTestId("table-head");
  expect(tableHeads).toHaveLength(TABLECOLUMNS.length);
  const rightAlignedHeaderIndex = tableHeads.findIndex(
    (tableHead) => tableHead.getAttribute("align") === "right"
  );
  const rightAlighedTableData =
    firstRow.childNodes[rightAlignedHeaderIndex + 1];

  expect(rightAlighedTableData).toHaveAttribute("align", "right");
});
