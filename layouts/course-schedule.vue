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
      <SelectedCourseList />
    </v-navigation-drawer>
    <GlobalFooter />
  </v-app>
</template>

<script>
import GlobalNavigation from '~/components/GlobalNavigation.vue'
import SelectedCourseList from '~/components/SelectedCourseList.vue'
import GlobalFooter from '~/components/GlobalFooter.vue'

export default {
  name: 'course-schedule-layout',
  components: {
    GlobalNavigation,
    SelectedCourseList,
    GlobalFooter
  },
  data () {
    return {
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
