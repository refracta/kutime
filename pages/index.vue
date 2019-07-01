<template>
  <v-layout
    justify-center
    align-center
  >
    <v-flex>
      <v-sheet>
        <v-calendar
          type="week"
          :first-interval="17"
          :interval-count="26"
          :interval-minutes="30"
        >
          <template v-slot:dayBody="{ weekday, timeToY, minutesToPixels }">
            <template v-for="(event, index) in eventsMap[weekday]">
              <div
                v-if="event.time"
                :key="index"
                :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
                class="my-event with-time"
                @click="open(event)"
                v-html="event.title"
              ></div>
            </template>
          </template>
        </v-calendar>
      </v-sheet>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'my-timetable',
  head () {
    return {
      title: '내 시간표'
    }
  },
  data () {
    return {
      events: [
        {
          weekday: 1,
          title: '복소해석학',
          time: '12:00',
          duration: 90
        },
        {
          weekday: 3,
          title: '복소해석학',
          time: '13:30',
          duration: 90
        }
      ]
    }
  },
  computed: {
    eventsMap () {
      const map = {}
      this.events.forEach((e) => {
        map[e.weekday] = map[e.weekday] || []
        map[e.weekday].push(e)
      })
      return map
    }
  },
  methods: {
    open (event) {
      alert(event.title)
    }
  }
}
</script>

<style lang="scss" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;

  &.with-time {
    position: absolute;
    right: 4px;
    margin-right: 0px;
  }
}
</style>
