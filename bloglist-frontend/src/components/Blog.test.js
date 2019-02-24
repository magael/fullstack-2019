import React from "react";
import "jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "react-testing-library";
import Blog from "./Blog";

afterEach(cleanup);

const user = {
  name: "Rendering Enthusiast"
};

const blog = {
  title: "Rendering for dummies",
  author: "Renderman",
  url: "http://ren.der",
  likes: 13,
  user: user
};

it("by default renders only name and author", () => {
  const component = render(<Blog blog={blog} />);
  const details = component.container.querySelector(".details");

  expect(component.container).toHaveTextContent("Rendering for dummies");
  expect(component.container).toHaveTextContent("Renderman");
  expect(details).toHaveStyle("display: none");
});

it("clicking a blog reveals details", async () => {
  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} onClick={mockHandler} />);
  const details = component.container.querySelector(".details");

  const button = component.container.querySelector(".blogInfo");
  fireEvent.click(button);

  expect(component.container).toHaveTextContent("Rendering for dummies");
  expect(component.container).toHaveTextContent("Renderman");
  expect(details).toHaveStyle("display: ");
});
