/// <reference types="cypress" />

import { LOCAL_STORAGE_SELECTORS as SEL } from "../selectors/pages/storage/local-storage.selectors";

describe("Local Storage (/pages/storage/local-storage/)", () => {
  beforeEach(() => {
    cy.visit("/pages/storage/local-storage/", {
      onBeforeLoad(win) {
        win.localStorage.clear();
      },
    });
  });

  it("Storage list shows no-items placeholder on first load (get, should)", () => {
    cy.get(SEL.storageList)
      .should("contain.text", "No items found");
  });

  it("Create Items populates the list and localStorage (click, get, should, then)", () => {
    cy.get(SEL.createItemsButton).click();

    cy.get(SEL.storageList)
      .should("contain.text", "userLocalData")
      .and("not.contain.text", "No items found");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("userLocalData"))
        .to.equal("user local storage data");
      expect(win.localStorage.getItem("userLocalSessionId"))
        .to.match(/^XYZ\d+$/);
    });
  });

  it("Delete All Items clears localStorage and shows the placeholder again (click, get, should)", () => {
    cy.get(SEL.createItemsButton).click();
    cy.get(SEL.storageList).should("contain.text", "userLocalData");

    cy.get(SEL.deleteItemsButton).click();

    cy.get(SEL.storageList).should("contain.text", "No items found");

    cy.window().then((win) => {
      expect(win.localStorage.getItem("userLocalData")).to.be.null;
      expect(win.localStorage.getItem("userLocalSessionId")).to.be.null;
    });
  });

  it("Create Items twice does not duplicate userLocalData (click, then)", () => {
    cy.get(SEL.createItemsButton).click();
    cy.window().then((win) => {
      expect(win.localStorage.getItem("userLocalData"))
        .to.equal("user local storage data");
    });

    cy.get(SEL.createItemsButton).click();
    cy.window().then((win) => {
      const dataCount = win.localStorage.getItem("userLocalData");
      expect(dataCount).to.equal("user local storage data");
    });
  });
});
