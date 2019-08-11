import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Container, Table, Form, Button } from 'semantic-ui-react';
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
    <Button onClick={logout}>
      log out
    </Button>
  );
};

const BlogForm = ({ addBlog, title, author, url }) => (
  <Form onSubmit={addBlog}>
    <Form.Field>
      <label>title:</label>
      <input {...title} reset="" />
    </Form.Field>
    <Form.Field>
      <label>author:</label>
      <input {...author} reset="" />
    </Form.Field>
    <Form>
      <label>url:</label>
      <input {...url} reset="" />
    </Form>
    <Button positive type="submit">create</Button>
  </Form>
);

const LoginForm = ({ handleSubmit, username, password }) => (
  <Form onSubmit={handleSubmit}>
    <Form.Field>
      <label>username</label>
      <input {...username} reset="" />
    </Form.Field>
    <Form.Field>
      <label>password</label>
      <input {...password} reset="" />
    </Form.Field>
    <Button type="submit">log in</Button>
  </Form>
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
        blogs.sort(function (a, b) {
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
      <h2>Blogs</h2>
      <Table celled>
        <Table.Body>
          {blogs.map(blog => (
            <Table.Row key={blog.id}>
              <Table.Cell>
                <Blog blog={blog} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
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
    <Container>
      <div>
        <Notification message={notificationMessage} />
        {user === null ? loginView() : blogsView()}
      </div>
    </Container>
  );
};

export default App;
