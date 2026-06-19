/// <reference types="cypress" />

import { SIMULATED_LOGIN_SELECTORS as SEL } from "../selectors/apps/simulated-login.selectors";
import { LoginCredentials } from "../types/interfaces";

const ADMIN: LoginCredentials = { username: "Admin", password: "AdminPass" };
const WRONG: LoginCredentials = { username: "Admin", password: "wrong" };

describe("Simulated Login (/apps/simulated-login/)", () => {
  beforeEach(() => {
    cy.clearCookies();
  });

  it("Custom command cy.login redirects to admin view on valid credentials (login, get, should, contains)", () => {
    cy.login(ADMIN);

    cy.url().should("include", "/apps/simulated-login/adminview/");
    cy.get(SEL.adminView.heading).should("have.text", "You are Admin");
  });

  it("Failed login shows incorrect message and stays on login page (login, get, should)", () => {
    cy.login(WRONG);

    cy.get(SEL.loginPage.loginMessage)
      .should("have.text", "Login Details Incorrect");

    cy.url().should("include", "/apps/simulated-login/");
    cy.get(SEL.loginPage.username).should("exist");
  });

  it("Logged in user can log out and the form returns (login, click, get, should)", () => {
    cy.login(ADMIN);

    cy.get(SEL.adminView.heading).should("have.text", "You are Admin");

    cy.get(SEL.adminView.adminLogoutLink).click();

    cy.url().should("not.include", "/adminview/");
    cy.get(SEL.loginPage.username).should("exist");
    cy.get(SEL.loginPage.password).should("exist");
  });

  it("Cookies carry the logged-in username after login (login, then)", () => {
    cy.login(ADMIN);

    cy.getCookies().then((cookies) => {
      const loggedIn = cookies.find((c) => c.name === "loggedin");
      expect(loggedIn?.value).to.equal(ADMIN.username);
    });
  });
});
