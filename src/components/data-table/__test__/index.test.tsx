import { fireEvent, render, screen } from "@testing-library/react";
import { TestTable } from "../../../App.test";

test("clicking 'Select all' selects all rows", () => {
    render(<TestTable/>);
  
    const selectAllButton = screen.getByLabelText(/select all/i);
    expect(selectAllButton).toBeInTheDocument();
  
    fireEvent.click(selectAllButton);
    expect(selectAllButton).toBeChecked();
  
    const rowCheckBox = screen.getAllByTestId("row-box");
    expect(rowCheckBox.length).toBeGreaterThan(0);
  
    rowCheckBox.forEach((checkbox) => {
      expect(checkbox).toBeChecked();
    });
  
  });
  
  test("Unchecking 'Select all' de-selects all rows", () => {
    render(<TestTable/>);
  
    const selectAllButton = screen.getByLabelText(/select all/i);
    expect(selectAllButton).toBeInTheDocument();
  
    fireEvent.click(selectAllButton);
    fireEvent.click(selectAllButton);
    expect(selectAllButton).not.toBeChecked();
  
    const rowCheckBox = screen.getAllByTestId("row-box");
  
    rowCheckBox.forEach((checkbox) => {
      expect(checkbox).not.toBeChecked();
    });
  
  });