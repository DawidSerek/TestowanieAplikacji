import { LoginCredentials, Product } from "../types/interfaces";

declare global {
  namespace Cypress {
    interface Chainable {
      login(creds: LoginCredentials): Chainable<void>;
      assertProductInCart(product: Product): Chainable<void>;
    }
  }
}

Cypress.Commands.add("login", (creds: LoginCredentials) => {
  cy.visit("/apps/simulated-login/");
  cy.get("#username").clear().type(creds.username);
  cy.get("#password").clear().type(creds.password);
  cy.get("#login").click();
});

Cypress.Commands.add(
  "assertProductInCart",
  { prevSubject: "optional" },
  (subject, product: Product) => {
    if (subject) {
      cy.wrap(subject).should("exist");
    }

    cy.window().then((win) => {
      const raw = win.localStorage.getItem("cart") ?? "[]";
      const cart: number[] = JSON.parse(raw);
      expect(cart).to.include(product.id);
    });
  }
);
