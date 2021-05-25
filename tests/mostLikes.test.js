const listHelper = require('../utils/list_helper')
const testData = require('./testData')




describe('most blogs', () => {

  test('when list has only one blog, display the favorite blog', () => {
    const result = listHelper.mostLikes(testData.listWithOneBlog)
    const expected = { author: 'Edsger W. Dijkstra', likes: 5 }
    expect(result).toEqual(expected)
  })

  test('when list has greater than one blog, display the favorite blog', () => {
    const result = listHelper.mostLikes(testData.blogs)
    const expected = { author: 'Edsger W. Dijkstra', likes: 17 }
    expect(result).toEqual(expected)
  })
})
