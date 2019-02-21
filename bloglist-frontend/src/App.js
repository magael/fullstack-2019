import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const LogoutButton = props => {
  const logout = () => {
    blogService.setToken(null);
    handleLogout();
    loginService.logout();
  };

  const handleLogout = () => {
    props.setUser(null);
    props.setUsername("");
    props.setPassword("");
  };

  return (
    <button type="button" onClick={logout}>
      log out
    </button>
  );
};

const BlogForm = props => (
  <form onSubmit={props.addBlog}>
    <div>
      title:
      <input
        type="text"
        value={props.newBlogTitle}
        name="Title"
        onChange={({ target }) => props.setNewBlogTitle(target.value)}
      />
    </div>
    <div>
      author:
      <input
        type="text"
        value={props.newBlogAuthor}
        name="Author"
        onChange={({ target }) => props.setNewBlogAuthor(target.value)}
      />
    </div>
    <div>
      url:
      <input
        type="text"
        value={props.newUrlTitle}
        name="Url"
        onChange={({ target }) => props.setNewBlogUrl(target.value)}
      />
    </div>
    <button type="submit">create</button>
  </form>
);

const LoginForm = props => (
  <form onSubmit={props.handleLogin}>
    <div>
      käyttäjätunnus
      <input
        type="text"
        value={props.username}
        name="Username"
        onChange={({ target }) => props.setUsername(target.value)}
      />
    </div>
    <div>
      salasana
      <input
        type="password"
        value={props.password}
        name="Password"
        onChange={({ target }) => props.setPassword(target.value)}
      />
    </div>
    <button type="submit">log in</button>
  </form>
);

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState([]);
  const [newBlogAuthor, setNewBlogAuthor] = useState([]);
  const [newBlogUrl, setNewBlogUrl] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs));
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
      author: newBlogAuthor,
      title: newBlogTitle,
      url: newBlogUrl
    };

    blogService.create(blogObject).then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog));
      setNotificationMessage(`Added: ${newBlogTitle}`);
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    });
  };

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setNotificationMessage("invalid username or password");
      setTimeout(() => {
        setNotificationMessage(null);
      }, 5000);
    }
  };

  const blogsView = () => (
    <div>
      <p>{user.name} logged in</p>
      <LogoutButton
        setUser={setUser}
        setUsername={setUsername}
        setPassword={setPassword}
      />
      <h2>create new</h2>
      <BlogForm
        newBlogTitle={newBlogTitle}
        setNewBlogTitle={setNewBlogTitle}
        newBlogAuthor={newBlogAuthor}
        setNewBlogAuthor={setNewBlogAuthor}
        newBlogUrl={newBlogUrl}
        setNewBlogUrl={setNewBlogUrl}
        addBlog={addBlog}
      />
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
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
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
