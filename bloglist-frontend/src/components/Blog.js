import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const details = { display: showDetails ? "" : "none" };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  };

  const likeBlog = async event => {
    event.preventDefault();

    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    try {
      console.log(blog.id);
      console.log(updatedBlog);
      await blogService.update(blog.id, updatedBlog);
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div style={blogStyle}>
      <div onClick={() => setShowDetails(!showDetails)}>
        {blog.title} {blog.author}
        <div style={details}>
          {blog.url}
          <br />
          {blog.likes} likes <button onClick={likeBlog}>like</button>
          <br />
          added by {blog.user.name}
        </div>
      </div>
    </div>
  );
};

export default Blog;
