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
