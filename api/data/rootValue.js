const intimeData = require('/data/intime/exported.json')

const majorCategories = intimeData.department.map((category) => {
  return {
    id: category.code,
    name: category.name,
    courses: category.lect_code_list,
    isCollege: true
  }
})
const otherCategories = intimeData.additional.map((category) => {
  return {
    id: category.code,
    name: category.name,
    courses: category.lect_code_list,
    isCollege: false
  }
})
const mergedCategories = [].concat(majorCategories).concat(otherCategories)

const rootValue = {
  categories: () => {
    return mergedCategories
  }
}

module.exports = rootValue
