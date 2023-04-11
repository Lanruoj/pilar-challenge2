// The below test has several errors
// Fix it, but do not use a WHILE or FOR loop

/* Preconditions:
The website with the date picker is accessible.
The date picker is visible on the page.
Desired year : 2024
Test Steps:
Open the website with the date picker.
Click on the date picker.
Verify that the current year is displayed in the date picker.
If the current year is not the desired year, navigate to the desired year by ONLY clicking on the "next" button 
until the desired year is displayed in the date picker.
Click on a date in the desired year.
Verify that the date input field displays the selected date in the expected format (mm-dd-yyyy).
Expected Results:
The date picker should allow the user to select a specific date in a specific year.
The selected date should be displayed in the date input field in the expected format.
*/

describe("Select date in November 2024 with right arrow keys and validate", () => {
  it("should select a date and validate it", () => {
    const dateToSelect = "11-24-2024";
    // Open the website
    cy.visit("https://webdriveruniversity.com/Datepicker/index.html");
    // Select target date in datepicker
    cy.selectDate(dateToSelect);
  });
});
