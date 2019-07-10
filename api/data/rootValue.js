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
  },
  courses: ({ categoryId }) => {
    const category = mergedCategories.find((category) => {
      return (categoryId === category.id)
    })
    if (category) {
      const uniqueCourseIds = [...(new Set(category.courses))]
      return uniqueCourseIds.map((courseId) => {
        const course = intimeData.lecture.list[courseId]
        return {
          id: course[0],
          classGroup: course[1],
          name: course[2],
          grade: course[3],
          credit: course[4],
          type: course[5],
          timePlace: course[6],
          professor: course[7],
          evaluation: course[8],
          note: course[9],
          lecPlan: course[10],
          glecPlan: course[11],
          timeData: course[12],
          abeek: course[13]
        }
      })
    } else {
      return null
    }
  }
}

module.exports = rootValue
