// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import { getMonthDifference } from "./utils";

Cypress.Commands.add("navigateMonths", (monthDiff) => {
  const iterations = new Array(Math.abs(monthDiff));
  cy.wrap(iterations).each(() => {
    if (monthDiff > 0) {
      cy.get(".datepicker-months th.next").click({ force: true });
    } else {
      cy.get(".datepicker-months th.prev").click({ force: true });
    }
  });
});

Cypress.Commands.add("selectDate", (dateToSelect) => {
  // Set up date variables
  const targetDate = new Date(Date.parse(dateToSelect));
  const currentDate = new Date();
  const monthDiff = getMonthDifference(currentDate, targetDate);
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
      cy.navigateMonths(monthDiff);
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
