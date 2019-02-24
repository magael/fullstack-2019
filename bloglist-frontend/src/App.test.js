import React from "react";
import { render, waitForElement } from "react-testing-library";
import App from "./App";
jest.mock("./services/blogs");

describe("<App />", () => {
  it("if no user logged, notes are not rendered", async () => {
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("log in"));

    expect(component.container).toHaveTextContent("username");
    expect(component.container).toHaveTextContent("password");
    expect(component.container).not.toHaveTextContent("React patterns");
    expect(component.container).not.toHaveTextContent(
      "Go To Statement Considered Harmful"
    );
  });
});
