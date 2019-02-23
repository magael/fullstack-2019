import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";
import { useField } from "./hooks/index";

const LogoutButton = props => {
  const logout = () => {
    blogService.setToken(null);
    handleLogout();
    loginService.logout();
  };

  const handleLogout = () => {
    props.setUser(null);
  };

  return (
    <button type="button" onClick={logout}>
      log out
    </button>
  );
};

const BlogForm = ({ addBlog, title, author, url }) => (
  <form onSubmit={addBlog}>
    <div>
      title:
      <input {...title} reset="" />
    </div>
    <div>
      author:
      <input {...author} reset="" />
    </div>
    <div>
      url:
      <input {...url} reset="" />
    </div>
    <button type="submit">create</button>
  </form>
);

const LoginForm = ({ handleSubmit, username, password }) => (
  <form onSubmit={handleSubmit}>
    <div>
      username
      <input {...username} reset="" />
    </div>
    <div>
      password
      <input {...password} reset="" />
    </div>
    <button type="submit">log in</button>
  </form>
);

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
  // ennen custom hookkeja:
  // handleUsernameChange: PropTypes.func.isRequired,
  // handlePasswordChange: PropTypes.func.isRequired,
  // username: PropTypes.string.isRequired,
  // password: PropTypes.string.isRequired
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const newBlogTitle = useField("text");
  const newBlogAuthor = useField("text");
  const newBlogUrl = useField("text");
  const [notificationMessage, setNotificationMessage] = useState(null);
  const username = useField("text");
  const password = useField("password");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(
        blogs.sort(function(a, b) {
          return b.likes - a.likes;
        })
      )
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = event => {
    event.preventDefault();

    const blogObject = {
      author: newBlogAuthor.value,
      title: newBlogTitle.value,
      url: newBlogUrl.value
    };

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog));
      setNotificationMessage(`Added: ${newBlogTitle.value}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    });

    newBlogTitle.reset();
    newBlogAuthor.reset();
    newBlogUrl.reset();
  };

  const handleLogin = async event => {
    event.preventDefault();
    const name = username.value;
    const pass = password.value;

    username.reset();
    password.reset();

    try {
      const user = await loginService.login({
        username: name,
        password: pass
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setNotificationMessage("invalid username or password");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  // const likeBlog = async event => {
  //   event.preventDefault();

  //   const updatedBlog = { ...blog, likes: blog.likes + 1 };

  //   try {
  //     await blogService.update(blog.id, updatedBlog);
  //   } catch (exception) {
  //     console.log(exception);
  //   }
  // };

  const blogsView = () => (
    <div>
      <p>{user.name} logged in</p>
      <LogoutButton setUser={setUser} username={username} password={password} />
      <h2>create new</h2>
      <Toggleable buttonLabel="new blog">
        <BlogForm
          title={newBlogTitle}
          author={newBlogAuthor}
          url={newBlogUrl}
          addBlog={addBlog}
        />
      </Toggleable>
      <h2>blogs</h2>
      {blogs.map(blog => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );

  const loginView = () => (
    <div>
      <h2>log in to application</h2>
      <LoginForm
        handleSubmit={handleLogin}
        username={username}
        password={password}
      />
    </div>
  );

  return (
    <div>
      <Notification message={notificationMessage} />
      {user === null ? loginView() : blogsView()}
    </div>
  );
};

export default App;
