const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor





blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 }).populate('likedBy', { username: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user

  let newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  }
  const blog = new Blog(newBlog)
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  const resBlog = await Blog.findById(savedBlog._id).populate('user', { username: 1, name: 1 })
  response.status(201).json(resBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request,response) => {
  const user = request.user
  const blogToBeDeleted = await Blog
    .findById(request.params.id)
  if(blogToBeDeleted.user.toString() === user._id.toString()){
    await user.updateOne({ $pull: { blogs: blogToBeDeleted._id } })
    await Blog.deleteOne({ _id: request.params.id })
    return response.status(204).end()
  }
  response.status(401).end()

})

blogsRouter.put('/:id', userExtractor, async (request,response) => {
  const user = request.user
  const blogToUpdate = await Blog.findById(request.params.id)
  if(blogToUpdate.likedBy.includes(user._id)){
    await blogToUpdate.updateOne({ likes: blogToUpdate.likes - 1, $pull: { likedBy: user._id } })
    const unlike = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 }).populate('likedBy', { username: 1 })
    return response.json(unlike)
  }
  await blogToUpdate.updateOne({ likes: blogToUpdate.likes + 1,$push: { likedBy: user._id } })
  const like = await Blog.findById(request.params.id).populate('user', { username: 1, name: 1 }).populate('likedBy', { username: 1 })
  response.json(like)
})


module.exports = blogsRouter