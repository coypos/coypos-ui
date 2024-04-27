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
    cy.get("div").contains("Bułka kajzerka").should("exist");
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
describe("user scan product and add product form list then pay for it", () => {
  it("user scan product and add product form list then pay for it", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("div").contains("START").click();
    cy.get("div").contains("Pieczywo").should("exist");
    cy.wait(1000);
    cy.get("body").type("2");
    cy.get("body").type("3");
    cy.get("body").type("3");
    cy.get("body").type("8");
    cy.get("body").type("{enter}");
    cy.wait(1000);
    cy.get("div").contains("Chleb wiejski").should("exist");

    cy.get("div").contains("Owoce i Warzywa").click();
    cy.get("div").contains("Warzywa").should("exist");
    cy.get("div").contains("Warzywa").click();
    cy.get("div").contains("Sałata").should("exist");
    cy.get("div").contains("Sałata").click();
    cy.get("div").contains("1").click();
    cy.wait(200);

    cy.get("div").contains("Zatw").click();
    cy.wait(200);
    cy.get("div").contains("Owoce i Warzywa").should("exist");
    cy.get("div").contains("Sałata").should("exist");
    cy.wait(1000);
    cy.get("div").contains("Zakończ i zapłać").click();
    cy.get("div").contains("Karta prezentowa").should("exist");
    cy.get("div").contains("Karta prezentowa").click();
    cy.get("div").contains("START").should("exist");
  });
});
//uzytkownik dodaje produkt za pomoca kodu kreskowego z menu i placi
describe("user add product using barcode then pay for it", () => {
  it("user add product using barcode then pay for it", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("div").contains("START").click();
    cy.get("div").contains("Pieczywo").should("exist");
    cy.wait(1000);
    cy.get("#barcode").click();
    cy.get("h1").contains("Podaj kod Kreskowy").should("exist");
    cy.wait(1000);
    cy.get("div").contains("6").click();
    cy.wait(200);
    cy.get("div").contains("1").click();
    cy.wait(20);

    cy.get("div").contains("4").click();
    cy.wait(200);
    cy.get(".col-4").contains("0").click();
    cy.wait(200);
    cy.get("div").contains("Zatw").click();
    cy.wait(200);
    cy.get("div").contains("Jabłko").should("exist");
    cy.get("div").contains("Zakończ i zapłać").click();
    cy.get("div").contains("Karta prezentowa").should("exist");
    cy.get("div").contains("Karta prezentowa").click();
    cy.get("div").contains("START").should("exist");
  });
});
//uzytkownik wyszukuje produkt w lupce i placi
describe("user search for  product then pay for it", () => {
  it("user search for  product then pay for it", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("div").contains("START").click();
    cy.get("div").contains("Pieczywo").should("exist");
    cy.wait(1000);
    cy.get("#search").click();
    cy.get("div").contains("SPACJA").should("exist");
    cy.get(".key").contains("C").click();
    cy.wait(200);
    cy.get(".key").contains("O").click();
    cy.wait(200);
    cy.get(".key").contains("C").click();
    cy.wait(200);
    cy.get("p").contains("Coca Cola").should("exist");
    cy.get("div").contains("Coca Cola").click();
    cy.get("div").contains("3").click();
    cy.get("div").contains("Coca Cola").should("exist");
    cy.wait(200);
    cy.get("div").contains("Zatw").click();
    cy.wait(1000);
    cy.get("div").contains("Zakończ i zapłać").click();
    cy.get("div").contains("Gotówka").should("exist");
    cy.get("div").contains("Gotówka").click();
    cy.get("div").contains("START").should("exist");
  });
});
//uzytkownik kupuje produkt dla niepelnoletnich, sprzedawca zatwierdza
describe("user add 18+ product, seller accept it", () => {
  it("user add 18+ product, seller accept it", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("div").contains("START").click();
    cy.get("div").contains("Pieczywo").should("exist");
    cy.wait(1000);
    cy.get("body").type("9");
    cy.get("body").type("9");
    cy.get("body").type("9");
    cy.get("body").type("9");
    cy.get("body").type("{enter}");
    cy.get("h1").contains("KASA ZAMKNIETA").should("exist");
    cy.wait(1000);

    cy.get("div").contains("Wezwij sprzedawce").click();
    cy.wait(1000);

    cy.get("body").type("4");
    cy.get("body").type("0");
    cy.get("body").type("4");
    cy.get("body").type("4");
    cy.get("body").type("7");
    cy.get("body").type("8");
    cy.get("body").type("0");
    cy.get("body").type("5");
    cy.get("body").type("7");
    cy.get("body").type("2");
    cy.get("body").type("{enter}");
    cy.get("div").contains("Wpisz PIN").should("exist");
    cy.wait(200);
    cy.get(".col-4").contains("1").click();
    cy.get(".col-4").contains("2").click();
    cy.get(".col-4").contains("3").click();
    cy.get(".col-4").contains("4").click();
    cy.get(".col-4").contains("Zatw").click();
    cy.get("button").contains(" Potwierdz 18+").should("exist");
    cy.get("button").contains(" Potwierdz 18+").click();
    cy.get(".backbutton").click();
    cy.get("div").contains("Wódka").should("exist");
  });
});
//uzytkownik kupuje produkt dla niepelnoletnich, sprzedawca niezatwierdza
describe("user add 18+ product, seller not accept it", () => {
  it("user add 18+ product, seller not accept it", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("div").contains("START").click();
    cy.get("div").contains("Pieczywo").should("exist");
    cy.wait(1000);
    cy.get("body").type("9");
    cy.get("body").type("9");
    cy.get("body").type("9");
    cy.get("body").type("9");
    cy.get("body").type("{enter}");
    cy.get("h1").contains("KASA ZAMKNIETA").should("exist");
    cy.wait(1000);

    cy.get("div").contains("Wezwij sprzedawce").click();
    cy.wait(1000);

    cy.get("body").type("4");
    cy.get("body").type("0");
    cy.get("body").type("4");
    cy.get("body").type("4");
    cy.get("body").type("7");
    cy.get("body").type("8");
    cy.get("body").type("0");
    cy.get("body").type("5");
    cy.get("body").type("7");
    cy.get("body").type("2");
    cy.get("body").type("{enter}");
    cy.get("div").contains("Wpisz PIN").should("exist");
    cy.wait(200);
    cy.get(".col-4").contains("1").click();
    cy.get(".col-4").contains("2").click();
    cy.get(".col-4").contains("3").click();
    cy.get(".col-4").contains("4").click();
    cy.get(".col-4").contains("Zatw").click();
    cy.get("button").contains("Nie jest 18+").should("exist");
    cy.get("button").contains("Nie jest 18+").click();
    cy.get(".backbutton").click();
    cy.get("div").contains("Wódka").should("not.exist");
  });
});
//uzytkownik skanuje dwa razy ten sam produkt po czym sprzedawca jeden usuwa

describe("user scan twice product, seller remove one", () => {
  it("user scan twice product, seller remove one", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("div").contains("START").click();
    cy.get("div").contains("Pieczywo").should("exist");
    cy.wait(1000);
    cy.get("body").type("2");
    cy.get("body").type("1");
    cy.get("body").type("3");
    cy.get("body").type("7");
    cy.get("body").type("{enter}");
    cy.wait(1000);

    cy.get("body").type("6");
    cy.get("body").type("1");
    cy.get("body").type("4");
    cy.get("body").type("0");
    cy.get("body").type("{enter}");
    cy.get("div").contains("Bułka kajzerka").should("exist");
    cy.get("div").contains("Jabłko").should("exist");

    cy.get("#help").click();
    cy.wait(1000);
    cy.get("div").contains("Wezwij sprzedawce").click();
    cy.wait(1000);

    cy.get("body").type("4");
    cy.get("body").type("0");
    cy.get("body").type("4");
    cy.get("body").type("4");
    cy.get("body").type("7");
    cy.get("body").type("8");
    cy.get("body").type("0");
    cy.get("body").type("5");
    cy.get("body").type("7");
    cy.get("body").type("2");
    cy.get("body").type("{enter}");
    cy.get("div").contains("Wpisz PIN").should("exist");
    cy.wait(200);
    cy.get(".col-4").contains("1").click();
    cy.get(".col-4").contains("2").click();
    cy.get(".col-4").contains("3").click();
    cy.get(".col-4").contains("4").click();
    cy.get(".col-4").contains("Zatw").click();
    cy.get("div").contains("Usuń produkt z koszyka").click();

    cy.get("select").select("Jabłko");
    cy.get("button").contains("Potwierdź").click();
    cy.get(".backbutton").click();
    cy.get("div").contains("Jabłko").should("not.exist");
    cy.get("div").contains("Bułka kajzerka").should("exist");
  });
});

//uzytkownik zmienia jezyk kupuje produkt z listy i placi

describe("user changing language, select product and pay for it", () => {
  it("user changing language, select product and pay for it", () => {
    cy.visit("/?lang=pl");

    cy.get("div").contains("START").click();
    cy.get("div").contains("Pieczywo").should("exist");
    cy.wait(200);
    cy.get("#en").click();
    cy.url().should("include", "lang=en");
    cy.get("div").contains("Finish and pay").should("exist");
    cy.get("div").contains("Fruits and Vegetables").click();
    cy.get("div").contains("Fruits").should("exist");
    cy.get("div").contains("Fruits").click();
    cy.get("div").contains("Bananas").should("exist");
    cy.get("div").contains("Bananas").click();
    cy.wait(200);

    cy.get("div").contains("1").click();
    cy.get("div").contains("Appr").click();
    cy.wait(200);
    cy.get("div").contains("Fruits and Vegetables").should("exist");
    cy.get("div").contains("Bananas").should("exist");
    cy.wait(1000);
    cy.get("div").contains("Finish and pay").click();
    cy.get("div").contains("Cash").should("exist");
    cy.get("div").contains("Cash").click();
    cy.get("div").contains("START").should("exist");
  });
});

//sprzedawca zeruje koszyk po porzuceniu przez klienta

describe("user scan twice product, seller remove all", () => {
  it("user scan twice product, seller remove all", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("div").contains("START").click();
    cy.get("div").contains("Pieczywo").should("exist");
    cy.wait(1000);
    cy.get("body").type("2");
    cy.get("body").type("1");
    cy.get("body").type("3");
    cy.get("body").type("7");
    cy.get("body").type("{enter}");
    cy.wait(1000);

    cy.get("body").type("6");
    cy.get("body").type("1");
    cy.get("body").type("4");
    cy.get("body").type("0");
    cy.get("body").type("{enter}");
    cy.get("div").contains("Bułka kajzerka").should("exist");
    cy.get("div").contains("Jabłko").should("exist");

    cy.get("#help").click();
    cy.wait(1000);
    cy.get("div").contains("Wezwij sprzedawce").click();
    cy.wait(1000);

    cy.get("body").type("4");
    cy.get("body").type("0");
    cy.get("body").type("4");
    cy.get("body").type("4");
    cy.get("body").type("7");
    cy.get("body").type("8");
    cy.get("body").type("0");
    cy.get("body").type("5");
    cy.get("body").type("7");
    cy.get("body").type("2");
    cy.get("body").type("{enter}");
    cy.get("div").contains("Wpisz PIN").should("exist");
    cy.wait(200);
    cy.get(".col-4").contains("1").click();
    cy.get(".col-4").contains("2").click();
    cy.get(".col-4").contains("3").click();
    cy.get(".col-4").contains("4").click();
    cy.get(".col-4").contains("Zatw").click();
    cy.get("div").contains(" Wyczyść koszyk").click();
    cy.get(".backbutton").click();
    cy.get("div").contains("Jabłko").should("not.exist");
    cy.get("div").contains("Bułka kajzerka").should("not.exist");
  });
});
//uzytkownik szuka produktu w liscie po czym rezygnuje i skanuje produkt

describe("user search for product form list, leave it,  and  scan product then pay for it", () => {
  it("user search for product form list, leave it,  and  scan product then pay for it", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("div").contains("START").click();
    cy.get("div").contains("Pieczywo").should("exist");
    cy.wait(1000);

    cy.get("div").contains("Owoce i Warzywa").click();
    cy.get("div").contains("Warzywa").should("exist");
    cy.get("div").contains("Warzywa").click();
    cy.get("div").contains("Sałata").should("exist");
    cy.get(".backbutton").click();
    cy.wait(200);
    cy.get("div").contains("Sałata").should("not.exist");
    cy.get("div").contains("Owoce i Warzywa").should("exist");
    cy.wait(1000);

    cy.get("body").type("2");
    cy.get("body").type("3");
    cy.get("body").type("3");
    cy.get("body").type("8");
    cy.get("body").type("{enter}");
    cy.wait(1000);
    cy.get("div").contains("Chleb wiejski").should("exist");

    cy.get("div").contains("Zakończ i zapłać").click();
    cy.get("div").contains("Karta prezentowa").should("exist");
    cy.get("div").contains("Karta prezentowa").click();
    cy.get("div").contains("START").should("exist");
  });
});
//sprzedawca wpisuje bledne dane do swojej karty
describe("user scan twice product, seller use bad pin", () => {
  it("user scan twice product, seller use bad pin", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("div").contains("START").click();
    cy.get("div").contains("Pieczywo").should("exist");
    cy.wait(1000);
    cy.get("body").type("2");
    cy.get("body").type("1");
    cy.get("body").type("3");
    cy.get("body").type("7");
    cy.get("body").type("{enter}");
    cy.wait(1000);

    cy.get("body").type("6");
    cy.get("body").type("1");
    cy.get("body").type("4");
    cy.get("body").type("0");
    cy.get("body").type("{enter}");
    cy.get("div").contains("Bułka kajzerka").should("exist");
    cy.get("div").contains("Jabłko").should("exist");

    cy.get("#help").click();
    cy.wait(1000);
    cy.get("div").contains("Wezwij sprzedawce").click();
    cy.wait(1000);

    cy.get("body").type("4");
    cy.get("body").type("0");
    cy.get("body").type("4");
    cy.get("body").type("4");
    cy.get("body").type("7");
    cy.get("body").type("8");
    cy.get("body").type("0");
    cy.get("body").type("5");
    cy.get("body").type("7");
    cy.get("body").type("2");
    cy.get("body").type("{enter}");
    cy.get("div").contains("Wpisz PIN").should("exist");
    cy.wait(200);
    cy.get(".col-4").contains("1").click();
    cy.get(".col-4").contains("2").click();
    cy.get(".col-4").contains("3").click();
    cy.get(".col-4").contains("5").click();
    cy.get(".col-4").contains("Zatw").click();
    cy.get("div").contains(" Wyczyść koszyk").should("not.exist");
  });
});
//klient skanuje zly kod kreskowy
describe("user scan wrong barcode", () => {
  it("user scan wrong barcode", () => {
    cy.visit("/?lang=pl");
    cy.wait(1000);
    cy.get("div").contains("START").click();
    cy.get("div").contains("Pieczywo").should("exist");
    cy.wait(1000);
    cy.get("body").type("2");
    cy.get("body").type("2");
    cy.get("body").type("2");
    cy.get("body").type("2");
    cy.get("body").type("{enter}");
    cy.get("div")
      .contains("Przepraszamy, nie znaleziono zeskanowanego produktu.")
      .should("exist");
  });
});
