/// <reference types="cypress" />

describe("Basic cypress syntax presentation - title, get, should, contains, click, wait", () => {
  
  it("Reaches the home page (title, should)", () => {
    cy.visit("/");
    cy.title().should("include", "Software Testing Practice Pages");
  });

  it("Reaches the header on the page (get)", () => {
    cy.visit("/");
    cy.get("h1").should("contain", "Software Testing Practice Pages");
  });

  it("Button renders text on click for a second (click, wait)", () => {
    cy.visit("/pages/basics/basic-web-page/");
    cy.get("button#button1").click();
    cy.get("#click-message").should("have.text", "You clicked the button!");
    cy.wait(1000);
    cy.get("#click-message").should("be.empty");
  });

  it("Reaches element by text and checks if it is visible (contains)", () => {
    cy.visit("/pages/basics/basic-web-page/");
    cy.contains("Very simple web pages have a structure illustrated by this page.").should("be.visible");
  });

});