/**
 * TypeScript-style type definition.
 *
 * type Category = {
 *   id: string;
 *   name: string;
 *   lectureIds: string[];
 * };
 *
 * type KutimeData = {
 *   departments: Category[];
 *   rests: Category[];
 *   lectureHeaders: string[];
 *   lectures: Record<string, string[]>;
 * };
 */

const kutimeData = require('/srv/kutime/exported.json')

const majorCategories = kutimeData.departments.map(({ id, name, lectureIds }) => {
  return {
    id,
    name,
    courses: lectureIds,
    isCollege: true
  }
})
const otherCategories = kutimeData.rests.map(({ id, name, lectureIds }) => {
  return {
    id,
    name,
    courses: lectureIds,
    isCollege: false
  }
})
const mergedCategories = [].concat(majorCategories).concat(otherCategories)

const rootValue = {
  categories: () => {
    return mergedCategories
  },
  courses: ({ categoryId, courseIds = [] }) => {
    const category = mergedCategories.find((category) => {
      return (categoryId === category.id)
    })
    let unrefinedCourseIds
    if (category) {
      unrefinedCourseIds = category.courses
      if (courseIds.length > 0) {
        unrefinedCourseIds = unrefinedCourseIds.filter((courseId) => {
          return courseIds.includes(courseId)
        })
      }
    } else {
      unrefinedCourseIds = courseIds
    }
    if (unrefinedCourseIds.length > 0) {
      const uniqueCourseIds = [...(new Set(unrefinedCourseIds))]
      const validCourseIds = uniqueCourseIds.filter((courseId) => {
        return kutimeData.lectures[courseId]
      })
      return validCourseIds.map((courseId) => {
        const course = kutimeData.lectures[courseId]
        return {
          id: course[0],
          name: course[1],
          professor: course[2],
          grade: course[3],
          credit: course[4],
          type1: course[5],
          type2: course[6],
          targetDepartment: course[7],
          target: course[8],
          time: course[9],
          place: course[10],
          creditDetail: course[11],
          limit: course[12],
          timeData: course[13]
        }
      })
    } else {
      return null
    }
  }
}

module.exports = rootValue
