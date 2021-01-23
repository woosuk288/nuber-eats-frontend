describe("Log In", () => {
  const user = cy;
  it("should see login page", () => {
    cy.visit("/").title().should("eq", "Login | Nuber Eats");
  });

  it("should see email and password validation errors", () => {
    user.visit("/");
    user.findByPlaceholderText(/email/i).type("client@na");
    user.findByRole("alert").should("have.text", "Please enter a valid email");
    user.findByPlaceholderText(/email/i).clear();
    user.findByRole("alert").should("have.text", "Email is required");
    user.findByPlaceholderText(/email/i).type("client@naver.com");
    user
      .findByPlaceholderText(/password/i)
      .type("a")
      .clear();
    user.findByRole("alert").should("have.text", "Password is required");
  });

  it("should fill out the form and log in", () => {
    user.visit("/");
    user.findByPlaceholderText(/email/i).type("client12345@naver.com");
    user.findByPlaceholderText(/password/i).type("12345");
    user.findByRole("button").should("not.have.class", "pointer-events-none").click();

    user.window().its("localStorage.nuber-token").should("be.a", "string");
  });
});
