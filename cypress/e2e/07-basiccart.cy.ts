/// <reference types="cypress" />

import { BASICCART_SELECTORS as SEL } from "../selectors/apps/basiccart.selectors";
import { Product } from "../types/interfaces";

describe("Basiccart (/apps/basiccart/)", () => {
  let product: Product;

  before(() => {
    cy.fixture("basiccart/mystic-apparatus-1.json").then((p) => {
      product = p as Product;
    });
  });

  beforeEach(() => {
    cy.visit("/apps/basiccart/", {
      onBeforeLoad(win) {
        win.localStorage.clear();
      },
    });

    cy.get(SEL.productCard).should("have.length.greaterThan", 0);
  });

  it("Browse button is visible on load (get, should)", () => {
    cy.get(SEL.browseButton).should("be.visible");
  });

  it("First product card shows the known fixture name and price (get, then, should)", () => {
    cy.get(SEL.productCard).first().within(() => {
      cy.get(SEL.productTitle).should("have.text", product.name);
      cy.get(SEL.productPrice).should("contain.text", String(product.price));
    });
  });

  it("Adding the fixture product to cart increments cart count and stores id (click, get, assertProductInCart, then)", () => {
    cy.get(SEL.productCard).first().find(SEL.addToCartButton).click();

    cy.get(SEL.cartCount).should("have.text", "1");

    cy.assertProductInCart(product);

    cy.window().then((win) => {
      const cart: number[] = JSON.parse(
        win.localStorage.getItem("cart") ?? "[]"
      );
      const total = cart.reduce<number>((sum) => sum + product.price, 0);
      expect(total).to.equal(product.price);
    });
  });

  it("Adding the same product twice puts two ids into localStorage (click, assertProductInCart, then)", () => {
    cy.get(SEL.productCard).first().find(SEL.addToCartButton).click();
    cy.get(SEL.productCard).first().find(SEL.addToCartButton).click();

    cy.get(SEL.cartCount).should("have.text", "2");

    cy.assertProductInCart(product);

    cy.window().then((win) => {
      const cart: number[] = JSON.parse(
        win.localStorage.getItem("cart") ?? "[]"
      );
      expect(cart.filter((id) => id === product.id)).to.have.length(2);
    });
  });
});
