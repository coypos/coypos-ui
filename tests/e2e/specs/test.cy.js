// https://docs.cypress.io/api/table-of-contents
//sprawdzenie dzialania jezykow
describe("Cash register Language test", () => {
  it("Cash register open View PL", () => {
    cy.visit("/?lang=pl");
    cy.contains("h1", "KASA OTWARTA");
  });
  it("Visits the app root url EN", () => {
    cy.visit("/?lang=en");
    cy.contains("h1", "CASH REGISTER OPEN");
  });
  it("Visits the app root url UA", () => {
    cy.visit("/?lang=ua");
    cy.contains("h1", "ВІДКРИТА КАСА");
  });
  it("Visits the app root url DE", () => {
    cy.visit("/?lang=de");
    cy.contains("h1", "KASSE GEÖFFNET");
  });
});

//uzytkownik skanuje swoja karte, pozniej skanuje produkt i placi
describe("user scan card and product then pay for it", () => {
  it("can card and product then pay for it", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("div").contains("START").click();
    cy.get("div").contains("Pieczywo").should("exist");
    cy.wait(1000);
    cy.get("body").type("1");
    cy.get("body").type("2");
    cy.get("body").type("3");
    cy.get("body").type("4");
    cy.get("body").type("5");
    cy.get("body").type("6");
    cy.get("body").type("{enter}");
    cy.wait(1000);
    cy.get("div").contains("Witaj, ").should("exist");
    cy.get("body").type("2");
    cy.get("body").type("1");
    cy.get("body").type("3");
    cy.get("body").type("7");
    cy.get("body").type("{enter}");
    cy.get("div").contains("Bułka Kajzerka").should("exist");
    cy.wait(1000);
    cy.get("div").contains("Zakończ i zapłać").click();
    cy.get("div").contains("Gotówka").should("exist");
    cy.get("div").contains("Gotówka").click();
    cy.get("div").contains("START").should("exist");
  });
});

//dodanie produktow do koszyka poprzez liste
describe("user going to cart and selecting products", () => {
  it("select breads", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("div").contains("START").click();
    cy.get("div").contains("Pieczywo").should("exist");
    cy.get("div").contains("Pieczywo").click();
    cy.get("div").contains("Chleb").should("exist");
    cy.get("div").contains("Chleb").click();
    cy.get("div").contains("Chleb wiejski").should("exist");
    cy.get("div").contains("Chleb wiejski").click();
    cy.get("div").contains("1").click();
    cy.get("div").contains("Zatw").click();
    cy.get("div").contains("Pieczywo").should("exist");
    cy.get("div").contains("Chleb wiejski").should("exist");
  });
  it("select fruits", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("div").contains("START").click();
    cy.get("div").contains("Owoce i Warzywa").should("exist");
    cy.get("div").contains("Owoce i Warzywa").click();
    cy.get("div").contains("Owoce").should("exist");
    cy.get("div").contains("Owoce").click();
    cy.get("div").contains("Banany").should("exist");
    cy.get("div").contains("Banany").click();
    cy.get("div").contains("1").click();
    cy.get("div").contains("Zatw").click();
    cy.get("div").contains("Owoce i Warzywa").should("exist");
    cy.get("div").contains("Banany").should("exist");
  });
});
//uzytkownik klika we flagi i oczekuje zmiany jezyka
describe("user changing languages", () => {
  it("changing languages on home", () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
      // returning false here prevents Cypress from
      // failing the test
      return false;
    });
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("#en").click();
    cy.url().should("include", "lang=en");
    cy.get("div").contains("HELP");
    cy.get("#ua").click();
    cy.url().should("include", "lang=ua");
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
    cy.get("div").contains("YOUR SHOPPING");
    cy.get("#ua").click();
    cy.url().should("include", "lang=ua");
    cy.get("div").contains("ВАШІ ПОКУПКИ");
    cy.get("#de").click();
    cy.url().should("include", "lang=de");
    cy.get("div").contains("IHR EINKAUF");
    cy.get("#pl").click();
    cy.url().should("include", "lang=pl");
    cy.get("div").contains("TWOJE ZAKUPY");
  });
});

//uzytkownik skanuje produkt pozniej dodaje produkt z listy nastepnie placi

//uzytkownik dodaje produkt za pomoca kodu kreskowego z menu i placi
//uzytkownik wyszukuje produkt w lupce i placi
//uzytkownik kupuje produkt dla niepelnoletnich, sprzedawca zatwierdza
//uzytkownik kupuje produkt dla niepelnoletnich, sprzedawca niezatwierdza
//uzytkownik skanuje dwa razy ten sam produkt po czym sprzedawca jeden usuwa
//uzytkownik zmienia jezyk kupuje produkt z listy i placi
//sprzedawca zeruje koszyk po porzuceniu przez klienta
//uzytkownik szuka produktu w liscie po czym rezygnuje i skanuje produkt
//sprzedawca wpisuje bledne dane do swojej karty
//klient wpisuje zly kod kreskowy
