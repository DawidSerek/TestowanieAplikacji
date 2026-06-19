/// <reference types="cypress" />

describe("scaffold sanity check", () => {
  it("reaches the eviltester home page", () => {
    cy.visit("/");
    cy.title().should("include", "Software Testing Practice Pages");
  });
});
