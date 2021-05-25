const listHelper = require('../utils/list_helper')
const testData = require('./testData')



describe('total likes', () => {

  test('when list has only one blog, sum the likes of that', () => {
    const result = listHelper.totalLikes(testData.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has greater than one blog, sum the likes of that', () => {
    const result = listHelper.totalLikes(testData.blogs)
    expect(result).toBe(29)
  })

  test('when list has no blogs, sum the likes', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

