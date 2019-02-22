import React from "react";
import "jest-dom/extend-expect";
import { render, cleanup, fireEvent } from "react-testing-library";
import SimpleBlog from "./SimpleBlog";

afterEach(cleanup);

const blog = {
  title: "Rendering for dummies",
  author: "Renderman",
  likes: 13
};

test("renders content", () => {
  const component = render(<SimpleBlog blog={blog} />);

  expect(component.container).toHaveTextContent("Rendering for dummies");
  expect(component.container).toHaveTextContent("Renderman");
  expect(component.container).toHaveTextContent("13");
});

it("clicking the button calls event handler once", async () => {
  const mockHandler = jest.fn();

  const { getByText } = render(
    <SimpleBlog blog={blog} onClick={mockHandler} />
  );

  const button = getByText("like");
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(1);
});
