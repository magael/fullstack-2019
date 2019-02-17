const testHelper = require('./test_helper')
const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithOtherStuff = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    dislikes: 10, // likes renamed to diskiles to fail checking likes
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('favourite blogs', () => {
  test('when list has only one blog equals that blog', () => {
    const formattedBlog = {
      title: listWithOneBlog[0].title,
      author: listWithOneBlog[0].author,
      likes: listWithOneBlog[0].likes
    }
    const result = listHelper.favoriteBlogs(listWithOneBlog)
    expect(result).toEqual(formattedBlog)
  })

  test('when list has several blogs equals the the most liked', () => {
    const formattedBlog = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    const result = listHelper.favoriteBlogs(testHelper.initialBlogs)
    expect(result).toEqual(formattedBlog)
  })

  test('favourite of empty array is empty', () => {
    const formattedBlog = {
      title: '',
      author: '',
      likes: 0
    }
    const result = listHelper.favoriteBlogs([])
    expect(result).toEqual(formattedBlog)
  })

  test('favourite of list with wrong format equals empty', () => {
    const wronglyFormattedBlog = {
      name: '',
      number: '',
      money: 0
    }
    const result = listHelper.favoriteBlogs(wronglyFormattedBlog)
    expect(result).toEqual({
      title: '',
      author: '',
      likes: 0
    })
  })
})

describe('total likes', () => {
  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has several blogs equals the likes of them', () => {
    const result = listHelper.totalLikes(testHelper.initialBlogs)
    expect(result).toBe(36)
  })

  test('likes of empty array is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('list with wrong format is zero', () => {
    const result = listHelper.totalLikes(listWithOtherStuff)
    expect(result).toBe(0)
  })
})
