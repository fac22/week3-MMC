"use strict";

// beforeEach(() => {
//   cy.task("resetDb");
// });

it("can run a test", () => {
  assert.equal(1, 1);
});

it("Can navigate to the home page", () => {
  cy.visit("http://localhost:3003");
});

it("Can navigate to the signup page", () => {
  cy.visit("http://localhost:3003/");
  cy.contains("Sign-Up").click();
  cy.url().should("include", "/sign-up");
});

// it("Can make a new user", () => {
//   cy.visit("http://localhost:3003/");
//   cy.get("input[name='name']").type("mo");
//   cy.get("input[name='email']").type("mo@mo.com");
//   cy.getfind("input[name='password']").type("12345");
//   cy.contains("Sign-Up").click();
//   cy.url().should("include", "/");
// });
