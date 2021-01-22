describe("Log In", () => {
  it("should see login page", () => {
    cy.visit("/").title().should("eq", "Login | Nuber Eats");
  });

  it("should fill out the form", () => {
    cy.visit("/")
      .findByPlaceholderText(/email/i)
      .type("client12345@naver.com")
      .findByPlaceholderText(/password/i)
      .type("12345")
      .findByRole("button")
      .should("not.have.class", "pointer-events-none");
    // to do (can log in)
  });

  it("should see email and password validation errors", () => {
    cy.visit("/")
      .findByPlaceholderText(/email/i)
      .type("client@na")
      .findByRole("alert")
      .should("have.text", "Please enter a valid email");
  });
});
