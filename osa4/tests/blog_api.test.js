const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.remove({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('retrieving blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(helper.initialBlogs.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const titles = response.body.map(r => r.title)
    expect(titles).toContain('First class tests')
  })

  test('returned blogs have field id', async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body.map(r => r.id)
    expect(ids).toBeDefined()
  })
})

describe('adding new blogs', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Sane Usage of Components and Entity Systems',
      author: 'Randy Gaul',
      url:
        'https://www.randygaul.net/2014/06/10/sane-usage-of-components-and-entity-systems/',
      likes: 3
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)

    const authors = blogsAtEnd.map(b => b.author)
    expect(authors).toContain('Michael Chan')
  })

  test('blog without title is not added', async () => {
    const newBlog = {
      author: 'Unity',
      url: 'https://blogs.unity3d.com/',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  test('blog without url is not added', async () => {
    const newBlog = {
      author: 'GameDev.com',
      title: 'Game Dev blogs',
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
  })

  afterAll(() => {
    mongoose.connection.close()
  })

  test('blog with undefined likes has likes set to zero', async () => {
    const newBlog = {
      title: 'Gamasutra blogs',
      author: 'Multiple',
      url: 'http://www.gamasutra.com/blogs/'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const newLikes = blogsAtEnd.find(b => b.title === newBlog.title).likes

    expect(newLikes).toBe(0)
  })
})
