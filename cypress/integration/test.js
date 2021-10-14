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

// describe("list items", () => {
//     it("displays a list of items", () => {
//       cy.visit("http://localhost:3000/");
//       cy.contains("Dune");

//       cy.contains("T-Shirt");
//       cy.contains("Goofy movie");
//       cy.contains("Perfume");
//       cy.contains("Eames Chair");
//     });
//   });

//   describe("create item", () => {
//     it("can create a new item", () => {
//       cy.visit("/");
//       cy.get("input[name='new_user'").type("danilo");
//       cy.get("input[name='product_name'").type("Mattress");
//       cy.get("input[name='product_description'").type(
//         "Better than sleeping on the floor"
//       );
//       cy.get("input[name='product_price'").type("20.99");
//       cy.get("input[type='numeric']").click();
//       cy.contains("Mattress");
//     });
//   });

// it("Can make a new user", () => {
//   cy.visit("http://localhost:3003/");
//   cy.get("input[name='name']").type("mo");
//   cy.get("input[name='email']").type("mo@mo.com");
//   cy.getfind("input[name='password']").type("12345");
//   cy.contains("Sign-Up").click();
//   cy.url().should("include", "/");
// });
