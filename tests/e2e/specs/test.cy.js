// https://docs.cypress.io/api/table-of-contents

describe("Cash register open View Language test", () => {
  it("Cash register open View PL", () => {
    cy.visit("/?lang=pl");
    cy.contains("h1", "Kasa Otwarta");
  });
  it("Visits the app root url EN", () => {
    cy.visit("/?lang=en");
    cy.contains("h1", "Cash register open");
  });
  it("Visits the app root url UK", () => {
    cy.visit("/?lang=uk");
    cy.contains("h1", "Відкрита каса");
  });
  it("Visits the app root url DE", () => {
    cy.visit("/?lang=de");
    cy.contains("h1", "Kasse geöffnet");
  });
});

describe("Things test", () => {
  it("add one thing", () => {
    cy.visit("/?lang=pl");
    cy.get("#input").type("kajak");

    cy.get("#add").click();
  });
  it("thing should be visible", () => {
    cy.visit("/?lang=pl");
    cy.get(".col-3")
      .contains("kajak")
      .first()
      .next()
      .should("have.text", "kajak")
      .next();
  });
  it("delete one thing", () => {
    cy.visit("/?lang=pl");
    cy.get(".col-3").contains("kajak").next().next().next().click();

    cy.get("#add").click();
  });
});
