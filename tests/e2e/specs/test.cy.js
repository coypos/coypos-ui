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
    cy.wait(1000)
    cy.get("#input").type("andrzej");
    cy.wait(1000)
    cy.get("#add").click();
  });
  it("thing should be visible", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000)
    cy.get(".col-3")
      .contains("andrzej")
      .first()
      .next()
      .should("have.text", "jezrdna")
      .next();
  });
  it("delete one thing", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000)
    cy.get(".col-3").contains("andrzej").next().next().next().click();
  });
});
