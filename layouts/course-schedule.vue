<template>
  <v-app>
    <GlobalNavigation />
    <v-toolbar
      clipped-left
      fixed
      app
    >
      <v-toolbar-side-icon @click.stop="toggleNavigation" />
      <v-toolbar-title>강의시간표 조회</v-toolbar-title>
      <v-spacer />
      <v-btn
        icon
        @click.stop="toggleRightDrawer"
      >
        <v-icon>fas fa-calendar-check</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer
      v-model="isActiveRightDrawer"
      right
      temporary
      fixed
    >
      <v-list two-line subheader>
        <v-subheader>내가 추가한 강의</v-subheader>
        <template v-for="(course, index) in sampleCourses">
          <v-divider
            v-if="index > 0"
            :key="index"
          ></v-divider>
          <v-list-tile
            :key="course.id"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ course.id }}</v-list-tile-title>
              <v-list-tile-sub-title>
                <span class='text--primary'>{{ course.name }}</span> &mdash; {{ course.professor }}
              </v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon>
                <v-icon>fas fa-trash-alt</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-footer
      fixed
      app
    >
      <span>&copy; 2017-2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import GlobalNavigation from '~/components/GlobalNavigation.vue'

export default {
  name: 'course-schedule-layout',
  components: {
    GlobalNavigation
  },
  data () {
    return {
      sampleCourses: [
        {
          id: 'MTH3103-001',
          name: '복소해석학 1',
          professor: '정해원'
        },
        {
          id: 'MTH3221-001',
          name: '대수학 1',
          professor: '이익권'
        },
        {
          id: 'MTH3301-001',
          name: '위상수학 1',
          professor: '송용진'
        }
      ],
      isActiveRightDrawer: false
    }
  },
  mounted () {
    this.$store.commit('setLeftDrawer', this.$vuetify.breakpoint.lgAndUp)
    this.isActiveRightDrawer = false
  },
  methods: {
    toggleNavigation () {
      this.$store.commit('toggleLeftDrawer')
    },
    toggleRightDrawer () {
      this.isActiveRightDrawer = !this.isActiveRightDrawer
    }
  }
}
</script>
