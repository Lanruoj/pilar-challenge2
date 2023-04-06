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
    // Set up date variables
    const dateToSelect = "11-24-2024";
    const targetDate = new Date(Date.parse(dateToSelect));
    const currentDate = new Date();
    const monthDiff =
      targetDate.getMonth() -
      currentDate.getMonth() +
      12 * (targetDate.getFullYear() - currentDate.getFullYear());
    // Open the website
    cy.visit("https://webdriveruniversity.com/Datepicker/index.html");
    // Verify datepicker is visible & click
    cy.get("#datepicker").should("be.visible").click();
    // Select current selected date
    cy.get(".datepicker-switch")
      .eq(0)
      .as("date")
      .invoke("text")
      .then(($date) => {
        // Verify that the current year is displayed in the date picker.
        cy.wrap($date).should("contain", currentDate.getFullYear());
        // If target date is outside of selected month, navigate through months
        // (can be forwards or backwards)
        cy.wrap(new Array(Math.abs(monthDiff))).each(() => {
          if (monthDiff > 0) {
            cy.get(".datepicker-months th.next").click({ force: true });
          } else {
            cy.get(".datepicker-months th.prev").click({ force: true });
          }
        });
      });
    // Verify selected year matches target date
    cy.get("@date").should("contain", targetDate.getFullYear());
    // Select target day & click
    cy.get(".datepicker-days .day:not(.old)")
      .contains(targetDate.getDate().toString())
      .click();
    // Verify that placeholder value is target date
    cy.get("input.form-control")
      .invoke("prop", "value")
      .should("equal", dateToSelect);
  });
});
