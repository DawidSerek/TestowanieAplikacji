/// <reference types="cypress" />

import { FILE_UPLOAD_SELECTORS as SEL } from "../selectors/pages/files/file-upload.selectors";

describe("File Upload (/pages/files/file-upload/)", () => {
  beforeEach(() => {
    cy.visit("/pages/files/file-upload/");
  });

  it("Selects a file and status reports upload success (selectFile, get, should)", () => {
    cy.get(SEL.fileInput).selectFile("cypress/fixtures/file-upload/hello.txt");

    cy.get(SEL.statusMessage)
      .should("contain.text", "Upload successful!");
  });

  it("Status initially empty before upload (get, should)", () => {
    cy.get(SEL.statusMessage).should("be.empty");
  });

  it("Selects the file-type radio before selecting the file (get, check, should)", () => {
    cy.get(SEL.imageRadio).should("not.be.checked");
    cy.get(SEL.fileRadio).check().should("be.checked");
    cy.get(SEL.imageRadio).should("not.be.checked");
  });

  it("Drop zone is present and visible (get, should)", () => {
    cy.get(SEL.dropZone)
      .should("be.visible")
      .and("contain.text", "Drag & Drop");
  });
});
