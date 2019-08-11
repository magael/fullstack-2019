import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);
  const details = { display: showDetails ? "" : "none" };

  // console.log(currentUser.id);
  // console.log(blog.user.id);
  // const creator = currentUser === blog.user.id;

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    // border: "solid",
    // borderWidth: 1,
    marginBottom: 5
  };

  const likeBlog = async event => {
    event.preventDefault();

    const updatedBlog = { ...blog, likes: blog.likes + 1 };

    try {
      await blogService.update(blog.id, updatedBlog);
    } catch (exception) {
      console.log(exception);
    }
  };

  const deleteBlog = () => {
    try {
      blogService.deleteOne(blog.id);
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <div
      className="blogInfo"
      style={blogStyle}
      onClick={() => setShowDetails(!showDetails)}
    >
      {blog.title} {blog.author}
      <div className="details" style={details}>
        {blog.url}
        <br />
        {blog.likes} likes <button onClick={likeBlog}>like</button>
        <br />
        added by {blog.user.name}
        <br />
        <button onClick={deleteBlog}>
          {/* <button style={creatorOnly} onClick={deleteBlog}> */}
          delete
        </button>
      </div>
    </div>
  );
};

export default Blog;
