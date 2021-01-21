import { render, waitFor } from "../../test-utils";
import { NotFound } from "../404";

describe("<NotFound />", () => {
  it("should render OK", async () => {
    render(<NotFound />);

    await waitFor(() => {
      expect(document.title).toBe("Not Fouund | Nuber Eats");
    });
  });
});
