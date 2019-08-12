<template>
  <v-navigation-drawer
    v-model="isActive"
    clipped
    fixed
    app
  >
    <v-list>
      <v-list-tile
        v-for="(item, index) in items"
        :key="index"
        :to="item.to"
        exact
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'global-navigation',
  data () {
    return {
      items: [
        {
          icon: 'fas fa-calendar-week',
          title: '내 시간표',
          to: '/'
        },
        {
          icon: 'fas fa-chalkboard-teacher',
          title: '강의시간표 조회',
          to: '/course-schedule'
        },
        {
          icon: 'fas fa-random',
          title: '경우의 수 계산',
          to: '/calculate-number-of-cases'
        }
      ]
    }
  },
  computed: {
    isActive: {
      get () {
        return this.$store.state.isActiveLeftDrawer
      },
      set (newValue) {
        if (newValue !== this.isActive) {
          this.$store.commit('setLeftDrawer', newValue)
        }
      }
    }
  }
}
</script>
