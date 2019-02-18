const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  // const user = await User.findById(body.user.id)
  //
  // ^^toimii vscode restillä postaillessa, mutta seuraavassa väliaikaisratkaisu
  // tehtävää 4.17 varten, jotta uuden blogin lisäyksen integraatiotestit ei failaa:
  const user = await User.findOne()

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes,
    user: user._id
  })

  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if (blog) {
      response.json(blog.toJSON())
    } else {
      response.status(404).end()
    }
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } catch (exception) {
    next(exception)
  }
})

blogsRouter.put(':/id', async (request, response, next) => {
  const body = request.body
  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes === undefined ? 0 : body.likes
  })

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
      new: true
    })
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }

  // Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  //   .then(updatedNote => {
  //     response.json(updatedNote.toJSON())
  //   })
  //   .catch(error => next(error))
})

module.exports = blogsRouter
