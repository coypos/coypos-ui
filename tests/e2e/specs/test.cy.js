// https://docs.cypress.io/api/table-of-contents

describe("Cash register Language test", () => {
  it("Cash register open View PL", () => {
    cy.visit("/?lang=pl");
    cy.contains("h1", "KASA OTWARTA");
  });
  it("Visits the app root url EN", () => {
    cy.visit("/?lang=en");
    cy.contains("h1", "CASH REGISTER OPEN");
  });
  it("Visits the app root url UK", () => {
    cy.visit("/?lang=uk");
    cy.contains("h1", "ВІДКРИТА КАСА");
  });
  it("Visits the app root url DE", () => {
    cy.visit("/?lang=de");
    cy.contains("h1", "KASSE GEÖFFNET");
  });
  it("Things View button PL", () => {
    cy.visit("/things?lang=pl");
    cy.contains("#add", "Dodaj");
  });
  it("Things View button EN", () => {
    cy.visit("/things?lang=en");
    cy.contains("#add", "Add");
  });
  it("Things View button UK", () => {
    cy.visit("/things?lang=uk");
    cy.contains("#add", "додати");
  });
  it("Things View button DE", () => {
    cy.visit("/things?lang=de");
    cy.contains("#add", "Hinzufügen");
  });
});

describe("user going to cart and selecting products", () => {
  it("select breads", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("div").contains("START").click();
    cy.url().should("include", "/cart?lang=pl");
    cy.get("div").contains("Pieczywo").click();
    cy.url().should("include", "/category?category=2&lang=pl");
    cy.get("div").contains("Chleby").click();
    cy.url().should("include", "/products?category=3&lang=pl");
  });
  it("select fruits", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("div").contains("START").click();
    cy.url().should("include", "/cart?lang=pl");
    cy.get("div").contains("Owoce i Warzywa").click();
    cy.url().should("include", "/category?category=1&lang=pl");
    cy.get("div").contains("Owoce").click();
    cy.url().should("include", "products?category=1&lang=pl");
  });
});

describe("user changing languages", () => {
  it("changing languages on home", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("#en").click();
    cy.url().should("include", "lang=en");
    cy.get("div").contains("HELP");
    cy.get("#uk").click();
    cy.url().should("include", "lang=uk");
    cy.get("div").contains("ДОПОМОГА");
    cy.get("#de").click();
    cy.url().should("include", "lang=de");
    cy.get("div").contains("HELFEN");
    cy.get("#pl").click();
    cy.url().should("include", "lang=pl");
    cy.get("div").contains("POMOC");
  });
  it("changing languages on cart", () => {
    cy.visit("/cart?lang=pl");
    cy.wait(1000);
    cy.get("#en").click();
    cy.url().should("include", "lang=en");
    cy.get("div").contains("HELP");
    cy.get("#uk").click();
    cy.url().should("include", "lang=uk");
    cy.get("div").contains("ДОПОМОГА");
    cy.get("#de").click();
    cy.url().should("include", "lang=de");
    cy.get("div").contains("HELFEN");
    cy.get("#pl").click();
    cy.url().should("include", "lang=pl");
    cy.get("div").contains("POMOC");
  });
});

describe("Things test", () => {
  it("add one thing", () => {
    cy.visit("/things?lang=pl");
    cy.wait(1000);
    cy.get("#input").type("andrzej");
    cy.wait(1000);
    cy.get("#add").trigger("click");
    cy.wait(1000);
  });
  it("thing should be visible", () => {
    cy.visit("/things?lang=pl");
    cy.wait(1000);
    cy.get(".col-3")
      .contains("andrzej")
      .first()
      .next()
      .should("have.text", "jezrdna")
      .next();
  });
  it("delete one thing", () => {
    cy.visit("/things?lang=pl");
    cy.wait(1000);
    cy.get(".col-3")
      .contains("andrzej")
      .next()
      .next()
      .next()
      .children()
      .click();
  });
});
