let token = null;

const setToken = newToken => {
  token = `bearer ${newToken}`;
};

const user = {
  username: "tester",
  token: "1231231214",
  name: "Teuvo Testaaja"
};

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    user: user
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    user: user
  }
];

const getAll = () => {
  return Promise.resolve(blogs);
};

export default { getAll, setToken };
