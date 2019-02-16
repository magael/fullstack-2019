const dummy = blogs => {
  if (blogs) return 1
  return 1
}

const totalLikes = blogs => {
  const likes = blogs.map(blog => blog.likes)
  if (likes < 1) return 0
  const reducer = (sum, item) => {
    return sum + item
  }
  return likes.reduce(reducer, 0)
}

const favoriteBlogs = blogs => {
  const favBlog = {
    title: '',
    author: '',
    likes: 0
  }

  const makeFav = blog => {
    favBlog.title = blog.title
    favBlog.author = blog.author
    favBlog.likes = blog.likes
  }

  if (blogs.length > 0) {
    makeFav(blogs[0])
    let mostLikes = 0

    blogs.forEach(blog => {
      if (blog.likes > mostLikes) {
        mostLikes = blog.likes
        makeFav(blog)
      }
    })
  }

  return favBlog
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlogs
}
