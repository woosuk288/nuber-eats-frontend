describe("Edit Profile", () => {
  const user = cy;

  beforeEach(() => {
    user.login("e2etest2@naver.com", "e2etest2@naver.com");
  });

  it("should ", () => {
    user.get(".svg-inline--fa").click();
    user.title().should("eq", "Edit Profile | Nuber Eats");
  });
  it("should change email", () => {
    user.intercept("POST", "http://localhost:4000/graphql", (req) => {
      if (req.body.operationName === "editProfile") {
        req.body.variables.input.email = "e2etest2@naver.com";
      }
    });

    user.visit("/edit-profile");
    user.findByPlaceholderText(/email/i).clear().type("e2etest2change@naver.com");
    user.findByRole("button").click();
  });
});
