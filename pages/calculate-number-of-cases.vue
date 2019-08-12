<template>
  <v-layout wrap>
    <v-flex xs12 md10>
      <v-container
        fluid
        grid-list-md
        class="pa-0"
      >
        <v-layout wrap>
          <v-flex
            v-for="group in courseGroups"
            :key="group.idPrefix"
            xs12
            sm6
            md4
            lg3
          >
            <v-card
              :flat="group.isExcluded"
              :class="{
                'accent white--text': group.isLocked,
                'grey lighten-2 grey--text text--lighten-1': group.isExcluded
              }"
            >
              <v-card-actions>
                <v-layout wrap>
                  <v-flex xs9 md12>
                    <div class="subheading text-truncate">{{ group.name }}</div>
                  </v-flex>
                  <v-flex>
                    <v-layout>
                      <v-spacer></v-spacer>
                      <v-btn
                        v-if="group.isLocked"
                        icon
                        small
                        @click="unlockCourseGroup(group.idPrefix)"
                      >
                        <v-icon small>fas fa-unlock</v-icon>
                      </v-btn>
                      <v-btn
                        v-else
                        icon
                        small
                        :disabled="group.isExcluded"
                        @click="lockCourseGroup(group)"
                      >
                        <v-icon small>fas fa-lock</v-icon>
                      </v-btn>
                      <v-btn
                        v-if="group.isExcluded"
                        icon
                        small
                        @click="unexcludeCourseGroup(group.idPrefix)"
                      >
                        <v-icon small>fas fa-eye</v-icon>
                      </v-btn>
                      <v-btn
                        v-else
                        icon
                        small
                        :disabled="group.isLocked"
                        @click="excludeCourseGroup(group)"
                      >
                        <v-icon small>fas fa-eye-slash</v-icon>
                      </v-btn>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-flex>
    <v-flex xs12 md1 offset-md1>
      <v-btn
        block
        color="info"
        :disabled="isLoadingCases"
        :loading="isLoadingCases"
        @click="calculateCases"
      >계산</v-btn>
    </v-flex>
    <v-flex class="mt-3">
      <v-card>
        <v-card-title>
          <v-spacer></v-spacer>
          <v-text-field
            ref="searchField"
            v-model="keyword"
            append-icon="fas fa-search"
            label="결과 내 검색"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          disable-initial-sort
          :headers="headers"
          :items="calculatedCases"
          item-key="num"
          :search="keyword"
          :rows-per-page-items="rowsPerPage"
        >
          <template v-slot:items="props">
            <td>
              {{ props.item.num }}
              <v-icon
                v-if="JSON.stringify(props.item.courseIds) === timetableCourseIds"
                small
              >fas fa-calendar-week</v-icon>
            </td>
            <td>{{ props.item.totalCount }}</td>
            <td>{{ props.item.totalCredit.toFixed(1) }}</td>
            <td>{{ props.item.courseNames.join(', ') }}</td>
            <td class="px-1">
              <v-btn
                small
                color="info"
                @click="checkTimetable(props.item)"
              >시간표</v-btn>
            </td>
          </template>
        </v-data-table>
      </v-card>
    </v-flex>
    <v-dialog
      max-width="640"
      v-model="isActiveTimetable"
    >
      <v-card>
        <v-card-title class="d-block subheading">
          <v-layout align-center>
            <span class="text-no-wrap">#{{ activeCase.num }} ({{ activeCase.totalCount }}과목, {{ activeCase.totalCredit }}학점)</span>
            <span>&nbsp;-&nbsp;</span>
            <v-flex class="text-truncate">{{ activeCase.courseNames.join(', ') }}</v-flex>
          </v-layout>
          <v-alert
            :value="activeCase.hasOnlineCourse"
            color="info"
            icon="fas fa-info-circle"
            outline
            class="pa-2"
          >
            <v-layout>
              <v-flex class="text-truncate">웹강의 - {{ activeCase.onlineCourseNames.join(', ') }}</v-flex>
            </v-layout>
          </v-alert>
          <v-alert
            :value="activeCase.hasEmptyCourse"
            color="warning"
            icon="fas fa-exclamation-circle"
            outline
            class="pa-2"
          >
            <v-layout>
              <v-flex class="text-truncate">강의시간 없음 - {{ activeCase.emptyCourseNames.join(', ') }}</v-flex>
            </v-layout>
          </v-alert>
        </v-card-title>
        <v-card-text>
          <v-flex>
            <v-sheet
              height="1073"
              :max-height="maxSheetHeight"
            >
              <v-calendar
                v-if="isActiveTimetable"
                type="week"
                :first-interval="17"
                :interval-count="26"
                :interval-minutes="30"
              >
                <template v-slot:dayHeader="{ date }">
                  <div class="subheading pa-1 pl-2">{{ dayjs(date, 'YYYY-MM-DD').format('ddd') }}</div>
                </template>
                <template v-slot:dayBody="{ weekday, timeToY, minutesToPixels }">
                  <template v-for="(event, index) in eventsMap[weekday]">
                    <v-tooltip top :key="index">
                      <template v-slot:activator="{ on }">
                        <div
                          v-if="event.time"
                          v-on="on"
                          class="timetable-event"
                          :class="{
                            'grey--text text--darken-4': event.luminance > 0.5
                          }"
                          :style="{
                            top: timeToY(event.time) + 'px',
                            height: minutesToPixels(event.duration) + 'px',
                            borderColor: event.themeColor,
                            backgroundColor: event.themeColor
                          }"
                        >
                          <div>{{ event.title }}</div>
                          <div>{{ event.professor }}</div>
                        </div>
                      </template>
                      <span>{{ event.courseId }} {{ event.title }}</span>
                    </v-tooltip>
                  </template>
                </template>
              </v-calendar>
            </v-sheet>
          </v-flex>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-show="$vuetify.breakpoint.xs"
            color="info"
            @click="isActiveTimetable = false"
          >닫기</v-btn>
          <v-btn
            v-if="JSON.stringify(activeCase.courseIds) === timetableCourseIds"
            color="info"
            disabled
          >내 시간표에 저장됨</v-btn>
          <v-btn
            v-else
            color="info"
            :disabled="isSavingTimetable"
            :loading="isSavingTimetable"
            @click="saveTimetable"
          >내 시간표로 저장</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import dayjs from '~/plugins/dayjs'

export default {
  name: 'calculate-number-of-cases-page',
  layout: 'calculate-number-of-cases',
  head () {
    return {
      title: '경우의 수 계산'
    }
  },
  data () {
    return {
      dayjs,
      lockedCourseGroups: [],
      excludedCourseGroups: [],
      headers: [
        { text: '번호', value: 'num', width: '90' },
        { text: '과목개수', value: 'totalCount', width: '90' },
        { text: '학점합계', value: 'totalCredit', width: '90' },
        { text: '과목명', value: 'nameList', sortable: false, width: '990' },
        { sortable: false, width: '110' }
      ],
      calculatedCases: [],
      keyword: '',
      rowsPerPage: [10, 20, 30],
      activeCase: {
        num: 0,
        totalCount: 0,
        totalCredit: 0,
        courseIds: [],
        courseNames: [],
        emptyCourseNames: [],
        onlineCourseNames: [],
        hasEmptyCourse: false,
        hasOnlineCourse: false
      },
      eventsMap: {},
      isActiveTimetable: false,
      isSavingTimetable: false,
      isLoadingCases: false
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.$store.dispatch('checkStorage')
        .then(() => {
          return this.$store.dispatch('setupData')
        })
        .catch((e) => {
          console.warn(e)
        })
    })
  },
  computed: {
    selectedCourses () {
      return this.$store.state.selectedCourses.map((course) => {
        const timeSlots = []
        const dailySchedules = course.timeData.match(/(D[T0-9]+)/g) || []
        dailySchedules.forEach((schedule) => {
          const fragments = schedule.match(/[DT]([0-9]+)/g)
          const dayValue = Number(fragments.shift().slice(1))
          const slotValues = fragments.map((fragment) => {
            return dayValue * 100 + Number(fragment.slice(1))
          })
          timeSlots.push(...slotValues)
        })
        return {
          ...course,
          timeSlots
        }
      })
    },
    orderedCourses () {
      return this.selectedCourses.slice().sort((former, latter) => {
        return former.id.localeCompare(latter.id)
      })
    },
    courseGroups () {
      const courseIdPrefixes = this.selectedCourses.map((course) => {
        return course.id.match(/^([a-z0-9]+)-[0-9]+$/i)[1]
      })
      const uniqueCourseIdPrefixes = [...(new Set(courseIdPrefixes))]
      return uniqueCourseIdPrefixes.map((prefix) => {
        const course = this.selectedCourses.find((course) => {
          return course.id.startsWith(prefix)
        })
        return {
          idPrefix: prefix,
          name: course.name,
          isLocked: this.lockedCourseGroups.includes(prefix),
          isExcluded: this.excludedCourseGroups.includes(prefix)
        }
      })
    },
    activeGroups () {
      return this.courseGroups
        .filter((group) => {
          return !group.isExcluded
        })
        .map((group) => {
          const choices = this.orderedCourses.filter((course) => {
            return course.id.startsWith(group.idPrefix)
          })
          if (!group.isLocked) {
            choices.unshift(null)
          }
          return {
            ...group,
            choices
          }
        })
    },
    eventsPerCourse () {
      const res = {}
      this.$store.state.selectedCourses.forEach((course) => {
        const matched = course.id.match(/^([a-z]+)([0-9]+-[0-9]+)$/i)
        const x = parseInt(matched[1], 36)
        const y = Number(matched[2].replace('-', ''))
        const z = x * y
        const hexValue = z.toString(16).slice(-6)
        const themeColor = `#${hexValue}`
        let luminance
        {
          // reference - https://www.w3.org/TR/WCAG20/#relativeluminancedef
          const nonlinearRGB = {
            red: parseInt(hexValue.slice(0, 2), 16) / 255,
            green: parseInt(hexValue.slice(2, 4), 16) / 255,
            blue: parseInt(hexValue.slice(4, 6), 16) / 255
          }
          const linearRGB = {}
          for (let color in nonlinearRGB) {
            const transformedValue = (
              nonlinearRGB[color] <= 0.03928
                ? nonlinearRGB[color] / 12.92
                : ((nonlinearRGB[color] + 0.055) / 1.055) ** 2.4
            )
            linearRGB[color] = transformedValue
          }
          luminance = 0.2126 * linearRGB.red + 0.7152 * linearRGB.green + 0.0722 * linearRGB.blue
        }
        const events = []
        const dailySchedules = course.timeData.match(/(D[T0-9]+)/g) || []
        dailySchedules.forEach((schedule) => {
          const fragments = schedule.match(/[DT]([0-9]+)/g)
          const dayValue = Number(fragments.shift().slice(1))
          const startingTimeValue = Number(fragments[0].slice(1))
          const instance = dayjs('09:00', 'HH:mm').add(30 * (startingTimeValue - 1), 'minute')
          events.push({
            weekday: dayValue,
            courseId: course.id,
            title: course.name,
            professor: course.professor,
            time: instance.format('HH:mm'),
            duration: 30 * fragments.length,
            themeColor,
            luminance
          })
        })
        res[course.id] = events
      })
      return res
    },
    maxSheetHeight () {
      if (this.activeCase.hasOnlineCourse && this.activeCase.hasEmptyCourse) {
        return 'calc(90vh - 237px)'
      } else if (!this.activeCase.hasOnlineCourse && !this.activeCase.hasEmptyCourse) {
        return 'calc(90vh - 141px)'
      } else {
        return 'calc(90vh - 191px)'
      }
    },
    timetableCourseIds () {
      return JSON.stringify(this.$store.state.timetableCourseIds)
    }
  },
  methods: {
    lockCourseGroup (group) {
      if (!group.isExcluded) {
        this.lockedCourseGroups.push(group.idPrefix)
      }
    },
    unlockCourseGroup (prefix) {
      const index = this.lockedCourseGroups.findIndex((lockedPrefix) => {
        return lockedPrefix === prefix
      })
      this.lockedCourseGroups.splice(index, 1)
    },
    excludeCourseGroup (group) {
      if (!group.isLocked) {
        this.excludedCourseGroups.push(group.idPrefix)
      }
    },
    unexcludeCourseGroup (prefix) {
      const index = this.excludedCourseGroups.findIndex((excludedPrefix) => {
        return excludedPrefix === prefix
      })
      this.excludedCourseGroups.splice(index, 1)
    },
    calculateCases () {
      this.isLoadingCases = true
      return new Promise((resolve, reject) => {
        const validCases = []
        const reversedChoiceCounts = this.activeGroups
          .map((group) => {
            return group.choices.length
          })
          .reverse()
        let maxCaseCount = 1
        this.activeGroups.forEach((group) => {
          maxCaseCount *= group.choices.length
        })
        for (let caseIndex = 0; caseIndex < maxCaseCount; caseIndex += 1) {
          const choiceIndexes = []
          const chosenCourseIds = []
          const chosenCourseNames = []
          const chosenTimeSlots = []
          let uniqueSlots = []
          let totalSlotCount = 0
          let totalCourseCount = 0
          let totalCredit = 0
          let isOverlapped = false
          let temp = caseIndex
          reversedChoiceCounts.forEach((choiceCount) => {
            choiceIndexes.unshift(temp % choiceCount)
            temp = Math.floor(temp / choiceCount)
          })
          this.activeGroups.forEach((group, index) => {
            const choice = group.choices[choiceIndexes[index]]
            if (choice) {
              chosenCourseIds.push(choice.id)
              chosenCourseNames.push(choice.name)
              chosenTimeSlots.push(...choice.timeSlots)
              totalSlotCount += choice.timeSlots.length
              totalCourseCount += 1
              totalCredit += Number(choice.credit)
            }
          })
          uniqueSlots = [...(new Set(chosenTimeSlots))]
          isOverlapped = (totalSlotCount !== uniqueSlots.length)
          if (totalCourseCount > 0 && !isOverlapped) {
            validCases.push({
              num: 1 + validCases.length,
              totalCount: totalCourseCount,
              totalCredit: totalCredit,
              courseIds: chosenCourseIds,
              courseNames: chosenCourseNames
            })
          }
        }
        resolve(validCases)
      })
        .then((cases) => {
          this.calculatedCases = cases
        })
        .finally(() => {
          this.$refs.searchField.$emit('input')
          this.isLoadingCases = false
        })
    },
    checkTimetable ({ num, totalCount, totalCredit, courseIds, courseNames }) {
      const events = []
      const map = {}
      const emptyCourseNames = []
      const onlineCourseNames = []
      let hasEmptyCourse = false
      let hasOnlineCourse = false
      courseIds.forEach((id, index) => {
        const eventsPerCourse = this.eventsPerCourse[id]
        if (!eventsPerCourse.length) {
          hasEmptyCourse = true
          emptyCourseNames.push(courseNames[index])
        }
        const onlineEvents = eventsPerCourse.filter((event) => {
          return event.weekday === 0
        })
        if (onlineEvents.length) {
          hasOnlineCourse = true
          onlineCourseNames.push(courseNames[index])
        }
        events.push(...eventsPerCourse)
      })
      events.forEach((e) => {
        map[e.weekday] = map[e.weekday] || []
        map[e.weekday].push(e)
      })
      this.activeCase = {
        num,
        totalCount,
        totalCredit,
        courseIds,
        courseNames,
        emptyCourseNames,
        onlineCourseNames,
        hasEmptyCourse,
        hasOnlineCourse
      }
      this.eventsMap = map
      this.isActiveTimetable = true
    },
    saveTimetable () {
      this.isSavingTimetable = true
      return new Promise((resolve, reject) => {
        if (this.isActiveTimetable) {
          this.$store.commit('saveTimetable', this.activeCase.courseIds)
        }
        resolve()
      })
        .finally(() => {
          this.isSavingTimetable = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.v-alert /deep/ > div {
  overflow: hidden;
}
</style>
