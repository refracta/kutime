<template>
  <v-layout
    justify-center
    align-center
  >
    <v-flex>
      <v-sheet
        height="1073"
        :max-height="maxSheetHeight"
      >
        <v-calendar
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
  </v-layout>
</template>

<script>
import dayjs from '~/plugins/dayjs'

export default {
  name: 'index-page',
  layout: 'my-timetable',
  head () {
    return {
      title: '내 시간표'
    }
  },
  data () {
    return {
      dayjs,
      isPageMounted: false
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
        .finally(() => {
          this.isPageMounted = true
        })
    })
  },
  computed: {
    eventsPerCourse () {
      const res = {}
      this.$store.state.selectedCourses.forEach((course) => {
        let matched = course.id.match(/^([a-z]+)([0-9]+-[0-9]+)$/i)
        matched = matched !== null ? matched : course.id.match(/^([a-z0-9]+)([0-9]+-[0-9]+)$/i)
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
    eventsMap () {
      const courseIds = this.$store.state.timetableCourseIds
      const events = []
      const map = {}
      courseIds.forEach((id, index) => {
        const eventsPerCourse = this.eventsPerCourse[id] || []
        events.push(...eventsPerCourse)
      })
      events.forEach((e) => {
        map[e.weekday] = map[e.weekday] || []
        map[e.weekday].push(e)
      })
      return map
    },
    maxSheetHeight () {
      if (this.isPageMounted) {
        const containerStyle = window.getComputedStyle(document.querySelector('.v-content > .v-content__wrap > .container'))
        const outerPaddings = [
          this.$vuetify.application.top,
          this.$vuetify.application.footer,
          parseInt(containerStyle.paddingTop),
          parseInt(containerStyle.paddingBottom)
        ]
        const calendarBezel = outerPaddings.reduce((accumulator, currentValue) => {
          return accumulator + currentValue
        }, 0)
        return `calc(100vh - ${calendarBezel}px)`
      }
    }
  }
}
</script>
