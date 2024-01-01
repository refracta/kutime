const { Router } = require('express')
const kutimeData = require('../exported.json')
const router = Router()

router.get('/info', function (req, res, next) {
  res.json(kutimeData.update)
})

router.get('/categories', function (req, res, next) {
  const responseData = {
    departments: kutimeData.department.map((category) => {
      const { code, name } = category
      return {
        code,
        name
      }
    }),
    others: kutimeData.additional.map((category) => {
      const { code, name } = category
      return {
        code,
        name
      }
    })
  }
  res.json(responseData)
})

router.get('/lectures/:code', function (req, res, next) {
  const categoryFromDepartments = kutimeData.department.find((category) => {
    return (category.code === req.params.code)
  })
  const categoryFromOthers = kutimeData.additional.find((category) => {
    return (category.code === req.params.code)
  })
  if (categoryFromDepartments || categoryFromOthers) {
    const category = (categoryFromDepartments || categoryFromOthers)
    const { code, name } = category
    const responseData = {
      code,
      name,
      lectures: []
    }
    responseData.lectures = category.lect_code_list.map((code) => {
      return kutimeData.lecture.list[code]
    })
    res.json(responseData)
  } else {
    res.sendStatus(404)
  }
})

router.get('/candidates', function (req, res, next) {
  let starredCodes
  try {
    starredCodes = JSON.parse(req.query.codes)
  } catch (err) {
    console.error(err)
    res.sendStatus(404)
  }
  const responseData = {
    code: 'candidates',
    name: '수강 예정 리스트',
    lectures: []
  }
  const headerCount = kutimeData.lecture.header.length
  responseData.lectures = starredCodes.map((code) => {
    if (kutimeData.lecture.list[code]) {
      return kutimeData.lecture.list[code]
    } else {
      const dummyData = Array(headerCount).fill(null)
      dummyData[0] = code
      return dummyData
    }
  })
  res.json(responseData)
})

module.exports = router
