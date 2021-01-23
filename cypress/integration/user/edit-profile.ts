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
    user.visit("/edit-profile");
    user.findByPlaceholderText(/email/i).clear().type("e2etest2change@naver.com");
    user.findByRole("button").click();
  });
});
