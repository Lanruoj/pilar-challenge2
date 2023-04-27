import { getMonthDifference } from "../utils";

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Select date in datepicker and verify date has been selected.
       * @param dateToSelect - date string in format <mm-dd-yyyy>
       */
      selectDateAndVerify(dateToSelect: string): Chainable<void>;
      /**
       * Navigate through date picker by clicking left and right arrows.
       * @param monthDiff - number of months between current date & target date
       */
      navigateMonths(monthDiff: number): Chainable<void>;
      /**
       * Click on datepicker textbox.
       */
      clickDatepicker(): Chainable<void>;
      /**
       * Verify the year currently selected in the datepicker calendar matches input.
       * @param date - Date object to be verified
       */
      verifySelectedYear(date: Date): Chainable<void>;
      /**
       * Click the day on the datepicker calendar as specified in the target date input.
       * @param targetDate - Date object to be parsed
       */
      clickOnTargetDay(targetDate: Date): Chainable<void>;
      /**
       * Verify that the datepicker textbox placeholder is displaying specified date.
       * @param dateToSelect - date string in format <mm-dd-yyyy>
       */
      verifyDatepickerPlaceholder(dateToSelect: string): Chainable<void>;
    }
  }
}

const monthArrowNextButton = ".datepicker-months th.next";
const monthArrowPrevButton = ".datepicker-months th.prev";
const selectedDateHeader = ".datepicker-switch";
const activeDays = ".datepicker-days .day:not(.old)";
const placeHolderDate = "input.form-control";
const datepicker = "#datepicker";

Cypress.Commands.add("selectDateAndVerify", (dateToSelect: string) => {
  // Set up date variables
  const targetDate = new Date(Date.parse(dateToSelect));
  const currentDate = new Date();
  const monthDiff = getMonthDifference(currentDate, targetDate);
  // Verify datepicker is visible & click
  cy.clickDatepicker();
  // Select current selected date
  cy.verifySelectedYear(currentDate);
  // If target date is outside of selected month, navigate through months
  // (can be forwards or backwards)
  cy.navigateMonths(monthDiff);
  // Verify selected year matches target date
  cy.verifySelectedYear(targetDate);
  // Select target day & click
  cy.clickOnTargetDay(targetDate);
  // Verify that placeholder value is target date
  cy.verifyDatepickerPlaceholder(dateToSelect);
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
