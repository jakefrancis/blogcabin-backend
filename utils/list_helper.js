const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {

  let likes = blogs.map(blog => blog.likes)

  const reducer = (sum , likes) => {
    return sum + likes
  }
  return blogs === 0
    ? 0
    : (likes.reduce(reducer, 0))
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0){
    return
  }
  let mostLikes = {}
  let greatest = 0
  blogs.forEach(({ ...blog }) => {
    if (blog.likes > greatest){
      greatest = blog.likes
      mostLikes = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
      }
    }
  }
  )

  return mostLikes

}

/*const mostBlogs = (blogs) => {
  let authors = {}
  let mostBlogs = {}

  blogs.forEach( blog => {
    if(authors[blog.author]){
        authors[blog.author].blogs++
    }
    else{
      authors[blog.author] = {
        author: blog.author,
        blogs: 1
      }
    }
  })

    let greatest = 0
    for (author in authors)
    {
        if(authors[author].blogs > greatest){
          greatest = authors[author].blogs
          mostBlogs = {
            author : authors[author].author,
            blogs : authors[author].blogs
          }
        }
    }

  return mostBlogs


}

*/

const mostBlogs = (blogs) => {
  //lodash
  // creates object of all author names and ther occurrences { alice: 5, bob: 6}
  let authors =  _.countBy(blogs, (blog) => blog.author)
  //transform object into an array of objects. [{author: alice, blogs: 5}, {author:bob, blogs: 6}]
  authors = _.transform(authors, (result, value, key) => {
    result.push({
      author: key,
      blogs : value
    })
  }, [])
  //returns author with most blogs {author: alice, blogs: 6}
  return _.maxBy(authors, (author) => author.blogs )

}

const mostLikes = (blogs) => {
//get number of articles and sum all the likes when they occur
//return the author with the most likes

  let authors = blogs.map( blog => {
    let obj = {}
    obj[blog.author] = blog.likes
    return obj
  })
  let combined = {}

  authors.forEach(blog => {Object.entries(blog).forEach(author => {
    const [key, value] = author
    if(!combined[key]){
      combined[key] = value
    }
    else{
      combined[key] += value
    }
  })
  })
  combined = _.transform(combined, (result, value, key) => {
    result.push({
      author: key,
      likes : value
    })
  }, [])

  return _.maxBy(combined, (author) => author.likes)

}




module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}