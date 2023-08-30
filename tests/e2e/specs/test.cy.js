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
    cy.get(".col-3").contains("andrzej").next().next().next().click();
  });
  it("add empty thing - check error", () => {
    cy.visit("/things?lang=pl");
    cy.wait(1000);
    cy.get("#add").trigger("click");
    cy.wait(1000);
    cy.get(".modal-title")
      .should("be.visible")
      .should("have.text", "Kasa zamknięta");
  });
});
