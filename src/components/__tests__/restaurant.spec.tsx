import { render } from "@testing-library/react";
import Restaurant from "../restaurant";
import { BrowserRouter as Router } from "react-router-dom";

describe("<Restaurant />", () => {
  it("should OK with props", () => {
    const restaurantProps = {
      id: 1,
      coverImg: "x",
      name: "nameTest",
      categoryName: "categoryTest",
    };
    const { getByText, container } = render(
      <Router>
        <Restaurant {...restaurantProps} />
      </Router>
    );
    getByText(restaurantProps.name);
    getByText(restaurantProps.categoryName);
    expect(container.firstChild).toHaveAttribute("href", `/restaurants/${restaurantProps.id}`);
  });
});
