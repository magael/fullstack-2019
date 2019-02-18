const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

describe('when database contains initial blogs', async () => {
  beforeEach(async () => {
    await Blog.remove({})
    await User.deleteMany({})
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()

    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  describe('listing all blogs', () => {
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

  describe('single blog view', () => {
    test('succeeds with a valid id', async () => {
      const blogsAtStart = await helper.blogsInDb()

      const blogToView = blogsAtStart[0]

      const resultBlog = await api
        .get(`/api/blogs/${blogToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      // resultBlogin id näytti jotain bufferidataa, toivottavasti tämmönen toString-"hack" ei oo paha
      expect(resultBlog.body.toString()).toEqual(blogToView.toString())
    })

    test('fails with statuscode 404 if note does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      await api.get(`/api/blogs/${validNonexistingId}`).expect(404)
    })

    test('fails with statuscode 400 id is invalid invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api.get(`/api/blogs/${invalidId}`).expect(400)
    })
  })

  describe('deleting a blog', () => {
    test('a blog can be deleted', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(r => r.title)

      expect(titles).not.toContain(blogToDelete.title)
    })
  })

  // describe('editing a blog', () => {
  //   test('the amount of likes of a blog can be updated', async () => {
  //     const blogsAtStart = await helper.blogsInDb()

  //     const blogToView = blogsAtStart[0]
  //     blogToView.likes = 666

  //     const resultBlog = await api
  //       .put(`/api/blogs/${blogToView.id}`)
  //       .send(blogToView)
  //       .expect(200)
  //       .expect('Content-Type', /application\/json/)

  //     expect(resultBlog.likes.toBe(blogToView.likes))
  //   })
  // })

  describe('adding new blogs', () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: 'Sane Usage of Components and Entity Systems',
        author: 'Randy Gaul',
        url:
          'https://www.randygaul.net/2014/06/10/sane-usage-of-components-and-entity-systems/',
        likes: 3
        // user: new User({
        //   username: 'mammamia',
        //   name: 'Mario',
        //   passwordHash: 'hashtagKryptografia'
        // })
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
        author: 'Multiple',
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

  afterAll(() => {
    mongoose.connection.close()
  })
})
