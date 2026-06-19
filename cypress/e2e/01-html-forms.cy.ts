/// <reference types="cypress" />

import { SELECTORS } from "../selectors/selectors";

describe("Basic Inputs (/pages/forms/basic-inputs/)", () => {
  beforeEach(() => {
    cy.visit("/pages/forms/basic-inputs/");
  });

  it("Renders the Basic Inputs Form heading (get, find, should)", () => {
    cy.get(SELECTORS.basicInputs.formWrapper)
      .find(SELECTORS.basicInputs.formHeading)
      .should("have.text", "Basic Inputs Form");
  });

  it("Button input is visible and clickable (get, should, click)", () => {
    cy.get(SELECTORS.basicInputs.buttonInput)
      .should("be.visible")
      .and("have.value", "A Button")
      .click();
  });

  it("Checkbox toggles between checked and unchecked (get, should, check, uncheck)", () => {
    cy.get(SELECTORS.basicInputs.checkboxInput)
      .should("not.be.checked")
      .check()
      .should("be.checked")
      .uncheck()
      .should("not.be.checked");
  });

  it("Radio buttons allow a single selection (get, check, should)", () => {
    cy.get(SELECTORS.basicInputs.radioGroup)
      .find(SELECTORS.basicInputs.radio1)
      .check()
      .should("be.checked");

    cy.get(SELECTORS.basicInputs.radio2)
      .check()
      .should("be.checked");

    cy.get(SELECTORS.basicInputs.radio1).should("not.be.checked");
  });

  it("Hidden input keeps its default value (get, should)", () => {
    cy.get(SELECTORS.basicInputs.hiddenInput)
      .should("exist")
      .and("have.value", "bob");
  });

  it("Send Inputs button populates status message and form results (click, get, should)", () => {
    cy.get(SELECTORS.basicInputs.sendButton).click();

    cy.get(SELECTORS.basicInputs.statusMessage)
      .should("not.be.empty")
      .and("contain.text", "Submission successful!");

    cy.get(SELECTORS.basicInputs.formResults)
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
    cy.get(SELECTORS.textInputs.formWrapper)
      .find(SELECTORS.textInputs.formHeading)
      .should("have.text", "Text Inputs Form");
  });

  it("Text, search and password inputs reflect typed values (get, type, should)", () => {
    cy.get(SELECTORS.textInputs.textInput)
      .type("Hello world")
      .should("have.value", "Hello world");

    cy.get(SELECTORS.textInputs.searchInput)
      .type("cypress query")
      .should("have.value", "cypress query");

    cy.get(SELECTORS.textInputs.passwordInput)
      .type("s3cret!")
      .should("have.value", "s3cret!");
  });

  it("Valid submission populates status message and form results (get, type, click, should)", () => {
    cy.get(SELECTORS.textInputs.textInput).type("John Doe");
    cy.get(SELECTORS.textInputs.passwordInput).type("Pa55word!");
    cy.get(SELECTORS.textInputs.emailInput).type("john@example.com");
    cy.get(SELECTORS.textInputs.urlInput).type("https://example.com");
    cy.get(SELECTORS.textInputs.telInput).type("+48123456789");
    cy.get(SELECTORS.textInputs.sendButton).click();

    cy.get(SELECTORS.textInputs.statusMessage)
      .should("contain.text", "Submission successful!");

    cy.get(SELECTORS.textInputs.formResults)
      .should("contain.text", "Submitted Values")
      .and("contain.text", "John Doe")
      .and("contain.text", "john@example.com")
      .and("contain.text", "https://example.com")
      .and("contain.text", "+48123456789");
  });

  it("Make All Fields - required adds the required attribute to inputs (click, get, should)", () => {
    cy.get(SELECTORS.textInputs.textInput).should("not.have.attr", "required");
    cy.get(SELECTORS.textInputs.emailInput).should("not.have.attr", "required");

    cy.get(SELECTORS.textInputs.requiredToggle).click();

    cy.get(SELECTORS.textInputs.textInput).should("have.attr", "required");
    cy.get(SELECTORS.textInputs.emailInput).should("have.attr", "required");
    cy.get(SELECTORS.textInputs.passwordInput).should("have.attr", "required");
  });
});
