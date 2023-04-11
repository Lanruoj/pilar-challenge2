import { getMonthDifference } from "../utils";

const monthArrowNextButton = ".datepicker-months th.next";
const monthArrowPrevButton = ".datepicker-months th.prev";
const selectedDateHeader = ".datepicker-switch";
const activeDays = ".datepicker-days .day:not(.old)";
const placeHolderDate = "input.form-control";
const datepicker = "#datepicker";

Cypress.Commands.add("selectDateAndVerify", (dateToSelect) => {
  // Set up date variables
  const targetDate = new Date(Date.parse(dateToSelect));
  const currentDate = new Date();
  const monthDiff = getMonthDifference(currentDate, targetDate);
  // Verify datepicker is visible & click
  cy.clickDatepicker();
  // Select current selected date
  cy.get(selectedDateHeader).should("contain", currentDate.getFullYear());
  // If target date is outside of selected month, navigate through months
  // (can be forwards or backwards)
  cy.navigateMonths(monthDiff);
  // Verify selected year matches target date
  cy.get(selectedDateHeader).should("contain", targetDate.getFullYear());
  // Select target day & click
  cy.get(activeDays).contains(targetDate.getDate().toString()).click();
  // Verify that placeholder value is target date
  cy.get(placeHolderDate).invoke("prop", "value").should("equal", dateToSelect);
});

Cypress.Commands.add("navigateMonths", (monthDiff) => {
  const iterations = new Array(Math.abs(monthDiff));
  cy.wrap(iterations).each(() => {
    if (monthDiff > 0) {
      cy.get(monthArrowNextButton).click({ force: true });
    } else {
      cy.get(monthArrowPrevButton).click({ force: true });
    }
  });
});

Cypress.Commands.add("clickDatepicker", () => {
  cy.get(datepicker).should("be.visible").click();
});
