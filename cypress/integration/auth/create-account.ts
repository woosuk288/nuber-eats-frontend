describe("Create Account", () => {
  const user = cy;
  it("should see eamil / password validation errors", () => {
    user.visit("/");
    user.findByText("Create an Account").click();
    user.findByPlaceholderText(/email/i).type("client@na");
    user.findByRole("alert").should("have.text", "Please enter a valid email");
    user.findByPlaceholderText(/email/i).clear();
    user.findByRole("alert").should("have.text", "Email is required");
    user.findByPlaceholderText(/email/i).type("client12345@naver.com");
    user
      .findByPlaceholderText(/password/i)
      .type("a")
      .clear();
    user.findByRole("alert").should("have.text", "Password is required");
    user.find;
  });

  it("should be able to create account", () => {
    user.visit("/create-account");
    user.findByPlaceholderText(/email/i).type("e2etest2@naver.com");
    user.findByPlaceholderText(/password/i).type("e2etest2@naver.com");
    user.findByRole("button").click();
    user.wait(1000);
    user.findByPlaceholderText(/email/i).type("e2etest2@naver.com");
    user.findByPlaceholderText(/password/i).type("e2etest2@naver.com");
    user.findByRole("button").click();
    user.window().its("localStorage.nuber-token").should("be.a", "string");
  });
});