const blogsRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')


blogsRouter.get('/', async (request,response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1 })
  response.json(users)
})

blogsRouter.post('/', async (request,response) => {
  const body = request.body
  const minimumLength = 3
  if(body.name.length < minimumLength){
    return response.status(400).json( { error: `name must be at least ${minimumLength} characters` })
  }
  if(body.username.length < minimumLength){
    return response.status(400).json( { error: `username must be at least ${minimumLength} characters` })
  }
  if(body.password.length < minimumLength){
    return response.status(400).json( { error: `password must be at least ${minimumLength} characters` })
  }
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new User ({
    username: body.username,
    name: body.name,
    passwordHash
  })
  await user.save()
  response.json(user)
})

module.exports = blogsRouter