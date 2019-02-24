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

  it("if user is logged in, notes are rendered", async () => {
    const user = {
      username: "tester",
      token: "1231231214",
      name: "Teuvo Testaaja"
    };

    localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
    const component = render(<App />);
    component.rerender(<App />);

    await waitForElement(() => component.getByText("blogs"));

    expect(component.container).toHaveTextContent("React patterns");
    expect(component.container).toHaveTextContent(
      "Go To Statement Considered Harmful"
    );
  });
});
