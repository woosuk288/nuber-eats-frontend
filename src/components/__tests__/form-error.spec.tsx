import { render } from "@testing-library/react";
import { FormError } from "../form-error";

describe("<FormError />", () => {
  it("should OK with props", () => {
    const { getByText } = render(<FormError errorMessage="test" />);
    getByText("test");
  });
});
