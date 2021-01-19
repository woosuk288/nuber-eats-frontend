import { render, waitFor } from "@testing-library/react";
import { HelmetProvider } from "react-helmet-async";
import { NotFound } from "../404";
import { BrowserRouter as Router } from "react-router-dom";

describe("<NotFound />", () => {
  it("should render OK", async () => {
    render(
      <HelmetProvider>
        <Router>
          <NotFound />
        </Router>
      </HelmetProvider>
    );

    await waitFor(() => {
      expect(document.title).toBe("Not Fouund | Nuber Eats");
    });
  });
});
