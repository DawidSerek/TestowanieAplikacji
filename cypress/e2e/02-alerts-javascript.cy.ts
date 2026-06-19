/// <reference types="cypress" />

import { ALERTS_SELECTORS as SEL } from "../selectors/pages/basics/alerts-javascript.selectors";

describe("Alerts - JavaScript (/pages/basics/alerts-javascript/)", () => {
  beforeEach(() => {
    cy.visit("/pages/basics/alerts-javascript/");
  });

  it("Captures alert text and shows handled message (cy.on, cy.window, click, should)", () => {
    const alertText = "I am an alert box!";

    cy.on("window:alert", (msg) => {
      expect(msg).to.equal(alertText);
    });

    cy.get(SEL.alertButton).click();

    cy.get(SEL.alertExplanation)
      .should("contain.text", "You triggered and handled the alert dialog");

    cy.get(SEL.alertReturn)
      .invoke("attr", "data-use-count")
      .then((count) => {
        expect(Number(count)).to.be.greaterThan(0);
      });
  });

  it("Confirm OK returns true in explanation (cy.on, click, should)", () => {
    cy.on("window:confirm", () => true);

    cy.get(SEL.confirmButton).click();

    cy.get(SEL.confirmExplanation)
      .should("contain.text", "You clicked OK");

    cy.get(SEL.confirmRetval)
      .should("have.text", "true");
  });

  it("Confirm Cancel returns false in explanation (cy.on, click, should)", () => {
    cy.on("window:confirm", () => false);

    cy.get(SEL.confirmButton).click();

    cy.get(SEL.confirmExplanation)
      .should("contain.text", "You clicked Cancel");

    cy.get(SEL.confirmRetval)
      .should("have.text", "false");
  });

  it("Prompt returns the typed value (cy.window, click, should, type)", () => {
    cy.window().then((win) => {
      cy.stub(win, "prompt").returns("hello from cypress");
    });

    cy.get(SEL.promptButton).click();

    cy.get(SEL.promptExplanation)
      .should("contain.text", "You clicked OK");

    cy.get(SEL.promptRetval)
      .should("have.text", "hello from cypress");
  });
});
