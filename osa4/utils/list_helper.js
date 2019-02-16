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

module.exports = {
  dummy,
  totalLikes
}
