const supertest = require('supertest')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const helper = require('./testData')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)



beforeEach(async () => {
  await User.deleteMany({})

  for(const user of helper.initialUsers){
    const passwordHash = await bcrypt.hash(user.password, 10)
    const savedUser = new User({
      username: user.username,
      name: user.name,
      passwordHash
    })
    await savedUser.save()
  }
})

test('all users returned as json', async () => {
  await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('return all users in db', async () => {
  const response = await api.get('/api/users')
  expect(response.body).toHaveLength(helper.initialUsers.length)
})

test('successfully create new user', async () => {

  const newUser = {
    username: 'banana',
    name: 'nan bindy',
    password: 'dogwood'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/)
  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)
})

test('new user creation fails if username is taken', async () => {

  const newUser = {
    username: 'donnie',
    name: 'nan bindy',
    password: 'dogwood'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
})

test('new user creation fails if username is too short', async () => {

  const newUser = {
    username: 'ba',
    name: 'nan bindy',
    password: 'dogwood'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
})

test('new user creation fails if password is too short', async () => {

  const newUser = {
    username: 'banana',
    name: 'nan bindy',
    password: 'do'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)
  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
})

afterAll(() => {
  mongoose.connection.close()
})