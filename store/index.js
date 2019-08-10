import axios from '~/plugins/axios'

// reference - https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
function storageAvailable (type) {
  var storage
  try {
    storage = window[type]
    var x = '__storage_test__'
    storage.setItem(x, x)
    storage.removeItem(x)
    return true
  } catch (e) {
    return e instanceof DOMException && (
      // everything except Firefox
      e.code === 22 ||
      // Firefox
      e.code === 1014 ||
      // test name field too, because code might not be present
      // everything except Firefox
      e.name === 'QuotaExceededError' ||
      // Firefox
      e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
      // acknowledge QuotaExceededError only if there's something already stored
      (storage && storage.length !== 0)
  }
}

export const state = () => ({
  selectedCourses: [],
  timetableCourseIds: [],
  isActiveLeftDrawer: false,
  isStorageAvailable: null
})

export const mutations = {
  toggleLeftDrawer (state) {
    state.isActiveLeftDrawer = !state.isActiveLeftDrawer
  },
  setLeftDrawer (state, value) {
    state.isActiveLeftDrawer = value
  },
  setStorageAvailability (state, value) {
    state.isStorageAvailable = value
  },
  setSelectedCourses (state, value) {
    state.selectedCourses = value
  },
  selectCourse (state, value) {
    const { id, name, credit, professor, timeData } = value
    state.selectedCourses.push({
      id,
      name,
      credit,
      professor,
      timeData
    })
    if (state.isStorageAvailable) {
      const storage = window.localStorage
      const courseIds = state.selectedCourses.map((course) => {
        return course.id
      })
      storage.setItem('starredCodes', JSON.stringify(courseIds))
    } else {
      console.warn('Local storage is not available.')
    }
  },
  removeSelectedCourse (state, value) {
    const index = state.selectedCourses.findIndex((course) => {
      return course.id === value
    })
    if (index !== -1) {
      state.selectedCourses.splice(index, 1)
      if (state.isStorageAvailable) {
        const storage = window.localStorage
        const courseIds = state.selectedCourses.map((course) => {
          return course.id
        })
        storage.setItem('starredCodes', JSON.stringify(courseIds))
      } else {
        console.warn('Local storage is not available.')
      }
    }
  },
  saveTimetable (state, value) {
    state.timetableCourseIds = value
    if (state.isStorageAvailable) {
      const storage = window.localStorage
      storage.setItem('timetableCourseIds', JSON.stringify(value))
    } else {
      console.warn('Local storage is not available.')
    }
  }
}

export const actions = {
  checkStorage ({ commit }) {
    return new Promise((resolve, reject) => {
      if (storageAvailable('localStorage')) {
        commit('setStorageAvailability', true)
        resolve()
      } else {
        commit('setStorageAvailability', false)
        reject(new Error('Local storage is not available.'))
      }
    })
  },
  setupData ({ commit, state }) {
    return new Promise((resolve, reject) => {
      if (state.isStorageAvailable) {
        const storage = window.localStorage
        let storedData
        let courseIds = []
        let timetableCourseIds = []
        storedData = storage.getItem('starredCodes')
        if (storedData) {
          try {
            courseIds = JSON.parse(storedData)
          } catch (e) {
            console.warn(e)
          }
        }
        storage.setItem('starredCodes', JSON.stringify(courseIds))
        storedData = storage.getItem('timetableCourseIds')
        if (storedData) {
          try {
            timetableCourseIds = JSON.parse(storedData)
          } catch (e) {
            console.warn(e)
          }
        }
        storage.setItem('timetableCourseIds', JSON.stringify(timetableCourseIds))
        commit('saveTimetable', timetableCourseIds)
        resolve(courseIds)
      } else {
        reject(new Error('Local storage is not available.'))
      }
    })
      .then((selectedCourseIds) => {
        const param = JSON.stringify(selectedCourseIds)
        const query = `{
          courses(courseIds: ${param}) {
            id
            name
            credit
            professor
            timeData
          }
        }`
        return axios.post('/graphql', { query })
      })
      .then((res) => {
        const { courses } = res.data.data
        if (courses) {
          commit('setSelectedCourses', courses)
        }
      })
  }
}
