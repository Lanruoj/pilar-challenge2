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
  cy.clickDatepicker().then(() => {
    // Select current selected date & verify current date
    cy.verifySelectedYear(currentDate);
    // If target date is outside of selected month, navigate through months
    // (can be forwards or backwards)
    cy.navigateMonths(monthDiff).then(() => {
      // Verify selected year matches target date
      cy.verifySelectedYear(targetDate);
      // Select target day & click
      cy.clickOnTargetDay(targetDate).then(() => {
        // Verify that placeholder value is target date
        cy.verifyDatepickerPlaceholder(dateToSelect);
      });
    });
  });
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

Cypress.Commands.add("verifySelectedYear", (date) => {
  const year = date.getFullYear();
  cy.get(selectedDateHeader).should("contain", year);
});

Cypress.Commands.add("clickOnTargetDay", (targetDate) => {
  const day = targetDate.getDate().toString();
  cy.get(activeDays).contains(day).click();
});

Cypress.Commands.add("verifyDatepickerPlaceholder", (dateToSelect) => {
  cy.get(placeHolderDate).invoke("prop", "value").should("equal", dateToSelect);
});
