const listHelper = require('../utils/list_helper')
const testData = require('./testData')


describe('most blogs', () => {

  test('when list has only one blog, display the favorite blog', () => {
    const result = listHelper.mostBlogs(testData.listWithOneBlog)
    const expected = { author: 'Edsger W. Dijkstra', blogs: 1 }
    expect(result).toEqual(expected)
  })

  test('when list has greater than one blog, display the favorite blog', () => {
    const result = listHelper.mostBlogs(testData.blogs)
    const expected = {
      author: 'Robert C. Martin',
      blogs: 3
    }
    expect(result).toEqual(expected)
  })
})
