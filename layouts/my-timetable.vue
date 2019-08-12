<template>
  <v-app>
    <GlobalNavigation />
    <v-toolbar
      clipped-left
      fixed
      app
    >
      <v-toolbar-side-icon @click.stop="toggleNavigation" />
      <v-toolbar-title>내 시간표</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>
    <GlobalFooter />
  </v-app>
</template>

<script>
import GlobalNavigation from '~/components/GlobalNavigation.vue'
import GlobalFooter from '~/components/GlobalFooter.vue'

export default {
  name: 'my-timetable-layout',
  components: {
    GlobalNavigation,
    GlobalFooter
  },
  mounted () {
    this.$store.commit('setLeftDrawer', this.$vuetify.breakpoint.lgAndUp)
  },
  methods: {
    toggleNavigation () {
      this.$store.commit('toggleLeftDrawer')
    }
  }
}
</script>
