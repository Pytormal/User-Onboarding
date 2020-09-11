describe("Testing our form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });
  it("fills out name", () => {
    const name = "Alex Andrew";
    const email = "pytormal@live.com";
    //   const password = "passwordS";
      const password = "  ";
    //we are filling out the name input and making sure that it has the correct value
    cy.get("input#name").type(name).should("have.value", name);
    //we are filling out the email input and making sure that it has the correct value
    cy.get("input#email").type(email).should("have.value", email);

    cy.get("input#password").type(password).should("have.value", password);

      cy.get("input#terms").click(true)
      
      cy.get("form").submit(true)
  });
});
