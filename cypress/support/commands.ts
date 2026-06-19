import { LoginCredentials } from "../types/interfaces";

declare global {
  namespace Cypress {
    interface Chainable {
      login(creds: LoginCredentials): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (creds: LoginCredentials) => {
  cy.visit("/apps/simulated-login/");
  cy.get("#username").clear().type(creds.username);
  cy.get("#password").clear().type(creds.password);
  cy.get("#login").click();
});
