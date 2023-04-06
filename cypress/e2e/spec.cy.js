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
    const dateToSelect = "11/20/2024"; // set the date to select using a variable

    cy.visit("https://webdriveruniversity.com/Datepicker/index.html");
    cy.get("#datepicker").click();
    cy.get(".datepicker-switch").should("contain", "2023");

    // loop to move forward through the date picker pages until November 2024 is visible
    let currentMonth = Cypress.$(".datepicker-switch").text().trim();
    while (currentMonth !== "November 2024") {
      cy.get(".next").click(); // click on the right arrow to move to the next month
      currentMonth = Cypress.$(".datepicker-switch").text().trim();
    }

    cy.get(`.datepicker-days .day:not(.old)[title="${dateToSelect}"]`).click(); // click on the desired day based on the title attribute
    cy.get("#datepicker").should("have.value", dateToSelect); // validate that the date is selected
  });
});
