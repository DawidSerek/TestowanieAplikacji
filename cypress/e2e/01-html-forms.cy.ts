/// <reference types="cypress" />

import { BASIC_INPUTS_SELECTORS as BI } from "../selectors/pages/forms/basic-inputs.selectors";
import { TEXT_INPUTS_SELECTORS as TI } from "../selectors/pages/forms/text-inputs.selectors";

describe("Basic Inputs (/pages/forms/basic-inputs/)", () => {
  beforeEach(() => {
    cy.visit("/pages/forms/basic-inputs/");
  });

  it("Renders the Basic Inputs Form heading (get, find, should)", () => {
    cy.get(BI.formWrapper)
      .find(BI.formHeading)
      .should("have.text", "Basic Inputs Form");
  });

  it("Button input is visible and clickable (get, should, click)", () => {
    cy.get(BI.buttonInput)
      .should("be.visible")
      .and("have.value", "A Button")
      .click();
  });

  it("Checkbox toggles between checked and unchecked (get, should, check, uncheck)", () => {
    cy.get(BI.checkboxInput)
      .should("not.be.checked")
      .check()
      .should("be.checked")
      .uncheck()
      .should("not.be.checked");
  });

  it("Radio buttons allow a single selection (get, check, should)", () => {
    cy.get(BI.radioGroup)
      .find(BI.radio1)
      .check()
      .should("be.checked");

    cy.get(BI.radio2)
      .check()
      .should("be.checked");

    cy.get(BI.radio1).should("not.be.checked");
  });

  it("Hidden input keeps its default value (get, should)", () => {
    cy.get(BI.hiddenInput)
      .should("exist")
      .and("have.value", "bob");
  });

  it("Send Inputs button populates status message and form results (click, get, should)", () => {
    cy.get(BI.sendButton).click();

    cy.get(BI.statusMessage)
      .should("not.be.empty")
      .and("contain.text", "Submission successful!");

    cy.get(BI.formResults)
      .should("contain.text", "Submitted Values")
      .and("contain.text", "hidden")
      .and("contain.text", "bob");
  });
});

describe("Text Inputs (/pages/forms/text-inputs/)", () => {
  beforeEach(() => {
    cy.visit("/pages/forms/text-inputs/");
  });

  it("Renders the Text Inputs Form heading (get, find, should)", () => {
    cy.get(TI.formWrapper)
      .find(TI.formHeading)
      .should("have.text", "Text Inputs Form");
  });

  it("Text, search and password inputs reflect typed values (get, type, should)", () => {
    cy.get(TI.textInput)
      .type("Hello world")
      .should("have.value", "Hello world");

    cy.get(TI.searchInput)
      .type("cypress query")
      .should("have.value", "cypress query");

    cy.get(TI.passwordInput)
      .type("s3cret!")
      .should("have.value", "s3cret!");
  });

  it("Valid submission populates status message and form results (get, type, click, should)", () => {
    cy.get(TI.textInput).type("John Doe");
    cy.get(TI.passwordInput).type("Pa55word!");
    cy.get(TI.emailInput).type("john@example.com");
    cy.get(TI.urlInput).type("https://example.com");
    cy.get(TI.telInput).type("+48123456789");
    cy.get(TI.sendButton).click();

    cy.get(TI.statusMessage)
      .should("contain.text", "Submission successful!");

    cy.get(TI.formResults)
      .should("contain.text", "Submitted Values")
      .and("contain.text", "John Doe")
      .and("contain.text", "john@example.com")
      .and("contain.text", "https://example.com")
      .and("contain.text", "+48123456789");
  });

  it("Make All Fields - required adds the required attribute to inputs (click, get, should)", () => {
    cy.get(TI.textInput).should("not.have.attr", "required");
    cy.get(TI.emailInput).should("not.have.attr", "required");

    cy.get(TI.requiredToggle).click();

    cy.get(TI.textInput).should("have.attr", "required");
    cy.get(TI.emailInput).should("have.attr", "required");
    cy.get(TI.passwordInput).should("have.attr", "required");
  });
});
